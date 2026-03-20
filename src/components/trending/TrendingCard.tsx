"use client";

import { useRouter } from "next/navigation";
import TrendBadge from "./TrendBadge";

export interface TrendingCardData {
  id: string;
  name: string;
  slug: string;
  emoji: string | null;
  description: string;
  trendStatus: string;
  trendScore: number;
  sourceUrl: string | null;
  sourceName: string | null;
  category: {
    name: string;
    emoji: string | null;
  };
}

interface TrendingCardProps {
  item: TrendingCardData;
}

export default function TrendingCard({ item }: TrendingCardProps) {
  const router = useRouter();

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/trending-ai/${item.slug}`)}
      onKeyDown={(e) => e.key === "Enter" && router.push(`/trending-ai/${item.slug}`)}
      className="group flex flex-col p-8 rounded-xl bg-[#121a25] border border-[#424853]/5 group-hover:bg-[#17202c] transition-colors cursor-pointer"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <span className="text-xl leading-none">{item.category.emoji ?? "🤖"}</span>
      </div>

      {/* Name + Kategorie */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-headline text-base font-bold group-hover:text-primary transition-colors leading-snug">
          {item.name}
        </h4>
        <TrendBadge status={item.trendStatus} />
      </div>
      <span className="font-headline text-[10px] tracking-[0.15em] text-[#a5abb8]/60 uppercase mb-4 block">
        {item.category.name}
      </span>

      {/* Beschreibung */}
      <p className="flex-1 text-sm leading-relaxed text-[#a5abb8] mb-6 line-clamp-3">
        {item.description}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-[#424853]/20" />
        {item.sourceUrl && (
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-headline text-[10px] text-[#a5abb8]/40 hover:text-primary transition-colors uppercase tracking-widest"
            onClick={(e) => e.stopPropagation()}
          >
            {item.sourceName ?? "Quelle"}
          </a>
        )}
      </div>
    </div>
  );
}
