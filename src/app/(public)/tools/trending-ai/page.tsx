import type { Metadata } from "next";
import { db } from "@/lib/db";
import TrendingGrid from "@/components/trending/TrendingGrid";
import type { CategoryOption } from "@/components/trending/CategoryFilter";
import { TrendingUp, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Trending AI Tech — Die wichtigsten KI-Technologien",
  description:
    "Wöchentlich aktualisierte Übersicht der Top-KI-Technologien, kategorisiert und mit kurzen Erklärungen. Für Product Owner und Tech-Experten.",
  openGraph: {
    title: "Trending AI Tech — ai.wojtek-gorecki.de",
    description: "Die wichtigsten KI-Technologien auf einen Blick.",
    type: "website",
    url: "https://ai.wojtek-gorecki.de/tools/trending-ai",
  },
};

export default async function TrendingAIPage() {
  // Nur freigegebene Einträge laden, sortiert nach Score
  const [entries, categories, lastUpdated] = await Promise.all([
    db.trendingTech.findMany({
      where: { reviewStatus: "approved" },
      include: { category: true },
      orderBy: [{ trendScore: "desc" }, { createdAt: "desc" }],
    }),
    db.category.findMany({
      where: { type: "trending" },
      orderBy: { sortOrder: "asc" },
    }),
    db.trendingTech.findFirst({
      where: { reviewStatus: "approved" },
      orderBy: { lastScrapedAt: "desc" },
      select: { lastScrapedAt: true, updatedAt: true },
    }),
  ]);

  // Letzte Aktualisierung ermitteln
  const lastDate = lastUpdated?.lastScrapedAt ?? lastUpdated?.updatedAt ?? null;
  const lastUpdatedStr = lastDate
    ? new Intl.DateTimeFormat("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(lastDate))
    : null;

  // Kategorien mit Anzahl freigegebener Einträge
  const categoriesWithCount: CategoryOption[] = categories
    .map((cat) => ({
      slug: cat.slug,
      name: cat.name,
      emoji: cat.emoji,
      count: entries.filter((e) => e.categoryId === cat.id).length,
    }))
    .filter((cat) => cat.count > 0);

  // Daten für TrendingGrid aufbereiten
  const items = entries.map((entry) => ({
    id: entry.id,
    name: entry.name,
    slug: entry.slug,
    emoji: entry.emoji,
    description: entry.description,
    trendStatus: entry.trendStatus,
    trendScore: entry.trendScore,
    sourceUrl: entry.sourceUrl,
    sourceName: entry.sourceName,
    category: {
      name: entry.category.name,
      emoji: entry.category.emoji,
    },
  }));

  return (
    <main className="flex-1 pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Tool
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Trending AI Tech
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Die wichtigsten KI-Technologien, Tools und Entwicklungen — wöchentlich recherchiert
            und kuratiert für Product Owner und Tech-Entscheider.
          </p>
          {lastUpdatedStr && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
              <RefreshCw className="h-3.5 w-3.5" />
              Letzte Aktualisierung: {lastUpdatedStr}
            </div>
          )}
        </div>

        {/* Inhalt */}
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-xl font-semibold text-foreground">Noch keine Einträge</p>
            <p className="text-muted mt-2 max-w-sm">
              Die Trending-Liste wird wöchentlich aktualisiert. Schau bald wieder vorbei!
            </p>
          </div>
        ) : (
          <TrendingGrid items={items} categories={categoriesWithCount} />
        )}
      </div>
    </main>
  );
}
