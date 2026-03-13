import Link from "next/link";

// TODO (Schritt 6): Echte Daten aus der Datenbank laden
// import { db } from "@/lib/db";
// const items = await db.trendingTech.findMany({ ... });

const PLACEHOLDER_ITEMS = [
  {
    emoji: "🤖",
    name: "Claude 3.5 Sonnet",
    category: "LLMs & Foundation Models",
    description:
      "Anthropics stärkstes Modell mit verbessertem Reasoning und schnellerer Inferenz für komplexe Aufgaben.",
    trendStatus: "new",
  },
  {
    emoji: "🛠️",
    name: "Cursor AI",
    category: "Coding-Assistenten & Dev-Tools",
    description:
      "KI-gestützter Code-Editor auf VS Code-Basis mit tiefem Codebase-Verständnis und Pair-Programming-Features.",
    trendStatus: "rising",
  },
  {
    emoji: "🎥",
    name: "Sora",
    category: "Bild-, Video- & Audiogenerierung",
    description:
      "OpenAIs Text-to-Video-Modell generiert hochrealistische Videoclips aus natürlichsprachlichen Beschreibungen.",
    trendStatus: "new",
  },
  {
    emoji: "⚙️",
    name: "LangGraph",
    category: "KI-Agenten & Automation",
    description:
      "Framework für zustandsbehaftete Multi-Agenten-Workflows mit Graphen-basierter Ablaufsteuerung.",
    trendStatus: "rising",
  },
];

const statusConfig = {
  new: { label: "Neu", className: "bg-primary/15 text-primary" },
  rising: { label: "Steigend", className: "bg-accent/15 text-accent" },
  stable: { label: "Stabil", className: "bg-muted text-muted-foreground" },
};

export default function LatestTrending() {
  return (
    <section className="py-20 bg-[#0F172A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Trending AI Tech
            </h2>
            <p className="mt-2 text-muted-foreground">
              Die wichtigsten KI-Technologien — wöchentlich aktualisiert.
            </p>
          </div>
          <Link
            href="/tools/trending-ai"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Alle ansehen
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLACEHOLDER_ITEMS.map((item) => {
            const status = statusConfig[item.trendStatus as keyof typeof statusConfig];
            return (
              <div
                key={item.name}
                className="flex flex-col gap-3 rounded-xl border border-white/10 bg-card p-5 transition-all hover:border-white/20 hover:bg-card/80"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{item.name}</p>
                  <p className="mt-0.5 text-[11px] text-primary/70 font-medium">{item.category}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
