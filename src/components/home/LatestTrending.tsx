import Link from "next/link";
import { db } from "@/lib/db";
import TrendBadge from "@/components/trending/TrendBadge";
import { ArrowRight } from "lucide-react";

export default async function LatestTrending() {
  const items = await db.trendingTech.findMany({
    where: { reviewStatus: "approved" },
    include: { category: true },
    orderBy: [{ trendScore: "desc" }, { createdAt: "desc" }],
    take: 4,
  });

  if (items.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Trending AI Tech
            </h2>
            <p className="mt-2 text-muted">
              Die wichtigsten KI-Technologien — wöchentlich aktualisiert.
            </p>
          </div>
          <Link
            href="/tools/trending-ai"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Alle ansehen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href="/tools/trending-ai"
              className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-surface p-5 transition-all hover:border-white/20 hover:bg-surface-hover"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-2xl leading-none">{item.emoji ?? "🤖"}</span>
                <TrendBadge status={item.trendStatus} />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm leading-snug">{item.name}</p>
                <p className="mt-0.5 text-[11px] font-medium text-primary/70">
                  {item.category.emoji} {item.category.name}
                </p>
              </div>
              <p className="flex-1 text-xs leading-relaxed text-muted line-clamp-3">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
