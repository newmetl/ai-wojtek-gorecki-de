import type { Metadata } from "next";
import Image from "next/image";
import ExperienceTimeline from "@/components/cv/ExperienceTimeline";
import SkillTags from "@/components/cv/SkillTags";
import LanguageBar from "@/components/cv/LanguageBar";

export const metadata: Metadata = {
  title: "About Me — Wojtek Gorecki, Product Owner",
  description:
    "Lebenslauf und Profil von Wojtek Gorecki — Product Owner und Digitalexperte mit Fokus auf KI-Integration, Agile Methoden und Digital Transformation.",
};

const experience = [
  {
    role: "Personal Development Consulting",
    company: "Selbstständig",
    period: "04/2025 – heute",
    description:
      "Beratung und Coaching im Bereich persönliche und organisationale Entwicklung. Entwicklung dieser KI-Plattform als Praxisprojekt.",
    tags: ["Coaching", "KI-Integration", "Next.js", "Claude API"],
  },
  {
    role: "Product Owner / Dev Team Lead / Project Portfolio Manager",
    company: "Shift Digital / publicplan GmbH",
    period: "05/2023 – 03/2025",
    description:
      "Leitung von Entwicklungsteams, strategische Produktentwicklung und Portfolio-Management für digitale Verwaltungsprodukte. KI-Integration in bestehende Produkte und Prozesse.",
    tags: ["Product Ownership", "Scrum", "LLM-Integration", "Team Lead"],
  },
  {
    role: "Co-Founder & Mentor",
    company: "let's lead",
    period: "09/2020 – 05/2022",
    description:
      "Mitgründung und Aufbau eines Programms zur Führungskräfteentwicklung. Konzeption und Durchführung von Workshops und Coachings.",
    tags: ["Leadership", "Coaching", "Unternehmertum"],
  },
  {
    role: "Organizational & Personal Development Consultant",
    company: "Selbstständig",
    period: "11/2018 – 04/2023",
    description:
      "Beratungsprojekte für Organisationsentwicklung und digitale Transformation in verschiedenen Branchen.",
    tags: ["Organisationsentwicklung", "Change Management", "Agilität"],
  },
  {
    role: "JavaScript / TypeScript / React Trainer",
    company: "workshops.de",
    period: "11/2018 – 08/2020",
    description:
      "Konzeption und Durchführung von Entwickler-Workshops zu modernen Web-Technologien.",
    tags: ["TypeScript", "React", "Training", "JavaScript"],
  },
  {
    role: "Web Developer & Team Lead",
    company: "9elements GmbH",
    period: "02/2011 – 10/2018",
    description:
      "Entwicklung und Leitung von Web-Projekten für internationale Kunden. Aufbau und Führung von Entwicklungsteams.",
    tags: ["Ruby on Rails", "JavaScript", "React", "Team Lead"],
  },
  {
    role: "Consulting & Web Development",
    company: "e-Spirit AG",
    period: "12/2009 – 01/2011",
    description:
      "Beratung und Entwicklung im Bereich Content-Management-Systeme.",
    tags: ["Java", "CMS", "Consulting"],
  },
];

const technicalSkills = [
  "TypeScript", "JavaScript", "React", "Next.js", "Node.js",
  "Angular", "Ruby on Rails", "PostgreSQL", "SQLite", "Prisma",
  "REST APIs", "GraphQL", "Docker", "Git",
];

const productSkills = [
  "Product Ownership", "Scrum / Kanban", "Stakeholder Management",
  "Roadmap Planning", "Agile Methods", "KI-Integration", "Prompt Engineering",
  "LLM Integration", "Digital Transformation", "Testability by Design",
  "Organizational Development", "Leadership & Coaching",
];

const languages = [
  { name: "Deutsch", level: "Muttersprache", percent: 100 },
  { name: "Englisch", level: "Fließend (C1)", percent: 85 },
  { name: "Polnisch", level: "Grundkenntnisse (A2)", percent: 30 },
  { name: "Französisch", level: "Grundkenntnisse (A1)", percent: 15 },
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
                Product Owner · Digitalexperte · KI-Enthusiast
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Mit über 15 Jahren Erfahrung in Web-Entwicklung und Produktmanagement
                begleite ich Teams und Organisationen an der Schnittstelle von Technologie,
                Produktstrategie und KI-Integration. Mein Fokus liegt auf praxisnaher
                Umsetzung — vom Konzept bis zur produktionsreifen Lösung.
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

          {/* Ausbildung */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Ausbildung</h2>
            <div className="rounded-xl border border-white/10 bg-card p-5">
              <p className="text-xs font-medium text-primary/80 mb-1">2009</p>
              <h3 className="font-semibold text-foreground">Diplom-Informatiker</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Technische Universität Dortmund
              </p>
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
              <SkillTags title="Technisch" skills={technicalSkills} variant="primary" />
              <SkillTags title="Fachlich" skills={productSkills} variant="secondary" />
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
