import SectionHeading from "@/components/shared/SectionHeading";
import ToolCard from "./ToolCard";

const tools = [
  {
    emoji: "📡",
    title: "Trending AI Tech",
    description:
      "Wöchentlich aktualisierte Übersicht der wichtigsten KI-Technologien — kategorisiert und kompakt erklärt.",
    href: "/tools/trending-ai",
    status: "live" as const,
  },
  {
    emoji: "💡",
    title: "AI Use Cases",
    description:
      "Praxisnahe Anwendungsbeispiele aus verschiedenen Branchen: Was funktioniert, wie komplex ist es, welche KI steckt dahinter?",
    href: "/tools/ai-use-cases",
    status: "soon" as const,
  },
  {
    emoji: "📚",
    title: "Prompt Library",
    description:
      "Sammlung nützlicher Prompts für Product Owner: User Stories, Sprint Planning, Stakeholder-Kommunikation und mehr.",
    href: "/tools/prompt-library",
    status: "soon" as const,
  },
  {
    emoji: "✍️",
    title: "User Story Generator",
    description:
      "Produktidee eingeben, strukturierte User Stories inklusive Epics und Akzeptanzkriterien per Claude API erhalten.",
    href: "/tools/user-story-generator",
    status: "soon" as const,
  },
];

export default function ToolTeaser() {
  return (
    <section className="py-20 bg-[#0F172A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Meine Tools"
          subtitle="Praktische Werkzeuge an der Schnittstelle von Product Management und KI."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
