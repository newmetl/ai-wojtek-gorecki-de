import type { Metadata } from "next";
import ToolCard from "@/components/home/ToolCard";

export const metadata: Metadata = {
  title: "Tools — Meine KI-Tools für Product Owner",
  description:
    "Übersicht aller KI-Tools auf ai.wojtek-gorecki.de: Trending AI Tech, AI Use Cases, Prompt Library und User Story Generator.",
};

const tools = [
  {
    emoji: "📡",
    title: "Trending AI Tech",
    description:
      "Wöchentlich aktualisierte Übersicht der wichtigsten KI-Technologien — automatisch gescrapt aus GitHub Trending, Hacker News, arXiv und Product Hunt, kategorisiert und kompakt erklärt.",
    href: "/tools/trending-ai",
    status: "live" as const,
  },
  {
    emoji: "💡",
    title: "AI Use Cases",
    description:
      "Praxisnahe Anwendungsbeispiele aus E-Commerce, SaaS, Gesundheit, Bildung und anderen Branchen: Was funktioniert, wie komplex ist es, welche KI-Technologie steckt dahinter?",
    href: "/tools/ai-use-cases",
    status: "soon" as const,
  },
  {
    emoji: "📚",
    title: "Prompt Library",
    description:
      "Kuratierte Sammlung nützlicher Prompts für Product Owner: User Stories, Sprint Planning, Stakeholder-Kommunikation, Backlog Refinement und mehr — mit Copy-to-Clipboard.",
    href: "/tools/prompt-library",
    status: "soon" as const,
  },
  {
    emoji: "✍️",
    title: "User Story Generator",
    description:
      "Produktidee eingeben, strukturierte User Stories inklusive Epics und Akzeptanzkriterien automatisch generieren lassen — angetrieben von der Claude API.",
    href: "/tools/user-story-generator",
    status: "soon" as const,
  },
];

export default function ToolsPage() {
  return (
    <main className="flex-1 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Tools
          </p>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Meine KI-Tools
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Praktische Werkzeuge an der Schnittstelle von Product Management und
            Künstlicher Intelligenz — von mir gebaut, von mir täglich genutzt.
          </p>
        </div>

        {/* Tool-Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>

        {/* Roadmap-Hinweis */}
        <div className="mt-12 rounded-xl border border-white/10 bg-card/50 p-6">
          <h2 className="text-sm font-semibold text-foreground mb-2">Roadmap</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-accent font-medium">Phase 1 (aktiv):</span> Trending AI Tech mit automatischer
            Scraping-Pipeline.{" "}
            <span className="text-muted-foreground/70">
              Phase 2: AI Use Cases · Phase 3: Prompt Library · Phase 4: User Story Generator
            </span>
          </p>
        </div>

      </div>
    </main>
  );
}
