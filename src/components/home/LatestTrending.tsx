import Link from "next/link";
import { db } from "@/lib/db";
import TrendBadge from "@/components/trending/TrendBadge";

export default async function LatestTrending() {
  const allFeatured = await db.trendingTech.findMany({
    where: { reviewStatus: "approved", featuredIndex: { not: null } },
    include: { category: true },
    orderBy: { featuredIndex: "asc" },
  });

  const items = allFeatured.slice(0, 5);

  if (items.length === 0) return null;

  const [featured, ...rest] = items;

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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Featured Card */}
          <Link
            href={`/trending-ai/${featured.slug}`}
            className="md:col-span-8 group cursor-pointer block"
          >
            <div className="h-full flex flex-col p-8 rounded-xl bg-[#0c141e] border border-[#424853]/10 group-hover:border-primary/20 transition-all duration-300">
              <div className="flex items-start justify-between gap-4 mb-6">
                <span className="text-4xl leading-none">{featured.category.emoji ?? "🤖"}</span>
                <TrendBadge status={featured.trendStatus} />
              </div>
              <span className="font-headline text-[10px] tracking-[0.2em] text-primary uppercase mb-4 block">
                {featured.category.name}
              </span>
              <h3 className="font-headline text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                {featured.name}
              </h3>
              <p className="text-[#a5abb8] text-sm leading-relaxed flex-1">
                {featured.description}
              </p>
              <div className="mt-8 flex items-center justify-between">
                <span className="font-headline text-[10px] text-[#a5abb8]/50 tracking-widest uppercase">
                  Mehr erfahren →
                </span>
              </div>
            </div>
          </Link>

          {/* Secondary Cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {rest.map((item) => (
              <Link
                key={item.id}
                href={`/trending-ai/${item.slug}`}
                className="group flex flex-col p-6 rounded-xl bg-[#121a25] border border-[#424853]/5 group-hover:bg-[#17202c] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xl leading-none">{item.category.emoji ?? "🤖"}</span>
                  <TrendBadge status={item.trendStatus} />
                </div>
                <h4 className="font-headline text-base font-bold mb-2 group-hover:text-primary transition-colors">
                  {item.name}
                </h4>
                <p className="text-[#a5abb8] text-xs leading-relaxed line-clamp-2 flex-1">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
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
