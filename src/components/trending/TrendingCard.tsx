import TrendBadge from "./TrendBadge";
import { ExternalLink } from "lucide-react";

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
  return (
    <div className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-surface p-5 transition-all hover:border-white/20 hover:bg-surface-hover">
      {/* Header: Emoji + Badge */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl leading-none">{item.emoji ?? "🤖"}</span>
        <TrendBadge status={item.trendStatus} />
      </div>

      {/* Name + Kategorie */}
      <div>
        <p className="font-semibold text-foreground text-sm leading-snug">{item.name}</p>
        <p className="mt-0.5 text-[11px] font-medium text-primary/70">
          {item.category.emoji} {item.category.name}
        </p>
      </div>

      {/* Beschreibung */}
      <p className="flex-1 text-xs leading-relaxed text-muted">{item.description}</p>

      {/* Link zur Quelle */}
      {item.sourceUrl && (
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
      )}
    </div>
  );
}
