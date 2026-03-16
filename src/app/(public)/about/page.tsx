import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About this Page — Wie diese Plattform entstanden ist",
  description:
    "Die Geschichte hinter ai.wojtek-gorecki.de: Von einer statischen Portfolio-Seite zur dynamischen KI-Tool-Plattform.",
};

const techStack = [
  { name: "Next.js 16", category: "Framework", desc: "App Router, Server Components, API Routes" },
  { name: "React 19", category: "UI", desc: "Concurrent Features, Server/Client Components" },
  { name: "TypeScript", category: "Sprache", desc: "Typsicherheit im gesamten Stack" },
  { name: "Tailwind CSS v4", category: "Styling", desc: "CSS-basiertes Theme-System, kein Config-File" },
  { name: "Prisma + SQLite", category: "Datenbank", desc: "ORM mit SQLite für einfaches Self-Hosting" },
  { name: "Claude API", category: "KI", desc: "Kategorisierung, Beschreibungen, User Story Generator" },
  { name: "Cheerio + RSS", category: "Scraping", desc: "GitHub Trending, Hacker News, arXiv, Blogs" },
  { name: "Docker + Nginx", category: "Deployment", desc: "Self-hosted auf Hostinger VPS mit SSL" },
  { name: "Umami", category: "Analytics", desc: "Cookie-freies, DSGVO-konformes Analytics" },
];

export default function AboutPage() {
  return (
    <main className="flex-1 pt-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Hinter den Kulissen
          </p>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            About this Page
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Wie aus einer statischen Portfolio-Seite eine dynamische Plattform für
            Product Owner wurde — und warum.
          </p>
        </div>

        {/* Entstehungsgeschichte */}
        <section className="mb-12 space-y-4 text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-semibold text-foreground">Die Idee</h2>
          <p>
            Die Vorgängerversion von <code className="text-primary font-mono text-sm bg-primary/10 px-1.5 py-0.5 rounded">wojtek-gorecki.de</code> war
            eine einfache statische Seite. Sie hat ihren Zweck erfüllt, aber mir fehlte
            etwas Eigenes: ein Ort, an dem ich nicht nur zeige <em>was</em> ich kann,
            sondern <em>womit</em> ich arbeite.
          </p>
          <p>
            Als Product Owner beobachte ich täglich, wie KI die Arbeit in Entwicklungsteams
            verändert. Ich brauche aktuelle Überblicke, nützliche Prompts und erprobte
            Werkzeuge. Diese Plattform ist mein Versuch, das an einem Ort zu bündeln — und
            für andere zugänglich zu machen.
          </p>
          <p>
            Das Projekt ist bewusst als{" "}
            <span className="text-foreground font-medium">lebendes System</span> konzipiert:
            wöchentliches Scraping, automatisierte KI-Aufbereitung, Admin-Interface für
            manuelle Kuration. Es wächst mit meiner Arbeit.
          </p>
        </section>

        {/* OpenClaw-Referenz */}
        <section className="mb-12 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-base font-semibold text-foreground mb-2">
            Entwickelt mit Claude Code
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Diese Plattform wurde mit{" "}
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Claude Code
            </a>{" "}
            (Anthropics KI-gestütztem Coding-Tool) entwickelt — als Proof of Concept, dass
            moderne KI-Assistenten produktionsreife Next.js-Anwendungen von der Architektur
            bis zum Deployment begleiten können. Der gesamte Code ist auf{" "}
            <a
              href="https://github.com/newmetl/ai-wojtek-gorecki-de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>{" "}
            einsehbar.
          </p>
        </section>

        {/* Tech-Stack */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Tech-Stack</h2>
          <div className="divide-y divide-white/5">
            {techStack.map((item) => (
              <div key={item.name} className="flex items-start gap-4 py-4">
                <span className="w-28 shrink-0 text-xs font-medium text-primary/70 uppercase tracking-wider pt-0.5">
                  {item.category}
                </span>
                <div>
                  <span className="font-semibold text-foreground text-sm">{item.name}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
