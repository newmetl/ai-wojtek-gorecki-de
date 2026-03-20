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

      <main className="flex-1 pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-grid-pattern -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

        {/* Hero Profile */}
        <section className="relative px-6 md:px-20 pb-32 overflow-hidden">
          <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-7 z-10">
              <div className="mb-6 flex items-center gap-4">
                <span className="w-12 h-px bg-primary" />
                <span className="font-headline text-xs tracking-[0.3em] text-primary-dim uppercase">
                  Der Autor
                </span>
              </div>
              <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
                WOJTEK<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  GORECKI
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-[#a5abb8] max-w-2xl font-light leading-relaxed mb-8">
                Informatiker, Unternehmer und neugieriger Beobachter des KI-Zeitalters.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/wojtek-gorecki/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-[#1d2634] rounded-md border border-[#424853]/20 hover:border-primary/50 transition-all font-headline text-sm uppercase tracking-widest"
                >
                  LinkedIn
                </a>
                <Link
                  href="/kontakt"
                  className="flex items-center gap-3 px-6 py-3 bg-[#1d2634] rounded-md border border-[#424853]/20 hover:border-secondary/50 transition-all font-headline text-sm uppercase tracking-widest"
                >
                  Kontakt
                </Link>
              </div>
            </div>
            <div className="md:col-span-5 relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative aspect-[4/5] bg-[#17202c] rounded-xl overflow-hidden shadow-2xl max-w-sm">
                <Image
                  src="/images/profile.jpg"
                  alt="Wojtek Gorecki"
                  fill
                  className="object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute top-6 right-6 font-headline text-[10px] text-primary/40 tracking-widest text-right">
                  INFORMATIKER<br />UNTERNEHMER<br />BEOBACHTER
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones / Mein Weg */}
        <section className="py-24 px-6 md:px-20 bg-[#0c141e]/30">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="font-headline text-3xl font-bold mb-16 tracking-tight flex items-center gap-4">
              <span className="text-secondary">01.</span> MEIN_WEG
            </h2>
            <div className="grid md:grid-cols-3 gap-px bg-[#424853]/10">
              {chapters.map((chapter) => (
                <div
                  key={chapter.title}
                  className="bg-background p-10 hover:bg-[#17202c] transition-colors group"
                >
                  <div className="font-headline text-xs text-primary mb-10 tracking-widest uppercase">
                    {chapter.period}
                  </div>
                  <h3 className="font-headline text-lg mb-4 group-hover:text-primary-dim transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-[#a5abb8] leading-relaxed">{chapter.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Was mich beschäftigt / Manifesto */}
        <section className="py-32 px-6 md:px-20 relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto relative z-10">
            <div className="flex flex-col md:flex-row gap-20 items-start">
              <div className="md:w-1/3 md:sticky top-32">
                <h2 className="font-headline text-4xl font-bold mb-6 tracking-tight leading-none">
                  WAS MICH<br />BESCHÄFTIGT
                </h2>
                <p className="font-headline text-xs tracking-widest text-secondary-dim uppercase">
                  Meine Kernthemen
                </p>
              </div>
              <div className="md:w-2/3 space-y-20">
                {themes.map((theme, i) => (
                  <div key={theme.title} className="max-w-2xl">
                    <span className="font-headline text-6xl text-[#424853]/20 block mb-6">
                      0{i + 1}
                    </span>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{theme.emoji}</span>
                      <h4 className="font-headline text-2xl text-foreground">{theme.title}</h4>
                    </div>
                    <p className="text-lg text-[#a5abb8] leading-relaxed font-light">{theme.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Wer ich bin */}
        <section className="py-24 px-6 md:px-20 bg-[#0c141e]/30">
          <div className="max-w-[1440px] mx-auto max-w-3xl">
            <h2 className="font-headline text-3xl font-bold mb-12 tracking-tight flex items-center gap-4">
              <span className="text-secondary">02.</span> WER_ICH_BIN
            </h2>
            <div className="space-y-6 text-[#a5abb8] leading-relaxed text-lg font-light">
              <p>
                Ich bin Diplom-Informatiker, ehemaliger Softwareentwickler, Gründer, Berater —
                und seit einigen Jahren intensiver Beobachter des KI-Zeitalters. Mein Weg war selten geradlinig:
                Ich habe Software gebaut, Teams geleitet, ein Beratungsunternehmen gegründet,
                Führungskräfte begleitet — und dabei immer wieder dieselbe Frage gestellt:{" "}
                <span className="text-foreground font-normal">Wie verändert Technologie die Art, wie wir arbeiten, entscheiden und zusammenleben?</span>
              </p>
              <p>
                Diese Website ist mein Versuch, öffentlich nachzudenken — ehrlich, ohne fertige Antworten
                und ohne die Überheblichkeit, die in diesem Thema so schnell mitschwingt.
              </p>
            </div>
          </div>
        </section>

        {/* CTA / Kontakt */}
        <section className="py-24 px-6 md:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="bg-[#121a25] rounded-xl p-12 md:p-20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/20 transition-all duration-500" />
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-headline text-4xl font-bold mb-4 tracking-tight">
                    AUSTAUSCHEN?
                  </h2>
                  <p className="text-[#a5abb8] text-lg">
                    Wenn dich ähnliche Fragen beschäftigen, freue ich mich auf den Kontakt.
                  </p>
                </div>
                <div className="flex flex-wrap gap-6 md:justify-end">
                  <Link
                    href="/kontakt"
                    className="group flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-md font-headline font-bold text-sm hover:bg-primary transition-colors duration-300"
                  >
                    Nachricht schreiben
                  </Link>
                  <a
                    href="https://www.linkedin.com/in/wojtek-gorecki/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 bg-[#1d2634] rounded-md border border-[#424853]/20 hover:border-secondary/50 transition-all font-headline text-sm uppercase tracking-widest"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
