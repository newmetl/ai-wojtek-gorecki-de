import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { dedup } from "./dedup";
import { categorizeItems } from "./categorize";
import { researchTrendingAI } from "./research";
import { scrapeHuggingFace } from "./huggingface";
import { scrapeReddit } from "./reddit";
import type { RawScrapedItem, CategorizedItem } from "./types";

// Re-exports für externe Nutzung
export type { RawScrapedItem, CategorizedItem };

// ─── Tool-spezifische Save-Funktionen ──────────────────────────────────────

/**
 * Speichert kategorisierte Items als TrendingTech-Einträge.
 * Upsert-Strategie: Neu → reviewStatus "pending"; Vorhanden → Score + Datum updaten.
 */
async function saveTrendingItems(
  items: CategorizedItem[]
): Promise<{ newCount: number; updatedCount: number }> {
  let newCount = 0;
  let updatedCount = 0;

  for (const item of items) {
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
      await db.trendingTech.update({
        where: { slug },
        data: {
          trendScore: item.trendScore,
          lastScrapedAt: new Date(),
          // Beschreibung, Erklärung + Emoji überschreiben (Research liefert immer aktuelle Infos)
          description: item.description,
          ...(item.beginnerExplanation ? { beginnerExplanation: item.beginnerExplanation } : {}),
          ...(item.emoji ? { emoji: item.emoji } : {}),
        },
      });
      updatedCount++;
    } else {
      await db.trendingTech.create({
        data: {
          name: item.originalName,
          slug,
          categoryId: category.id,
          description: item.description,
          beginnerExplanation: item.beginnerExplanation || null,
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
 * Claude Research (web_search) → Dedup → Claude Kategorisierung → Speichern
 *
 * Qualität: Vergleichbar mit manuell erstellten Inhalten via Claude Research,
 * da dieselbe web_search-Technologie genutzt wird.
 *
 * Für Phase 2/3: runUseCaseScrape() / runPromptScrape() nach demselben Muster.
 */
async function runTrendingScrape(): Promise<{
  found: number;
  newCount: number;
  updatedCount: number;
}> {
  console.log("[trending] Starte Research Pipeline (Claude + HuggingFace + Reddit)...");

  // Schritt 1: Parallel-Recherche — Claude Research + HuggingFace + Reddit
  const [researchResult, hfResult, redditResult] = await Promise.allSettled([
    researchTrendingAI(),
    scrapeHuggingFace(),
    scrapeReddit(),
  ]);

  const allRaw: RawScrapedItem[] = [
    ...(researchResult.status === "fulfilled" ? researchResult.value : []),
    ...(hfResult.status === "fulfilled" ? hfResult.value : []),
    ...(redditResult.status === "fulfilled" ? redditResult.value : []),
  ];

  if (researchResult.status === "rejected")
    console.error("[trending] Claude Research Fehler:", researchResult.reason);
  if (hfResult.status === "rejected")
    console.error("[trending] HuggingFace Fehler:", hfResult.reason);
  if (redditResult.status === "rejected")
    console.error("[trending] Reddit Fehler:", redditResult.reason);

  const rawItems = allRaw;
  console.log(`[trending] ${rawItems.length} Items gesamt (Research + HF + Reddit)`);

  // Schritt 2: Deduplizierung
  const deduped = dedup(rawItems);
  console.log(`[trending] ${deduped.length} Items nach Dedup`);

  // Schritt 3: Kategorisierung via Claude (Kategorie, DE-Beschreibung, Emoji, Score)
  const categorized = await categorizeItems(deduped, "trending");
  console.log(`[trending] ${categorized.length} Items kategorisiert`);

  // Schritt 4: In DB speichern (Upsert)
  const { newCount, updatedCount } = await saveTrendingItems(categorized);
  console.log(`[trending] Fertig: ${newCount} neu, ${updatedCount} aktualisiert`);

  return { found: rawItems.length, newCount, updatedCount };
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
