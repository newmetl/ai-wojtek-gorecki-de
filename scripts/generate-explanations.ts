/**
 * Backfill-Skript: Generiert beginnerExplanation für alle TrendingTech-Einträge
 * ohne dieses Feld.
 *
 * Ausführung:
 *   DATABASE_URL="file:./data/app.db" npx tsx --env-file=.env.local scripts/generate-explanations.ts
 */

import { PrismaClient } from "@prisma/client";
import Anthropic from "@anthropic-ai/sdk";

const prisma = new PrismaClient();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const CLAUDE_MODEL = "claude-sonnet-4-20250514";
const BATCH_SIZE = 15;

type ItemInput = { id: string; name: string; description: string };

async function generateExplanationsForBatch(items: ItemInput[]): Promise<Map<string, string>> {
  const itemList = items
    .map(
      (item, idx) =>
        `${idx + 1}. Name: "${item.name}"\n   Beschreibung: "${item.description.slice(0, 200)}"`
    )
    .join("\n\n");

  const systemPrompt = `Du bist ein KI-Experte, der für Product Owner und Einsteiger erklärt.
Für jedes Item schreibe eine "beginnerExplanation": 3–4 Sätze auf Deutsch, die erklären:
- Was ist diese Technologie oder dieses Tool in einfachen Worten?
- Was kann ein Product Owner konkret damit anfangen oder davon profitieren?

Antworte AUSSCHLIESSLICH mit einem JSON-Array:
[
  { "name": "exakter Name", "explanation": "3-4 Sätze Erklärung..." }
]`;

  const response = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Bitte erkläre diese ${items.length} KI-Technologien:\n\n${itemList}`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");

  const jsonMatch = content.text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("Kein JSON-Array in Antwort");

  const parsed = JSON.parse(jsonMatch[0]) as Array<{
    name: string;
    explanation: string;
  }>;

  const result = new Map<string, string>();
  parsed.forEach((entry, idx) => {
    const item = items[idx];
    if (item && entry.explanation) {
      result.set(item.id, entry.explanation);
    }
  });

  return result;
}

async function main() {
  console.log("Starte Backfill für beginnerExplanation...");

  const items = await prisma.trendingTech.findMany({
    where: { beginnerExplanation: null },
    select: { id: true, name: true, description: true },
  });

  console.log(`${items.length} Einträge ohne Erklärung gefunden`);

  if (items.length === 0) {
    console.log("Nichts zu tun.");
    return;
  }

  let processed = 0;
  let errors = 0;

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(items.length / BATCH_SIZE)} (${batch.length} Items)...`);

    try {
      const explanations = await generateExplanationsForBatch(batch);

      for (const [id, explanation] of explanations) {
        await prisma.trendingTech.update({
          where: { id },
          data: { beginnerExplanation: explanation },
        });
        processed++;
      }

      console.log(`  ✓ ${explanations.size} Erklärungen generiert`);
    } catch (error) {
      console.error(`  ✗ Batch-Fehler:`, error);
      errors++;
    }
  }

  console.log(`\nFertig: ${processed} Erklärungen generiert, ${errors} Fehler`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
