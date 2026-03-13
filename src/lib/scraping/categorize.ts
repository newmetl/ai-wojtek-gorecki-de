// KI-Kategorisierung via Claude API — Wird in Schritt 5 implementiert
import type { RawScrapedItem } from "./dedup";

export interface CategorizedItem {
  originalName: string;
  categorySlug: string;
  description: string;
  emoji: string;
  trendScore: number;
}

const SYSTEM_PROMPT = `Du bist ein Experte für KI-Technologien.
Du erhältst eine Liste von Technologien/Tools/Papers und sollst für jedes:
1. Die passende Kategorie zuweisen (aus der vorgegebenen Liste)
2. Eine deutsche Kurzbeschreibung schreiben (max 2 Sätze, prägnant)
3. Ein passendes Emoji zuweisen
4. Einen Trend-Score von 1-100 vergeben (basierend auf Relevanz und Neuheit)

Antworte ausschließlich im JSON-Format.`;

export async function categorizeItems(
  items: RawScrapedItem[]
): Promise<CategorizedItem[]> {
  // TODO Schritt 5: Claude API Batch-Kategorisierung
  // Verwendet anthropic Client aus @/lib/claude
  void SYSTEM_PROMPT;
  return items.map((item) => ({
    originalName: item.name,
    categorySlug: "llms-foundation-models",
    description: item.description,
    emoji: "🤖",
    trendScore: 50,
  }));
}
