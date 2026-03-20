"use client";

import { useRouter } from "next/navigation";
import TrendBadge from "./TrendBadge";

export interface FeaturedCardData {
  id: string;
  name: string;
  slug: string;
  emoji: string | null;
  description: string;
  trendStatus: string;
  trendScore: number;
  sourceUrl: string | null;
  sourceName: string | null;
  featuredIndex: number;
  category: {
    name: string;
    emoji: string | null;
  };
}

interface FeaturedCardProps {
  item: FeaturedCardData;
}

export default function FeaturedCard({ item }: FeaturedCardProps) {
  const router = useRouter();

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/trending-ai/${item.slug}`)}
      onKeyDown={(e) => e.key === "Enter" && router.push(`/trending-ai/${item.slug}`)}
      className="group flex flex-col p-8 rounded-xl bg-[#17202c]/40 border border-[#424853]/10 backdrop-blur-sm group-hover:border-secondary/30 transition-all cursor-pointer"
    >
      {/* Kategorie-Label */}
      <span className="font-headline text-[10px] tracking-[0.2em] text-secondary uppercase mb-6 block">
        {item.category.name}
      </span>

      {/* Name */}
      <h3 className="font-headline text-2xl font-bold mb-4 group-hover:text-secondary transition-colors">
        {item.name}
      </h3>

      {/* Beschreibung */}
      <p className="text-[#a5abb8] text-sm mb-auto line-clamp-4 leading-relaxed">
        {item.description}
      </p>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none">{item.category.emoji ?? "🤖"}</span>
          <TrendBadge status={item.trendStatus} />
        </div>
        {item.sourceUrl && (
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-headline text-[10px] text-[#a5abb8]/50 uppercase tracking-widest hover:text-secondary transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {item.sourceName ?? "Quelle"}
          </a>
        )}
      </div>
    </div>
  );
}
