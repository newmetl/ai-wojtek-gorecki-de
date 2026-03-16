import type { RawScrapedItem } from "./types";

// Re-export für Rückwärtskompatibilität
export type { RawScrapedItem };

/**
 * Normalisiert einen Namen für den Vergleich.
 * Lowercase, nur alphanumerische Zeichen + Leerzeichen, getrimmt.
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extrahiert Domain + Pfad aus einer URL für URL-basiertes Matching.
 */
function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Trailing slash entfernen, lowercase
    return (parsed.hostname + parsed.pathname).replace(/\/$/, "").toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

/**
 * Dedupliziert eine Liste von RawScrapedItems.
 * Strategie:
 * 1. Exact-Match auf normalisierten Namen → ersten behalten
 * 2. URL-Match auf Domain + Pfad → ersten behalten
 *
 * Wiederverwendbar für alle Tools (Trending, UseCase, Prompt).
 */
export function dedup(items: RawScrapedItem[]): RawScrapedItem[] {
  const seenNames = new Map<string, true>();
  const seenUrls = new Map<string, true>();
  const result: RawScrapedItem[] = [];

  for (const item of items) {
    const normalizedName = normalizeName(item.name);
    const normalizedUrl = item.url ? normalizeUrl(item.url) : "";

    // Exact-Name-Match
    if (seenNames.has(normalizedName)) continue;

    // URL-Match (nur wenn URL vorhanden)
    if (normalizedUrl && seenUrls.has(normalizedUrl)) continue;

    seenNames.set(normalizedName, true);
    if (normalizedUrl) seenUrls.set(normalizedUrl, true);

    result.push(item);
  }

  return result;
}
