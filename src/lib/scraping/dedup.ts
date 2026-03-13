// Deduplizierung — Wird in Schritt 5 implementiert
export interface RawScrapedItem {
  name: string;
  description: string;
  url: string;
  source: string;
}

export function dedup(items: RawScrapedItem[]): RawScrapedItem[] {
  // TODO Schritt 5:
  // 1. Normalisierung: Name lowercase, Sonderzeichen entfernen
  // 2. Exakter Match: Gleicher normalisierter Name → zusammenführen
  // 3. Fuzzy Match: Levenshtein-Distanz < 3 → reviewStatus: "pending"
  // 4. URL-Match: Gleiche Domain+Path → zusammenführen
  return items;
}
