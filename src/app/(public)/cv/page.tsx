import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Me — Wojtek Gorecki",
  description:
    "Ich bin Informatiker, ehemaliger Softwareentwickler, Gründer und Berater — und seit einigen Jahren intensiver Beobachter des KI-Zeitalters.",
  openGraph: {
    title: "About Me — Wojtek Gorecki",
    description:
      "Informatiker, Unternehmer und neugieriger Beobachter des KI-Zeitalters.",
    type: "profile",
    url: "https://ai.wojtek-gorecki.de/cv",
  },
};

const themes = [
  {
    emoji: "🌍",
    title: "Die gesellschaftliche Frage",
    text: "Nicht \"Was kann KI?\" — sondern \"Was macht KI mit uns?\" Wie verändert sie unser Selbstbild, unsere Demokratie, unsere Gemeinschaften?",
  },
  {
    emoji: "💼",
    title: "Die Arbeitswelt",
    text: "Welche Rollen verschwinden, welche entstehen neu? Wie müssen sich Organisationen verändern, um mit KI sinnvoll umzugehen?",
  },
  {
    emoji: "🔬",
    title: "Die Technologie",
    text: "Was ist wirklich Substanz, was ist Hype? Ich versuche, die Entwicklungen einzuordnen — mit dem Blick eines Informatikers, nicht eines Marketers.",
  },
  {
    emoji: "🧠",
    title: "Die menschliche Seite",
    text: "Angst, Neugier, Überforderung — wie gehen Menschen mit dem Wandel um? Was brauchen sie, um handlungsfähig zu bleiben?",
  },
];

const chapters = [
  {
    period: "2009 – 2018",
    title: "Informatik & Software",
    text: "Diplom-Informatiker von der TU Dortmund. Danach sieben Jahre als Webentwickler und Team Lead bei 9elements — komplexe Webanwendungen, Full-Stack, Produktentwicklung für verschiedenste Branchen.",
  },
  {
    period: "2018 – 2025",
    title: "Führung & Menschen",
    text: "Wechsel auf die menschliche Seite: Leadership-Beratung, Co-Gründer von let's lead, Begleitung von Führungskräften und Organisationen. Zuletzt Product Owner und Teamleiter in der öffentlichen Verwaltung.",
  },
  {
    period: "2025 – heute",
    title: "KI & Wandel",
    text: "Intensive Auseinandersetzung mit KI und ihren gesellschaftlichen Implikationen. Aufbau dieser Plattform als Ort für Beobachtungen, Einordnungen und offene Fragen.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Wojtek Gorecki",
            url: "https://ai.wojtek-gorecki.de/cv",
            image: "https://ai.wojtek-gorecki.de/images/profile.jpg",
            sameAs: ["https://www.linkedin.com/in/wojtek-gorecki/"],
            knowsAbout: ["Artificial Intelligence", "Digital Transformation", "Web Development", "Leadership"],
          }),
        }}
      />

      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

          {/* Header */}
          <div className="mb-16 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
            <div className="relative shrink-0 self-start">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-primary/40 to-secondary/20 blur" />
              <Image
                src="/images/profile.jpg"
                alt="Wojtek Gorecki"
                width={140}
                height={140}
                className="relative rounded-full object-cover ring-2 ring-primary/30"
                priority
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                Wojtek Gorecki
              </h1>
              <p className="mt-2 text-lg text-primary font-medium">
                Informatiker, Unternehmer und neugieriger Beobachter des KI-Zeitalters.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/wojtek-gorecki/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-white/10"
                >
                  Kontakt aufnehmen
                </Link>
              </div>
            </div>
          </div>

          {/* Wer ich bin */}
          <section className="mb-14">
            <h2 className="text-xl font-bold text-foreground mb-5">Wer ich bin</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Ich bin Diplom-Informatiker, ehemaliger Softwareentwickler, Gründer, Berater —
                und seit einigen Jahren intensiver Beobachter des KI-Zeitalters. Mein Weg war selten geradlinig:
                Ich habe Software gebaut, Teams geleitet, ein Beratungsunternehmen gegründet,
                Führungskräfte begleitet — und dabei immer wieder dieselbe Frage gestellt:
                <span className="text-foreground font-medium"> Wie verändert Technologie eigentlich die Art, wie wir arbeiten, entscheiden und zusammenleben?</span>
              </p>
              <p>
                Diese Frage hat mich durch eine Informatikkarriere geführt, dann in die Welt von Leadership
                und Organisationsentwicklung — und schließlich mitten hinein ins KI-Zeitalter.
                Heute brenne ich heißer denn je auf diese Frage. Nicht weil KI einfach faszinierend ist,
                sondern weil die Antworten darauf bestimmen werden, wie wir als Gesellschaft die nächsten
                Jahrzehnte gestalten.
              </p>
              <p>
                Diese Website ist mein Versuch, öffentlich nachzudenken — ehrlich, ohne fertige Antworten
                und ohne die Überheblichkeit, die in diesem Thema so schnell mitschwingt.
              </p>
            </div>
          </section>

          {/* Was mich beschäftigt */}
          <section className="mb-14">
            <h2 className="text-xl font-bold text-foreground mb-5">Was mich beschäftigt</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {themes.map((theme) => (
                <div
                  key={theme.title}
                  className="rounded-xl border border-white/10 bg-surface p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl leading-none">{theme.emoji}</span>
                    <h3 className="font-semibold text-foreground text-sm">{theme.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{theme.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Mein Weg */}
          <section className="mb-14">
            <h2 className="text-xl font-bold text-foreground mb-5">Mein Weg</h2>
            <div className="relative">
              {/* Vertikale Linie */}
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10" />
              <div className="space-y-8">
                {chapters.map((chapter) => (
                  <div key={chapter.title} className="relative flex gap-6">
                    {/* Punkt auf der Linie */}
                    <div className="relative shrink-0 mt-1">
                      <div className="h-5 w-5 rounded-full border-2 border-primary bg-background" />
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-xs font-semibold text-primary mb-1">{chapter.period}</p>
                      <h3 className="font-semibold text-foreground mb-2">{chapter.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{chapter.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="rounded-2xl border border-white/10 bg-surface p-8 text-center">
            <p className="text-foreground font-semibold mb-2">Austauschen?</p>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              Wenn dich ähnliche Fragen beschäftigen, freue ich mich auf den Kontakt.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
              >
                Nachricht schreiben
              </Link>
              <a
                href="https://www.linkedin.com/in/wojtek-gorecki/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-white/10 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
