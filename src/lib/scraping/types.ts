// Gemeinsame Typen für alle Scraping-Pipelines (Trending, Use Cases, Prompts)

/**
 * Rohes gescraptes Item — Ausgabe jedes einzelnen Scrapers.
 * Tool-agnostisch: wird von GitHub, HN, arXiv, RSS etc. gleichermaßen genutzt.
 */
export interface RawScrapedItem {
  name: string;
  description: string;
  url: string;
  sourceName: string; // "github" | "hackernews" | "arxiv" | "blog" | "producthunt"
}

/**
 * Kategorisiertes Item — Ausgabe der Claude-Kategorisierung.
 * Wird anschließend tool-spezifisch in die DB gespeichert.
 */
export interface CategorizedItem {
  originalName: string;
  categorySlug: string;
  description: string; // Deutsche Kurzbeschreibung (1–2 Sätze, von Claude)
  beginnerExplanation: string; // Einfache Erklärung für Einsteiger (3–4 Sätze, von Claude)
  emoji: string;
  trendScore: number; // 1–100
  url: string;
  sourceName: string;
}
