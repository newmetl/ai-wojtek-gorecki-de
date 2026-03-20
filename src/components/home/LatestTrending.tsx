import Link from "next/link";
import { db } from "@/lib/db";
import TrendBadge from "@/components/trending/TrendBadge";

export default async function LatestTrending() {
  const items = await db.trendingTech.findMany({
    where: { reviewStatus: "approved" },
    include: { category: true },
    orderBy: [
      { featuredIndex: "asc" },
      { trendScore: "desc" },
    ],
    take: 3,
  });

  if (items.length === 0) return null;

  return (
    <section className="py-28 px-6 md:px-12 bg-background">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="font-headline text-4xl font-bold mb-4 tracking-tight">
              Trending AI Tech
            </h2>
            <p className="text-[#a5abb8] max-w-md">
              Die wichtigsten KI-Technologien — wöchentlich kuratiert und eingeordnet.
            </p>
          </div>
          <Link
            href="/trending-ai"
            className="hidden md:inline-flex font-headline text-xs tracking-widest uppercase text-[#a5abb8] hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
          >
            Alle ansehen
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/trending-ai/${item.slug}`}
              className="group flex flex-col p-8 rounded-xl bg-[#121a25] border border-[#424853]/5 hover:bg-[#17202c] transition-colors"
            >
              {/* Icon + Badge */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <span className="text-3xl leading-none">{item.category.emoji ?? "🤖"}</span>
                <TrendBadge status={item.trendStatus} />
              </div>

              {/* Category */}
              <span className="font-headline text-[10px] tracking-[0.2em] text-primary uppercase mb-3 block">
                {item.category.name}
              </span>

              {/* Title */}
              <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                {item.name}
              </h3>

              {/* Description */}
              <p className="flex-1 text-sm leading-relaxed text-[#a5abb8] mb-6 line-clamp-3">
                {item.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-[#424853]/20" />
                <span className="font-headline text-[10px] text-[#a5abb8]/40 tracking-widest uppercase">
                  Mehr erfahren →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-8 md:hidden">
          <Link
            href="/trending-ai"
            className="font-headline text-xs tracking-widest uppercase text-[#a5abb8] hover:text-primary transition-colors"
          >
            Alle Trends ansehen →
          </Link>
        </div>
      </div>
    </section>
  );
}
