import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import TrendBadge from "@/components/trending/TrendBadge";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await db.trendingTech.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!item) return {};

  const siteUrl = "https://ai.wojtek-gorecki.de";

  return {
    title: `${item.name} — Trending AI Tech`,
    description: item.description,
    openGraph: {
      title: `${item.name} — ai.wojtek-gorecki.de`,
      description: item.description,
      type: "article",
      url: `${siteUrl}/trending-ai/${slug}`,
    },
    alternates: {
      canonical: `${siteUrl}/trending-ai/${slug}`,
    },
  };
}

export default async function TrendingDetailPage({ params }: Props) {
  const { slug } = await params;

  const item = await db.trendingTech.findUnique({
    where: { slug, reviewStatus: "approved" },
    include: { category: true },
  });

  if (!item) notFound();

  return (
    <main className="flex-1 pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Zurück-Link */}
        <Link
          href="/trending-ai"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zu Trending AI Tech
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl leading-none">{item.category.emoji ?? "🤖"}</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {item.category.name}
              </span>
              <TrendBadge status={item.trendStatus} size="md" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground sm:text-4xl leading-tight">
            {item.name}
          </h1>

          {item.sourceUrl && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              {item.sourceName ? `Quelle: ${item.sourceName}` : "Originalquelle aufrufen"}
            </a>
          )}
        </div>

        {/* Kurzbeschreibung */}
        <div className="mb-8 rounded-xl border border-white/10 bg-surface p-6">
          <p className="text-base leading-relaxed text-foreground/90">{item.description}</p>
        </div>

        {/* Einsteiger-Erklärung */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Was ist das?</h2>
          {item.beginnerExplanation ? (
            <p className="text-sm leading-relaxed text-[#a5abb8]">{item.beginnerExplanation}</p>
          ) : (
            <p className="text-sm text-[#6f7682] italic">
              Die einfache Erklärung wird beim nächsten Scraping generiert.
            </p>
          )}
        </div>

        {/* CTA: Quelle aufrufen */}
        {item.sourceUrl && (
          <div className="rounded-xl border border-white/10 bg-surface/50 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Mehr erfahren</p>
              <p className="text-xs text-muted mt-0.5">Lies den Originalartikel oder schau dir das Projekt an.</p>
            </div>
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Quelle aufrufen
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
