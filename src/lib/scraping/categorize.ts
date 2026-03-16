import { anthropic, CLAUDE_MODEL } from "@/lib/claude";
import { db } from "@/lib/db";
import type { RawScrapedItem, CategorizedItem } from "./types";

// Re-export für Rückwärtskompatibilität
export type { CategorizedItem };

const BATCH_SIZE = 20;

/**
 * Kategorisiert Items via Claude API.
 * Generisch: akzeptiert categoryType ("trending" | "usecase" | "prompt")
 * und lädt die passenden Kategorien dynamisch aus der DB.
 */
export async function categorizeItems(
  items: RawScrapedItem[],
  categoryType: string = "trending"
): Promise<CategorizedItem[]> {
  if (items.length === 0) return [];

  const categories = await db.category.findMany({
    where: { type: categoryType },
    orderBy: { sortOrder: "asc" },
  });

  if (categories.length === 0) {
    console.warn(`[categorize] Keine Kategorien für Typ "${categoryType}" gefunden`);
    return items.map((item) => ({
      originalName: item.name,
      categorySlug: "",
      description: item.description,
      emoji: "🤖",
      trendScore: 50,
      url: item.url,
      sourceName: item.sourceName,
    }));
  }

  const categoryList = categories
    .map((c) => `- ${c.slug}: ${c.name}${c.emoji ? ` ${c.emoji}` : ""}`)
    .join("\n");

  const fallbackSlug = categories[0].slug;
  const result: CategorizedItem[] = [];

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    const batchResult = await categorizeBatch(batch, categoryList, fallbackSlug);
    result.push(...batchResult);
  }

  return result;
}

async function categorizeBatch(
  items: RawScrapedItem[],
  categoryList: string,
  fallbackSlug: string
): Promise<CategorizedItem[]> {
  const itemList = items
    .map(
      (item, idx) =>
        `${idx + 1}. Name: "${item.name}"\n   Beschreibung: "${item.description.slice(0, 200)}"`
    )
    .join("\n\n");

  const systemPrompt = `Du bist ein Experte für KI-Technologien und kuratierst Inhalte für eine deutschsprachige Plattform für Product Owner.

Verfügbare Kategorien:
${categoryList}

Für jedes Item sollst du:
1. Die passende Kategorie aus der obigen Liste zuweisen (nur den slug verwenden)
2. Eine deutsche Kurzbeschreibung schreiben (max. 2 prägnante Sätze, für Product Owner verständlich)
3. Ein passendes Emoji zuweisen
4. Einen Trend-Score von 1–100 vergeben (100 = sehr relevant und aktuell, 1 = wenig relevant)

Antworte AUSSCHLIESSLICH mit einem JSON-Array ohne weiteren Text:
[
  {
    "originalName": "exakter Name wie angegeben",
    "categorySlug": "slug-aus-der-liste",
    "description": "Deutsche Kurzbeschreibung.",
    "emoji": "🤖",
    "trendScore": 75
  }
]`;

  const userMessage = `Bitte kategorisiere diese ${items.length} Items:\n\n${itemList}`;

  try {
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
      messages: [{ role: "user", content: userMessage }],
      system: systemPrompt,
    });

    const content = response.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type from Claude");

    const jsonMatch = content.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("Kein JSON-Array in Claude-Antwort gefunden");

    const parsed = JSON.parse(jsonMatch[0]) as Array<{
      originalName: string;
      categorySlug: string;
      description: string;
      emoji: string;
      trendScore: number;
    }>;

    return parsed.map((item, idx) => {
      const originalItem = items[idx];
      return {
        originalName: item.originalName || originalItem.name,
        categorySlug: item.categorySlug || fallbackSlug,
        description: item.description || originalItem.description,
        emoji: item.emoji || "🤖",
        trendScore: Math.min(100, Math.max(1, item.trendScore || 50)),
        url: originalItem.url,
        sourceName: originalItem.sourceName,
      };
    });
  } catch (error) {
    console.error("[categorize] Fehler bei Claude-Batch:", error);
    return items.map((item) => ({
      originalName: item.name,
      categorySlug: fallbackSlug,
      description: item.description,
      emoji: "🤖",
      trendScore: 50,
      url: item.url,
      sourceName: item.sourceName,
    }));
  }
}
