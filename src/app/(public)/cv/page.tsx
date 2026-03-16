import type { Metadata } from "next";
import Image from "next/image";
import ExperienceTimeline from "@/components/cv/ExperienceTimeline";
import SkillTags from "@/components/cv/SkillTags";
import LanguageBar from "@/components/cv/LanguageBar";

export const metadata: Metadata = {
  title: "About Me — Wojtek Gorecki, Product Owner",
  description:
    "Lebenslauf und Profil von Wojtek Gorecki — erfahrener Product Owner, Softwareentwickler und Diplom-Informatiker mit über 15 Jahren Erfahrung in der Entwicklung digitaler Produkte.",
};

const experience = [
  {
    role: "Beratung für persönliche Entwicklung",
    company: "Selbstständig",
    period: "04/2025 – heute",
    description:
      "Begleitung von Einzelpersonen in Veränderungsprozessen. Konzeption und Durchführung von Vortrags- und Dialogformaten. Aufbau und Positionierung eines eigenständigen Beratungsangebots.",
    tags: ["Coaching", "Beratung", "KI-Integration"],
  },
  {
    role: "Product Owner / Dev-Teamleiter / Projektportfoliomanager",
    company: "Shift Digital · publicplan GmbH",
    period: "05/2023 – 03/2025",
    description:
      "Konzeption und Weiterentwicklung webbasierter Empfangssysteme für digitale Verwaltungsanträge. Disziplinarische Leitung eines Entwicklungsteams, fachliche Verantwortung für ein Projektportfolio und inhaltliche Steuerung eines 13-köpfigen interdisziplinären Teams.",
    tags: ["Product Ownership", "Scrum", "Team Lead", "Öffentliche Verwaltung"],
  },
  {
    role: "Co-Founder und Mentor",
    company: "let's lead",
    period: "09/2020 – 05/2022",
    description:
      "Mitgründer eines Beratungsunternehmens. Durchführung 12-monatiger Entwicklungsprogramme für Führungskräfte. Begleitung von Transformationsprozessen in Unternehmen.",
    tags: ["Leadership", "Coaching", "Unternehmertum"],
  },
  {
    role: "Berater für Organisations- und Persönlichkeitsentwicklung",
    company: "Selbstständig",
    period: "11/2018 – 04/2023",
    description:
      "Beratung von Start-ups und Mittelständlern beim Aufbau agiler und selbstorganisierter Strukturen. Coaching von Gründer:innen und Führungskräften.",
    tags: ["Organisationsentwicklung", "Agilität", "Change Management"],
  },
  {
    role: "Trainer für JavaScript, TypeScript und React",
    company: "Freiberuflich · workshops.de",
    period: "11/2018 – 08/2020",
    description:
      "Durchführung mehrtägiger Schulungen für moderne Web-Technologien.",
    tags: ["TypeScript", "React", "JavaScript", "Training"],
  },
  {
    role: "Web-Entwickler und Team-Lead",
    company: "9elements GmbH",
    period: "02/2011 – 10/2018",
    description:
      "Entwicklung komplexer Web-Anwendungen als Full-Stack Entwickler. Fachliche Leitung von Projektteams (bis 6 Personen). Konzeption digitaler Produkte für unterschiedliche Branchen.",
    tags: ["Ruby on Rails", "JavaScript", "React", "Team Lead"],
  },
  {
    role: "Consulting und Web-Entwicklung",
    company: "e-Spirit AG",
    period: "12/2009 – 01/2011",
    description:
      "Umsetzung von Web-Projekten mit FirstSpirit CMS und Schulung von Kunden.",
    tags: ["CMS", "Consulting", "Web-Entwicklung"],
  },
];

const focuses = [
  "Strategische Schärfung und Operationalisierung von Produktvisionen",
  "Konzeption digitaler Produkte und Features von der Idee bis zur Umsetzungsreife",
  "Übersetzung von Business- und Experience-Zielen in technisch tragfähige Lösungen",
  "Integration von KI-Funktionalitäten und neuen Technologien in bestehende Produktkontexte",
  "Strukturierung, Priorisierung und Roadmap-Gestaltung in komplexen Umfeldern",
  "Enge Zusammenarbeit mit Entwicklungsteams bei Architektur- und Umsetzungsentscheidungen",
  "Entwicklung sinnvoller Test- und Qualitätsstrategien (Testability by Design)",
  "Weiterentwicklung von Team- und Zusammenarbeitsstrukturen im Produkt- und Projektkontext",
];

const technicalSkills = [
  "TypeScript", "JavaScript", "React", "Angular",
  "Ruby on Rails", "PostgreSQL", "REST APIs", "Git",
];

const productSkills = [
  "Product Ownership", "Scrum / Kanban", "Stakeholder Management",
  "Roadmap Planning", "Agile Methoden", "KI-Integration", "Prompt Engineering",
  "LLM Integration", "Digitale Transformation", "Testability by Design",
  "Organisationsentwicklung", "Leadership & Coaching",
];

const languages = [
  { name: "Deutsch", level: "Muttersprache", percent: 100 },
  { name: "Englisch", level: "Verhandlungssicher", percent: 90 },
  { name: "Polnisch", level: "Grundkenntnisse", percent: 25 },
  { name: "Französisch", level: "Grundkenntnisse", percent: 15 },
];

export default function CVPage() {
  return (
    <>
      {/* JSON-LD: Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Wojtek Gorecki",
            jobTitle: "Product Owner",
            url: "https://ai.wojtek-gorecki.de/cv",
            email: "hallo@wojtek-gorecki.de",
            image: "https://ai.wojtek-gorecki.de/images/profile.jpg",
            sameAs: ["https://www.linkedin.com/in/wojtek-gorecki/"],
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "Technische Universität Dortmund",
            },
            knowsAbout: [
              "Product Management", "Artificial Intelligence",
              "Web Development", "Digital Transformation", "Agile Methods",
            ],
          }),
        }}
      />

      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

          {/* Profil-Header */}
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
              <p className="mt-1 text-lg text-primary font-medium">
                Product Owner · Diplom-Informatiker · 15+ Jahre Erfahrung
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Erfahrener Product Owner und Softwareentwickler mit über 15 Jahren Erfahrung
                in der Entwicklung digitaler Produkte. Ich verbinde technisches
                Tiefenverständnis mit strategischer Produktverantwortung und
                Führungserfahrung — in Start-ups, Mittelstand und öffentlicher Verwaltung.
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
                <a
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-white/10"
                >
                  Kontakt aufnehmen
                </a>
              </div>
            </div>
          </div>

          {/* Tätigkeitsschwerpunkte */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-5">Tätigkeitsschwerpunkte</h2>
            <div className="rounded-xl border border-white/10 bg-card p-6">
              <ul className="space-y-2.5">
                {focuses.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-0.5 h-4 w-4 shrink-0 text-primary">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Ausbildung & Fortbildung */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Ausbildung</h2>
            <div className="space-y-3">
              <div className="rounded-xl border border-white/10 bg-card p-5">
                <p className="text-xs font-medium text-primary/80 mb-1">2009</p>
                <h3 className="font-semibold text-foreground">Diplom-Informatiker</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Technische Universität Dortmund
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-card p-5">
                <p className="text-xs font-medium text-primary/80 mb-1">2019 · Fortbildung</p>
                <h3 className="font-semibold text-foreground">Future Leadership Consultant</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Intrinsify Akademie
                </p>
              </div>
            </div>
          </section>

          {/* Berufserfahrung */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">Berufserfahrung</h2>
            <ExperienceTimeline entries={experience} />
          </section>

          {/* Skills */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">Kenntnisse</h2>
            <div className="rounded-xl border border-white/10 bg-card p-6 space-y-7">
              <SkillTags title="Technischer Hintergrund" skills={technicalSkills} variant="primary" />
              <SkillTags title="Kompetenzen" skills={productSkills} variant="secondary" />
            </div>
          </section>

          {/* Sprachen */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-6">Sprachen</h2>
            <div className="rounded-xl border border-white/10 bg-card p-6">
              <LanguageBar languages={languages} />
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
