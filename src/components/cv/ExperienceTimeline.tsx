interface TimelineEntry {
  role: string;
  company: string;
  period: string;
  description?: string;
  tags?: string[];
}

interface ExperienceTimelineProps {
  entries: TimelineEntry[];
}

export default function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Vertikale Linie */}
      <div className="absolute left-3 top-2 bottom-2 w-px bg-white/10 sm:left-4" />

      <div className="space-y-8">
        {entries.map((entry, i) => (
          <div key={i} className="relative pl-10 sm:pl-14">
            {/* Punkt */}
            <div className="absolute left-0 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-primary/30 bg-primary/10 sm:left-1">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>

            <div className="rounded-xl border border-white/10 bg-card p-5 transition-colors hover:border-white/20">
              {/* Zeitraum */}
              <p className="text-xs font-medium text-primary/80 mb-1">{entry.period}</p>

              {/* Rolle */}
              <h3 className="font-semibold text-foreground">{entry.role}</h3>

              {/* Firma */}
              <p className="text-sm text-muted-foreground mt-0.5">{entry.company}</p>

              {/* Beschreibung */}
              {entry.description && (
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {entry.description}
                </p>
              )}

              {/* Tags */}
              {entry.tags && entry.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
