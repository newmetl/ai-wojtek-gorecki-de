import type { Metadata } from "next";
import { db } from "@/lib/db";
import TrendingGrid from "@/components/trending/TrendingGrid";
import type { CategoryOption } from "@/components/trending/CategoryFilter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trending AI Tech — Die wichtigsten KI-Technologien",
  description:
    "Wöchentlich aktualisierte Übersicht der Top-KI-Technologien, kategorisiert und mit kurzen Erklärungen.",
  openGraph: {
    title: "Trending AI Tech — ai.wojtek-gorecki.de",
    description: "Die wichtigsten KI-Technologien auf einen Blick.",
    type: "website",
    url: "https://ai.wojtek-gorecki.de/trending-ai",
  },
};

export default async function TrendingAIPage() {
  // Alle freigegebenen Einträge + Featured laden
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

  // Featured Items: approved + featuredIndex gesetzt, sortiert nach featuredIndex
  const featuredItems = entries
    .filter((e) => e.featuredIndex != null)
    .sort((a, b) => (a.featuredIndex ?? 0) - (b.featuredIndex ?? 0))
    .map((entry) => ({
      id: entry.id,
      name: entry.name,
      slug: entry.slug,
      emoji: entry.emoji,
      description: entry.description,
      trendStatus: entry.trendStatus,
      trendScore: entry.trendScore,
      sourceUrl: entry.sourceUrl,
      sourceName: entry.sourceName,
      featuredIndex: entry.featuredIndex as number,
      category: {
        name: entry.category.name,
        emoji: entry.category.emoji,
      },
    }));

  return (
    <main className="flex-1 pt-32 pb-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-[#1d2634]/50 rounded-full border border-[#424853]/10">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="font-headline text-[10px] tracking-[0.2em] uppercase text-primary">
              Wöchentlich kuratiert
            </span>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter mb-6">
            Trending AI Tech
          </h1>
          <p className="text-[#a5abb8] max-w-2xl text-lg leading-relaxed">
            Die wichtigsten KI-Technologien, Tools und Entwicklungen — recherchiert und eingeordnet.
          </p>
          {lastUpdatedStr && (
            <p className="mt-4 font-headline text-[10px] tracking-[0.2em] uppercase text-[#a5abb8]/50">
              Letzte Aktualisierung: {lastUpdatedStr}
            </p>
          )}
        </div>

        {/* Content */}
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-5xl mb-6">🔍</p>
            <p className="font-headline text-2xl font-bold text-foreground mb-3">Noch keine Einträge</p>
            <p className="text-[#a5abb8] max-w-sm">
              Die Trending-Liste wird wöchentlich aktualisiert. Schau bald wieder vorbei!
            </p>
          </div>
        ) : (
          <TrendingGrid items={items} categories={categoriesWithCount} featuredItems={featuredItems} />
        )}
      </div>
    </main>
  );
}
