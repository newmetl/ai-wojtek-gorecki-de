import Link from "next/link";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  emoji: string;
  title: string;
  description: string;
  href: string;
  status: "live" | "soon";
}

export default function ToolCard({
  emoji,
  title,
  description,
  href,
  status,
}: ToolCardProps) {
  const isLive = status === "live";

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-4 rounded-xl border bg-card p-6 transition-all duration-200",
        isLive
          ? "border-white/10 hover:border-primary/40 hover:bg-card/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
          : "border-white/5 opacity-70 cursor-default pointer-events-none"
      )}
    >
      {/* Emoji + Status-Badge */}
      <div className="flex items-start justify-between">
        <span className="text-3xl" role="img" aria-label={title}>
          {emoji}
        </span>
        {isLive ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Live
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            Coming Soon
          </span>
        )}
      </div>

      {/* Titel */}
      <h3
        className={cn(
          "text-base font-semibold",
          isLive ? "text-foreground group-hover:text-primary transition-colors" : "text-muted-foreground"
        )}
      >
        {title}
      </h3>

      {/* Beschreibung */}
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {description}
      </p>

      {/* Pfeil-Link */}
      {isLive && (
        <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Öffnen
          <svg className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      )}
    </Link>
  );
}
