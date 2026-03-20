"use client";

import { useRouter } from "next/navigation";
import { Star, ExternalLink, ArrowRight } from "lucide-react";
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
      className="group relative flex flex-col gap-4 rounded-xl p-px cursor-pointer"
      style={{
        background: "linear-gradient(135deg, rgba(251,191,36,0.5) 0%, rgba(59,130,246,0.4) 50%, rgba(6,182,212,0.4) 100%)",
      }}
    >
      {/* Inner card */}
      <div className="flex flex-col gap-4 rounded-[11px] bg-surface p-5 h-full transition-colors group-hover:bg-surface-hover">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
              <Star className="h-3 w-3 fill-amber-300" />
              Featured
            </span>
          </div>
          <TrendBadge status={item.trendStatus} />
        </div>

        {/* Emoji + Name */}
        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none shrink-0">{item.category.emoji ?? "🤖"}</span>
          <div>
            <p className="text-base font-bold text-foreground leading-snug">{item.name}</p>
            <p className="mt-0.5 text-xs font-medium text-primary/70">{item.category.name}</p>
          </div>
        </div>

        {/* Beschreibung */}
        <p className="flex-1 text-sm leading-relaxed text-muted">{item.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          {item.sourceUrl ? (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-muted hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
              {item.sourceName ?? "Quelle"}
            </a>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1 text-[11px] text-primary/60 group-hover:text-primary transition-colors">
            Mehr erfahren
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
