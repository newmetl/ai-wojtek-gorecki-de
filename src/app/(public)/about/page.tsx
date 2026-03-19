import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About this Page — Von der Idee zur Produktion in wenigen Tagen",
  description:
    "Wie diese Plattform als Einzelperson mit KI-Unterstützung in wenigen Tagen von der Idee bis zum Deployment umgesetzt wurde — Tech-Stack, Architektur und eingesetzte KI-Tools.",
};

const techStack = [
  { name: "Next.js 16", category: "Framework", desc: "App Router, Server Components, API Routes" },
  { name: "React 19", category: "UI", desc: "Concurrent Features, Server/Client Components" },
  { name: "TypeScript", category: "Sprache", desc: "Typsicherheit im gesamten Stack" },
  { name: "Tailwind CSS v4", category: "Styling", desc: "CSS-basiertes Theme-System, kein Config-File nötig" },
  { name: "Prisma + SQLite", category: "Datenbank", desc: "ORM mit SQLite — einfach, robust, kein Infrastruktur-Overhead" },
  { name: "Claude API", category: "KI", desc: "Kategorisierung, Beschreibungen und Trend-Scores — live im Betrieb" },
  { name: "Cheerio + RSS", category: "Scraping", desc: "GitHub Trending, Hacker News, arXiv, Tech-Blogs" },
  { name: "Docker + Nginx", category: "Deployment", desc: "Self-hosted auf Hostinger VPS mit Let's Encrypt SSL" },
  { name: "Umami", category: "Analytics", desc: "Cookie-freies, DSGVO-konformes Analytics" },
];

const pipeline = [
  { icon: "⏱", label: "Wöchentlicher Cron-Job", sub: "automatisch, jeden Sonntag 03:00 Uhr" },
  { icon: "🔍", label: "Scraper", sub: "GitHub Trending · Hacker News · arXiv · RSS-Feeds" },
  { icon: "🤖", label: "Claude API", sub: "Kategorisieren · Beschreiben · Trend-Score vergeben" },
  { icon: "🗄", label: "SQLite-Datenbank", sub: "neue Einträge speichern, bekannte aktualisieren" },
  { icon: "✅", label: "Admin-Interface", sub: "manuelle Kuration und Freigabe" },
  { icon: "🌐", label: "Öffentliche Seite", sub: "Trending AI Tech — für alle sichtbar" },
];

export default function AboutPage() {
  return (
    <main className="flex-1 pt-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        {/* Header */}
        <div className="mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Proof of Concept
          </p>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-5">
            Von der Idee zur Produktion —<br className="hidden sm:block" /> in wenigen Tagen
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Was früher ein Team aus Entwickler:innen, Designer:innen und DevOps-Engineer:innen
            über Monate gebaut hätte, entstand hier als Einzelperson in wenigen Tagen — mit
            KI-Unterstützung. Diese Seite ist kein Hobby-Projekt: automatisiertes Scraping,
            Datenbankschicht, Admin-Interface, Deployment auf einem VPS mit SSL. Alles in
            Produktion.
          </p>
        </div>

        {/* KI-Tools */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-2">Werkzeuge, die den Unterschied machen</h2>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            Drei Tools haben dieses Projekt erst möglich gemacht — nicht als Ergänzung,
            sondern als zentrales Produktionsmittel.
          </p>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-surface p-5">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">🧠</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Claude Code</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    KI-gestütztes Coding-Tool von Anthropic. Hat Architekturentscheidungen
                    getroffen, den gesamten Code geschrieben, Bugs diagnostiziert und
                    Deployment-Probleme auf dem VPS gelöst — im laufenden Dialog.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-surface p-5">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">⚡</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Claude API</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Läuft live in der Plattform: Jedes neue AI-Tool, das der Scraper findet,
                    wird automatisch kategorisiert, mit einer deutschen Kurzbeschreibung versehen
                    und mit einem Trend-Score bewertet — ohne manuellen Eingriff.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-surface p-5">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">🦀</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">OpenClaw</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    KI-Agent, der per Messenger erreichbar ist — Deployments, Änderungen,
                    Inhaltspflege: einfach eine Nachricht schicken, der Agent setzt es um.
                    Wie mit der eigenen Website über Telegram schreiben, und sie passt sich
                    an — ohne den Laptop in die Hand zu nehmen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech-Stack */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-2">Tech-Stack</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Die Auswahl ist bewusst auf Wartbarkeit durch eine Person ausgelegt: SQLite statt
            Managed Database, Self-Hosting statt Cloud-Dienste, ein VPS statt Dutzend
            Microservices.
          </p>
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

        {/* Architektur / Pipeline */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-2">Wie das System funktioniert</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Das Herzstück der Plattform ist eine automatisierte Scraping-Pipeline, die wöchentlich
            neue KI-Technologien erfasst, aufbereitet und zur Kuration bereitstellt.
          </p>
          <div className="relative">
            {pipeline.map((step, index) => (
              <div key={step.label} className="flex items-start gap-4 mb-1">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-base shrink-0">
                    {step.icon}
                  </div>
                  {index < pipeline.length - 1 && (
                    <div className="w-px h-4 bg-white/10 my-1" />
                  )}
                </div>
                <div className="pt-1.5 pb-4">
                  <span className="font-semibold text-foreground text-sm">{step.label}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deployment */}
        <section className="mb-14 rounded-xl border border-white/10 bg-surface p-6">
          <h2 className="text-base font-semibold text-foreground mb-2">Self-hosted auf einem VPS</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Die gesamte Infrastruktur läuft auf einem einzelnen Hostinger VPS — 7 Docker-Container
            (Next.js prod + stage, Nginx, Umami Analytics, Deploy-Service, PostgreSQL), gesteuert
            über Docker Compose. SSL via Let's Encrypt, automatisierte Deployments über einen
            eigenen Deploy-Service. Keine Cloud-Abhängigkeiten, keine laufenden SaaS-Kosten.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Ähnliches Projekt geplant?
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md mx-auto">
            Du willst verstehen, wie KI-Tools in deinem Team oder Produkt sinnvoll eingesetzt
            werden können? Oder hast konkrete Fragen zur Umsetzung? Lass uns darüber reden.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Kontakt aufnehmen
            <span aria-hidden="true">→</span>
          </Link>
        </section>

      </div>
    </main>
  );
}
