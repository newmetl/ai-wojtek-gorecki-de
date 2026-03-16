import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { dedup } from "./dedup";
import { categorizeItems } from "./categorize";
import { scrapeGitHub } from "./github";
import { scrapeHackerNews } from "./hackernews";
import { scrapeArXiv } from "./arxiv";
import { scrapeRSS } from "./rss";
import type { RawScrapedItem, CategorizedItem } from "./types";

// Re-exports für externe Nutzung
export type { RawScrapedItem, CategorizedItem };

// ─── Tool-spezifische Save-Funktionen ──────────────────────────────────────

/**
 * Speichert kategorisierte Items als TrendingTech-Einträge.
 * Upsert-Strategie: Neu → reviewStatus "pending"; Vorhanden → Score + Datum updaten.
 * Rückgabe: Anzahl neuer und aktualisierter Einträge.
 */
async function saveTrendingItems(
  items: CategorizedItem[]
): Promise<{ newCount: number; updatedCount: number }> {
  let newCount = 0;
  let updatedCount = 0;

  for (const item of items) {
    // Kategorie aus DB laden
    const category = await db.category.findUnique({
      where: { slug: item.categorySlug },
    });

    if (!category) {
      console.warn(`[save] Kategorie "${item.categorySlug}" nicht gefunden, übersprungen`);
      continue;
    }

    const slug = slugify(item.originalName);

    const existing = await db.trendingTech.findUnique({ where: { slug } });

    if (existing) {
      // Vorhandenen Eintrag aktualisieren (Score + Zeitstempel)
      await db.trendingTech.update({
        where: { slug },
        data: {
          trendScore: item.trendScore,
          lastScrapedAt: new Date(),
          // Beschreibung + Emoji nur überschreiben, wenn leer
          ...(existing.description ? {} : { description: item.description }),
          ...(existing.emoji ? {} : { emoji: item.emoji }),
        },
      });
      updatedCount++;
    } else {
      // Neuen Eintrag anlegen (pending → manuell freigeben)
      await db.trendingTech.create({
        data: {
          name: item.originalName,
          slug,
          categoryId: category.id,
          description: item.description,
          emoji: item.emoji,
          sourceUrl: item.url,
          sourceName: item.sourceName,
          trendStatus: "new",
          reviewStatus: "pending",
          trendScore: item.trendScore,
          lastScrapedAt: new Date(),
        },
      });
      newCount++;
    }
  }

  return { newCount, updatedCount };
}

// ─── Tool-spezifische Pipeline-Runner ──────────────────────────────────────

/**
 * Führt die vollständige Trending-Pipeline aus:
 * Scrape → Dedup → Kategorisierung → Speichern
 *
 * Fehlertoleranz: Jeder Scraper scheitert isoliert (Promise.allSettled).
 */
async function runTrendingScrape(): Promise<{
  found: number;
  newCount: number;
  updatedCount: number;
}> {
  console.log("[trending] Starte Scraping...");

  // Alle Scraper parallel mit Fehlertoleranz
  const results = await Promise.allSettled([
    scrapeGitHub(),
    scrapeHackerNews(),
    scrapeArXiv(),
    scrapeRSS(),
  ]);

  const allItems: RawScrapedItem[] = [];
  const scraperNames = ["github", "hackernews", "arxiv", "rss"];

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status === "fulfilled") {
      allItems.push(...result.value);
    } else {
      console.error(`[trending] Scraper "${scraperNames[i]}" fehlgeschlagen:`, result.reason);
    }
  }

  console.log(`[trending] ${allItems.length} Items gesamt, starte Dedup...`);
  const deduped = dedup(allItems);
  console.log(`[trending] ${deduped.length} Items nach Dedup, starte Kategorisierung...`);

  const categorized = await categorizeItems(deduped, "trending");
  console.log(`[trending] ${categorized.length} Items kategorisiert, speichere...`);

  const { newCount, updatedCount } = await saveTrendingItems(categorized);
  console.log(`[trending] Fertig: ${newCount} neu, ${updatedCount} aktualisiert`);

  return { found: allItems.length, newCount, updatedCount };
}

// ─── Haupt-Orchestrator ────────────────────────────────────────────────────

/**
 * Führt das vollständige Scraping aller aktiven Tools aus.
 * Erstellt + aktualisiert einen ScrapingLog-Eintrag.
 *
 * Für Phase 2/3: runUseCaseScrape() / runPromptScrape() hier einfügen.
 */
export async function runFullScrape(): Promise<void> {
  console.log("[scraping] Starte vollständiges Scraping...");

  const log = await db.scrapingLog.create({
    data: { source: "all", status: "running" },
  });

  const startTime = Date.now();

  try {
    const { found, newCount, updatedCount } = await runTrendingScrape();

    await db.scrapingLog.update({
      where: { id: log.id },
      data: {
        status: "success",
        itemsFound: found,
        itemsNew: newCount,
        itemsUpdated: updatedCount,
        durationMs: Date.now() - startTime,
      },
    });

    console.log(`[scraping] Abgeschlossen in ${Date.now() - startTime}ms`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[scraping] Fehler:", message);

    await db.scrapingLog.update({
      where: { id: log.id },
      data: {
        status: "error",
        errorMessage: message,
        durationMs: Date.now() - startTime,
      },
    });

    throw error;
  }
}
