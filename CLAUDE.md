# Technische Konzeption — ai.wojtek-gorecki.de

> **Version:** 1.0 — März 2026
> **Basiert auf:** Konzeptdokument Website-Relaunch v1.1
> **Zweck:** Technische Spezifikation als Grundlage für die Umsetzung mit Claude Code
> **Fachliches Konzept:** Siehe `docs/konzept.md` für Vision, Zielgruppe, 
> Seitenbeschreibungen, Design-Vorgaben und inhaltliche Details.
> Dieses Dokument hier enthält die technische Umsetzungsspezifikation.
---

## 1. Projektübersicht

### 1.1 Was wird gebaut?

Eine Next.js-basierte Plattform unter `ai.wojtek-gorecki.de` mit:

- **Statischen Seiten:** Home, About this Page, About Me (CV), Kontakt, Impressum, Datenschutz
- **Dynamischen Tools:** Trending AI Tech, AI Use Cases, Prompt Library, User Story Generator
- **Admin-Interface:** Geschützter Bereich zur Content-Pflege
- **Automatisiertes Scraping:** Wöchentliche Datenerfassung für Trending AI Tech
- **Analytics:** Self-hosted Umami

### 1.2 Tech-Stack

| Komponente | Technologie |
|---|---|
| Framework | Next.js 14+ (App Router), TypeScript |
| Styling | Tailwind CSS |
| UI-Komponenten | shadcn/ui |
| Datenbank | SQLite via Prisma ORM |
| KI-Integration | Anthropic Claude API (claude-sonnet-4-20250514) |
| Scraping | Cheerio (HTML), node-cron (Scheduling) |
| Analytics | Umami (self-hosted) |
| SEO | Next.js Metadata API, next-sitemap, JSON-LD |
| Auth (Admin) | NextAuth.js mit Credentials Provider |
| Hosting | Hostinger VPS, Docker Compose, Nginx + SSL |

### 1.3 MVP-Scope (Phase 1)

Phase 1 umfasst:

- Alle statischen Seiten im neuen Design
- Trending AI Tech (komplett mit Scraping-Pipeline)
- Admin-Interface (Basis: Trending verwalten, Scraping auslösen)
- Tools-Übersichtsseite mit Platzhaltern
- Docker-Setup mit Nginx, SSL, Umami
- SEO-Grundlagen

---

## 2. Ordnerstruktur

```
ai-wojtek-gorecki/
├── .env.local                    # Lokale Umgebungsvariablen
├── .env.example                  # Template für Umgebungsvariablen
├── docker-compose.yml            # Docker Compose (Next.js + Nginx + Umami)
├── Dockerfile                    # Multi-Stage Build für Next.js
├── nginx/
│   ├── nginx.conf                # Nginx-Konfiguration
│   └── ssl/                      # SSL-Zertifikate (Let's Encrypt)
├── prisma/
│   ├── schema.prisma             # Datenbankschema
│   ├── seed.ts                   # Seed-Daten (Kategorien, initiale Einträge)
│   └── migrations/               # Prisma-Migrationen
├── public/
│   ├── images/                   # Statische Bilder (Profilfoto, OG-Images)
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root Layout (Nav, Footer, Analytics)
│   │   ├── page.tsx              # Home
│   │   ├── globals.css           # Tailwind + Custom CSS
│   │   ├── tools/
│   │   │   ├── page.tsx          # Tools-Übersicht
│   │   │   ├── trending-ai/
│   │   │   │   └── page.tsx      # Trending AI Tech
│   │   │   ├── ai-use-cases/
│   │   │   │   └── page.tsx      # AI Use Cases (Phase 2)
│   │   │   ├── prompt-library/
│   │   │   │   └── page.tsx      # Prompt Library (Phase 3)
│   │   │   └── user-story-generator/
│   │   │       └── page.tsx      # User Story Generator (Phase 4)
│   │   ├── about/
│   │   │   └── page.tsx          # About this Page
│   │   ├── cv/
│   │   │   └── page.tsx          # About Me / CV
│   │   ├── kontakt/
│   │   │   └── page.tsx          # Kontakt
│   │   ├── impressum/
│   │   │   └── page.tsx          # Impressum
│   │   ├── datenschutz/
│   │   │   └── page.tsx          # Datenschutz
│   │   ├── admin/
│   │   │   ├── layout.tsx        # Admin Layout (Auth-Guard)
│   │   │   ├── page.tsx          # Admin Dashboard
│   │   │   ├── login/
│   │   │   │   └── page.tsx      # Admin Login
│   │   │   ├── trending/
│   │   │   │   ├── page.tsx      # Trending verwalten
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx  # Einzelnen Eintrag bearbeiten
│   │   │   ├── use-cases/
│   │   │   │   └── page.tsx      # Use Cases verwalten (Phase 2)
│   │   │   ├── prompts/
│   │   │   │   └── page.tsx      # Prompts verwalten (Phase 3)
│   │   │   └── categories/
│   │   │       └── page.tsx      # Kategorien verwalten
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts  # NextAuth.js Handler
│   │       ├── admin/
│   │       │   ├── trending/
│   │       │   │   ├── route.ts  # CRUD Trending
│   │       │   │   └── [id]/
│   │       │   │       └── route.ts
│   │       │   ├── categories/
│   │       │   │   └── route.ts  # CRUD Kategorien
│   │       │   ├── use-cases/
│   │       │   │   └── route.ts  # CRUD Use Cases (Phase 2)
│   │       │   ├── prompts/
│   │       │   │   └── route.ts  # CRUD Prompts (Phase 3)
│   │       │   └── scraping/
│   │       │       └── trigger/
│   │       │           └── route.ts  # Scraping manuell auslösen
│   │       ├── trending/
│   │       │   └── route.ts      # Öffentliche API: Trending-Daten
│   │       ├── user-story/
│   │       │   └── route.ts      # Claude API Proxy (Phase 4)
│   │       └── contact/
│   │           └── route.ts      # Kontaktformular
│   ├── components/
│   │   ├── ui/                   # shadcn/ui Komponenten
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── ToolTeaser.tsx
│   │   │   ├── ToolCard.tsx
│   │   │   ├── ShortProfile.tsx
│   │   │   └── LatestTrending.tsx
│   │   ├── trending/
│   │   │   ├── TrendingGrid.tsx
│   │   │   ├── TrendingCard.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── TrendBadge.tsx
│   │   ├── cv/
│   │   │   ├── ExperienceTimeline.tsx
│   │   │   ├── SkillTags.tsx
│   │   │   └── LanguageBar.tsx
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx
│   │   │   └── ContactLinks.tsx
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── TrendingTable.tsx
│   │   │   ├── TrendingEditForm.tsx
│   │   │   ├── CategoryManager.tsx
│   │   │   ├── ScrapingStatus.tsx
│   │   │   └── DashboardStats.tsx
│   │   └── shared/
│   │       ├── SectionHeading.tsx
│   │       ├── Badge.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── SEO.tsx
│   ├── lib/
│   │   ├── db.ts                 # Prisma Client Singleton
│   │   ├── auth.ts               # NextAuth.js Konfiguration
│   │   ├── claude.ts             # Claude API Client
│   │   ├── scraping/
│   │   │   ├── index.ts          # Scraping-Orchestrierung
│   │   │   ├── github.ts         # GitHub Trending Scraper
│   │   │   ├── producthunt.ts    # Product Hunt API Client
│   │   │   ├── hackernews.ts     # Hacker News API Client
│   │   │   ├── arxiv.ts          # arXiv API Client
│   │   │   ├── rss.ts            # RSS/Tech-Blog Scraper
│   │   │   ├── dedup.ts          # Deduplizierung
│   │   │   └── categorize.ts     # KI-Kategorisierung (Claude)
│   │   ├── cron.ts               # Cron-Job Setup
│   │   └── utils.ts              # Hilfsfunktionen (slugify, etc.)
│   └── types/
│       ├── trending.ts           # TypeScript Types für Trending
│       ├── usecase.ts            # Types für Use Cases
│       ├── prompt.ts             # Types für Prompts
│       └── scraping.ts           # Types für Scraping-Pipeline
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── next-sitemap.config.js        # Sitemap-Konfiguration
├── package.json
└── README.md
```

---

## 3. Datenbankschema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL") // file:./data/app.db
}

// ─── Kategorien (gemeinsam für alle Tools) ───

model Category {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  type      String   // "trending" | "usecase" | "prompt"
  emoji     String?
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  trendingTechs TrendingTech[]
  useCases      UseCase[]
  prompts       Prompt[]
}

// ─── Trending AI Tech ───

model TrendingTech {
  id            String   @id @default(cuid())
  name          String
  slug          String   @unique
  categoryId    String
  category      Category @relation(fields: [categoryId], references: [id])
  description   String   // 1-2 Sätze
  emoji         String?
  sourceUrl     String?
  sourceName    String?  // "github" | "producthunt" | "hackernews" | "arxiv" | "blog"
  trendStatus   String   @default("new") // "new" | "rising" | "stable"
  reviewStatus  String   @default("pending") // "pending" | "approved" | "hidden"
  trendScore    Int      @default(0) // Berechneter Score für Sortierung
  lastScrapedAt DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([categoryId])
  @@index([trendStatus])
  @@index([reviewStatus])
}

// ─── AI Use Cases (Phase 2) ───

model UseCase {
  id              String   @id @default(cuid())
  title           String
  slug            String   @unique
  categoryId      String
  category        Category @relation(fields: [categoryId], references: [id])
  description     String   // 2-3 Sätze
  exampleCompany  String?
  complexity      String   @default("medium") // "simple" | "medium" | "complex"
  aiTechnology    String?  // z.B. "NLP", "Computer Vision", "LLM"
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([categoryId])
  @@index([complexity])
}

// ─── Prompt Library (Phase 3) ───

model Prompt {
  id            String   @id @default(cuid())
  title         String
  slug          String   @unique
  categoryId    String
  category      Category @relation(fields: [categoryId], references: [id])
  promptText    String   // Der eigentliche Prompt
  usageHints    String?  // Hinweise zur Nutzung
  exampleOutput String?  // Optionaler Beispiel-Output
  sortOrder     Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([categoryId])
}

// ─── Scraping-Log ───

model ScrapingLog {
  id           String   @id @default(cuid())
  source       String   // "github" | "producthunt" | "hackernews" | "arxiv" | "blogs" | "all"
  runAt        DateTime @default(now())
  itemsFound   Int      @default(0)
  itemsNew     Int      @default(0)
  itemsUpdated Int      @default(0)
  status       String   @default("running") // "running" | "success" | "error"
  errorMessage String?
  durationMs   Int?
}
```

### 3.1 Seed-Daten

Die Seed-Datei (`prisma/seed.ts`) legt die initialen Kategorien an:

**Trending-Kategorien:**
- LLMs & Foundation Models
- Coding-Assistenten & Dev-Tools
- Bild-, Video- & Audiogenerierung
- KI-Agenten & Automation
- Datenanalyse & Business Intelligence
- Sprache, NLP & Conversational AI
- Sicherheit, Governance & Alignment
- Infrastruktur, MLOps & Deployment

**Use-Case-Kategorien (Phase 2):**
- E-Commerce, SaaS, Gesundheit, Bildung, Finanzen, Marketing, HR, Logistik, Medien

**Prompt-Kategorien (Phase 3):**
- User Stories, Stakeholder-Kommunikation, Sprint Planning, Backlog Refinement, Marktanalyse, Wettbewerbsrecherche, Dokumentation, Testing

---

## 4. API-Endpunkte

### 4.1 Öffentliche API

| Methode | Pfad | Beschreibung |
|---|---|---|
| GET | `/api/trending` | Alle freigegebenen Trending-Einträge (mit optionalen Query-Params: `category`, `search`, `status`) |
| GET | `/api/trending/[slug]` | Einzelner Trending-Eintrag |
| POST | `/api/contact` | Kontaktformular absenden |
| POST | `/api/user-story` | User Story Generator — Claude API Proxy (Phase 4) |

### 4.2 Admin API (geschützt via NextAuth Session)

| Methode | Pfad | Beschreibung |
|---|---|---|
| GET | `/api/admin/trending` | Alle Trending-Einträge (inkl. pending/hidden) |
| POST | `/api/admin/trending` | Neuen Eintrag erstellen |
| PUT | `/api/admin/trending/[id]` | Eintrag aktualisieren |
| DELETE | `/api/admin/trending/[id]` | Eintrag löschen |
| POST | `/api/admin/scraping/trigger` | Scraping manuell auslösen |
| GET | `/api/admin/scraping/trigger` | Letzten Scraping-Status abrufen |
| GET | `/api/admin/categories` | Alle Kategorien |
| POST | `/api/admin/categories` | Neue Kategorie erstellen |
| PUT | `/api/admin/categories/[id]` | Kategorie aktualisieren |
| DELETE | `/api/admin/categories/[id]` | Kategorie löschen |

Phase 2 ergänzt: `/api/admin/use-cases` (CRUD)
Phase 3 ergänzt: `/api/admin/prompts` (CRUD)

### 4.3 API-Antwortformat

Alle API-Endpunkte folgen einem einheitlichen Format:

```typescript
// Erfolg
{
  success: true,
  data: T | T[],
  meta?: {
    total: number,
    page: number,
    pageSize: number
  }
}

// Fehler
{
  success: false,
  error: {
    code: string,
    message: string
  }
}
```

---

## 5. Scraping-Pipeline

### 5.1 Übersicht

```
[Cron / Manual Trigger]
        │
        ▼
┌──────────────────┐
│  Orchestrator     │  src/lib/scraping/index.ts
│  (runFullScrape)  │
└──────────────────┘
        │
        ├──► GitHub Trending Scraper
        ├──► Product Hunt API Client
        ├──► Hacker News API Client
        ├──► arXiv API Client
        └──► RSS/Blog Scraper
                │
                ▼
┌──────────────────┐
│  Deduplizierung   │  src/lib/scraping/dedup.ts
│  (Name-Matching)  │
└──────────────────┘
                │
                ▼
┌──────────────────┐
│  KI-Aufbereitung  │  src/lib/scraping/categorize.ts
│  (Claude API)     │
│  - Kategorisieren │
│  - Beschreibung   │
│  - Emoji zuweisen │
│  - Trend-Score    │
└──────────────────┘
                │
                ▼
┌──────────────────┐
│  Datenbank        │
│  - Neue speichern │
│  - Bestehende     │
│    aktualisieren  │
│  - Log schreiben  │
└──────────────────┘
```

### 5.2 Einzelne Scraper

#### GitHub Trending (`src/lib/scraping/github.ts`)

```typescript
interface GitHubTrendingItem {
  name: string;           // Repo-Name
  author: string;         // GitHub User/Org
  url: string;            // Repo-URL
  description: string;    // Repo-Beschreibung
  language: string;       // Programmiersprache
  stars: number;          // Gesamte Stars
  starsThisWeek: number;  // Stars in der letzten Woche
  forks: number;
}

// Ansatz: HTML-Scraping von github.com/trending
// Filter: Nur Repos mit AI/ML-Bezug (Keywords in Name oder Description)
// Fallback: Community-API wie GiTrends falls Scraping blockiert wird
```

**AI-Relevanz-Filter (Keywords):** `ai`, `llm`, `gpt`, `transformer`, `neural`, `machine-learning`, `deep-learning`, `nlp`, `computer-vision`, `diffusion`, `agent`, `rag`, `embedding`, `fine-tune`, `model`, `inference`

#### Product Hunt (`src/lib/scraping/producthunt.ts`)

```typescript
// GraphQL API: https://api.producthunt.com/v2/api/graphql
// Auth: Bearer Token (Developer Token, kostenlos)
// Query: Posts der letzten 7 Tage, gefiltert nach AI/ML Topics

const QUERY = `
  query {
    posts(order: VOTES, postedAfter: "${oneWeekAgo}", topic: "artificial-intelligence") {
      edges {
        node {
          name
          tagline
          url
          votesCount
          topics { edges { node { name } } }
        }
      }
    }
  }
`;
```

#### Hacker News (`src/lib/scraping/hackernews.ts`)

```typescript
// Offizielle Firebase API — keine Auth nötig
// https://hacker-news.firebaseio.com/v0/

// Ablauf:
// 1. GET /v0/topstories.json → Array von Story-IDs
// 2. Für Top 100: GET /v0/item/{id}.json → Story-Details
// 3. Filter: Titel oder URL enthält AI-relevante Keywords
// 4. Sortieren nach Score

interface HNStory {
  id: number;
  title: string;
  url: string;
  score: number;
  descendants: number; // Kommentare
  time: number;
}
```

#### arXiv (`src/lib/scraping/arxiv.ts`)

```typescript
// REST API: https://export.arxiv.org/api/query
// Keine Auth nötig, Rate-Limit beachten (max 1 Request/3 Sekunden)

// Query: Neueste Papers aus cs.AI, cs.LG, cs.CL
// Sortiert nach submittedDate, max 50 Results
// URL: http://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.LG+OR+cat:cs.CL&sortBy=submittedDate&sortOrder=descending&max_results=50

// Ergebnis: Atom XML → Parsen mit xml2js oder fast-xml-parser
// Extrahieren: Titel, Abstract, Autoren, Link, Kategorien
```

#### RSS/Blogs (`src/lib/scraping/rss.ts`)

```typescript
// RSS-Feeds parsen (z.B. mit rss-parser npm-Paket)
const FEEDS = [
  "https://techcrunch.com/category/artificial-intelligence/feed/",
  "https://venturebeat.com/category/ai/feed/",
  // Weitere Feeds nach Bedarf
];

// Ablauf:
// 1. Feeds abrufen und parsen
// 2. Artikel der letzten 7 Tage filtern
// 3. Titel + Beschreibung extrahieren
```

### 5.3 Deduplizierung (`src/lib/scraping/dedup.ts`)

```typescript
// Strategie:
// 1. Normalisierung: Name lowercase, Sonderzeichen entfernen
// 2. Exakter Match: Gleicher normalisierter Name → zusammenführen
// 3. Fuzzy Match: Levenshtein-Distanz < 3 → manuell prüfen (reviewStatus: "pending")
// 4. URL-Match: Gleiche Domain+Path → zusammenführen
// 5. Bei Merge: Quellen aggregieren, höchsten Score behalten
```

### 5.4 KI-Kategorisierung (`src/lib/scraping/categorize.ts`)

```typescript
// Claude API Call für Batch-Kategorisierung
// System-Prompt definiert die verfügbaren Kategorien und das Ausgabeformat

const SYSTEM_PROMPT = `Du bist ein Experte für KI-Technologien. 
Du erhältst eine Liste von Technologien/Tools/Papers und sollst für jedes:
1. Die passende Kategorie zuweisen (aus der vorgegebenen Liste)
2. Eine deutsche Kurzbeschreibung schreiben (max 2 Sätze, prägnant)
3. Ein passendes Emoji zuweisen
4. Einen Trend-Score von 1-100 vergeben (basierend auf Relevanz und Neuheit)

Antworte ausschließlich im JSON-Format.`;

// Ausgabe-Schema:
interface CategorizedItem {
  originalName: string;
  categorySlug: string;
  description: string;
  emoji: string;
  trendScore: number;
}
```

### 5.5 Cron-Job (`src/lib/cron.ts`)

```typescript
import cron from 'node-cron';

// Wöchentlich Sonntag 03:00 Uhr
cron.schedule('0 3 * * 0', async () => {
  await runFullScrape();
});

// Der Cron-Job wird beim Start des Next.js-Servers initialisiert
// (in einer separaten Datei, die in next.config.ts oder instrumentation.ts geladen wird)
```

---

## 6. Authentifizierung (Admin)

```typescript
// src/lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        password: { label: "Passwort", type: "password" }
      },
      async authorize(credentials) {
        // Einfacher Passwort-Check gegen env-Variable
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          return { id: "1", name: "Admin", role: "admin" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 Tage
  },
};
```

**Admin Layout Guard:**

```typescript
// src/app/admin/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  return <div className="flex">{/* Sidebar + Content */}{children}</div>;
}
```

---

## 7. Komponentenarchitektur

### 7.1 Root Layout

```
<html>
  <body>
    <Navbar />                    // Sticky, transparent auf Home, solid sonst
    <main>{children}</main>
    <Footer />
    <UmamiScript />              // Analytics Tracking
  </body>
</html>
```

### 7.2 Home Page — Komponentenbaum

```
Home (page.tsx)
├── Hero
│   ├── Headline + Subline (animiert)
│   ├── CTA-Buttons ("Tools entdecken", "CV ansehen")
│   └── Background (subtiles KI-Motiv, z.B. Netz/Nodes)
├── ToolTeaser
│   ├── SectionHeading ("Meine Tools")
│   └── ToolCard × 4
│       ├── Icon/Emoji
│       ├── Titel
│       ├── Kurzbeschreibung
│       ├── Status-Badge ("Live" / "Coming Soon")
│       └── Link
├── LatestTrending
│   ├── SectionHeading ("Trending AI Tech")
│   └── TrendingCard × 5 (die neuesten Einträge)
└── ShortProfile
    ├── Profilfoto
    ├── Kurztext (2-3 Sätze)
    └── Links (CV, LinkedIn, Kontakt)
```

### 7.3 Trending AI Tech — Komponentenbaum

```
TrendingAI (page.tsx)           // Server Component, lädt Daten aus DB
├── PageHeader
│   ├── Titel + Beschreibung
│   └── "Letzte Aktualisierung: [Datum]"
├── SearchBar                    // Client Component
├── CategoryFilter               // Client Component (Tabs)
│   └── Tab × n Kategorien
└── TrendingGrid                 // Client Component
    └── TrendingCard × n
        ├── Emoji
        ├── Name
        ├── TrendBadge (Neu/Steigend/Stabil)
        ├── Kurzbeschreibung
        ├── Kategorie-Tag
        └── Link zur Quelle
```

### 7.4 Admin — Komponentenbaum

```
AdminLayout
├── AdminSidebar
│   ├── Dashboard
│   ├── Trending AI Tech
│   ├── Kategorien
│   ├── (Use Cases — Phase 2)
│   ├── (Prompts — Phase 3)
│   └── Logout
└── Content
    ├── Dashboard (page.tsx)
    │   └── DashboardStats
    │       ├── Anzahl Einträge pro Tool
    │       ├── Letztes Scraping (Zeitstempel + Status)
    │       └── Nächster geplanter Lauf
    ├── Trending (page.tsx)
    │   ├── ScrapingStatus + "Jetzt scrapen" Button
    │   ├── Filter (Status: alle/pending/approved/hidden)
    │   └── TrendingTable
    │       ├── Name, Kategorie, Status, Review, Datum
    │       └── Aktionen: Bearbeiten, Freigeben, Ausblenden, Löschen
    └── Trending/[id] (page.tsx)
        └── TrendingEditForm
            ├── Name, Beschreibung, Emoji
            ├── Kategorie (Dropdown)
            ├── Trend-Status (Dropdown)
            ├── Review-Status (Dropdown)
            ├── Quell-URL
            └── Speichern / Abbrechen
```

---

## 8. SEO-Implementierung

### 8.1 Metadata API (pro Seite)

```typescript
// Beispiel: src/app/tools/trending-ai/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending AI Tech — Die wichtigsten KI-Technologien",
  description: "Wöchentlich aktualisierte Übersicht der Top-KI-Technologien, kategorisiert und mit kurzen Erklärungen. Für Product Owner und Tech-Experten.",
  openGraph: {
    title: "Trending AI Tech — ai.wojtek-gorecki.de",
    description: "Die wichtigsten KI-Technologien auf einen Blick.",
    type: "website",
    url: "https://ai.wojtek-gorecki.de/tools/trending-ai",
    images: ["/images/og/trending-ai.png"],
  },
};
```

### 8.2 JSON-LD (Strukturierte Daten)

```typescript
// Auf der Home-Seite
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Wojtek Gorecki — KI-gestützter Product Owner",
  "url": "https://ai.wojtek-gorecki.de",
  "description": "Tools und Ressourcen für Product Owner und Digitalexperten."
}
</script>

// Auf der CV-Seite
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Wojtek Gorecki",
  "jobTitle": "Product Owner",
  "url": "https://ai.wojtek-gorecki.de/cv",
  "sameAs": ["https://www.linkedin.com/in/wojtek-gorecki/"]
}
</script>
```

### 8.3 Sitemap & robots.txt

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: "https://ai.wojtek-gorecki.de",
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }
    ],
  },
};
```

---

## 9. Docker & Deployment

### 9.1 Dockerfile (Next.js)

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# SQLite Daten-Verzeichnis
RUN mkdir -p /app/data

EXPOSE 3000
CMD ["node", "server.js"]
```

### 9.2 docker-compose.yml

```yaml
version: "3.8"

services:
  app:
    build: .
    container_name: ai-wojtek-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=file:/app/data/app.db
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=https://ai.wojtek-gorecki.de
      - ADMIN_PASSWORD=${ADMIN_PASSWORD}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - PH_API_TOKEN=${PH_API_TOKEN}
    volumes:
      - app-data:/app/data

  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    container_name: ai-wojtek-umami
    restart: unless-stopped
    ports:
      - "3001:3000"
    environment:
      - DATABASE_URL=postgresql://umami:${UMAMI_DB_PASSWORD}@umami-db:5432/umami
    depends_on:
      - umami-db

  umami-db:
    image: postgres:15-alpine
    container_name: ai-wojtek-umami-db
    restart: unless-stopped
    environment:
      - POSTGRES_DB=umami
      - POSTGRES_USER=umami
      - POSTGRES_PASSWORD=${UMAMI_DB_PASSWORD}
    volumes:
      - umami-data:/var/lib/postgresql/data

  nginx:
    image: nginx:alpine
    container_name: ai-wojtek-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - certbot-webroot:/var/www/certbot:ro
    depends_on:
      - app
      - umami

volumes:
  app-data:
  umami-data:
  certbot-webroot:
```

### 9.3 Nginx-Konfiguration (Auszug)

```nginx
server {
    listen 443 ssl http2;
    server_name ai.wojtek-gorecki.de;

    ssl_certificate     /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    # Next.js App
    location / {
        proxy_pass http://app:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Umami Analytics (unter Subdomain oder Pfad)
    location /umami/ {
        rewrite ^/umami(/.*)$ $1 break;
        proxy_pass http://umami:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# HTTP → HTTPS Redirect
server {
    listen 80;
    server_name ai.wojtek-gorecki.de;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}
```

---

## 10. Umgebungsvariablen

```bash
# .env.example

# ─── Datenbank ───
DATABASE_URL="file:./data/app.db"

# ─── NextAuth ───
NEXTAUTH_SECRET="<random-32-char-string>"
NEXTAUTH_URL="https://ai.wojtek-gorecki.de"
ADMIN_PASSWORD="<sicheres-admin-passwort>"

# ─── Anthropic Claude API ───
ANTHROPIC_API_KEY="sk-ant-..."

# ─── Product Hunt API ───
PH_API_TOKEN="<developer-token>"

# ─── Umami ───
UMAMI_DB_PASSWORD="<sicheres-passwort>"
NEXT_PUBLIC_UMAMI_WEBSITE_ID="<umami-website-id>"
NEXT_PUBLIC_UMAMI_URL="https://ai.wojtek-gorecki.de/umami"

# ─── Kontaktformular ───
FORMSPREE_ENDPOINT="https://formspree.io/f/<id>"
# ODER eigene E-Mail-Konfiguration
```

---

## 11. Design-System (Tailwind-Konfiguration)

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",       // Slate 900
        surface: "#1E293B",          // Slate 800
        "surface-hover": "#334155",  // Slate 700
        primary: "#3B82F6",          // Blue 500
        "primary-hover": "#2563EB",  // Blue 600
        secondary: "#06B6D4",        // Cyan 500
        accent: "#22C55E",           // Green 500 (Trending)
        muted: "#94A3B8",            // Slate 400
        foreground: "#F8FAFC",       // Slate 50
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

**Globale CSS-Variablen** in `globals.css` für shadcn/ui-Kompatibilität.

---

## 12. Umsetzungsreihenfolge (MVP)

### Schritt 1: Projekt-Setup
1. Next.js-Projekt initialisieren mit TypeScript
2. Tailwind CSS + shadcn/ui einrichten
3. Prisma einrichten, Schema anlegen, erste Migration
4. Ordnerstruktur gemäß Abschnitt 2 anlegen
5. `.env.example` erstellen

### Schritt 2: Design-System & Layout
1. `tailwind.config.ts` mit Farbschema konfigurieren
2. `globals.css` mit Dark-Theme-Variablen
3. Root Layout mit `<Navbar>` und `<Footer>` erstellen
4. Responsive Navigation (Desktop + Mobile Hamburger)
5. `Container`, `SectionHeading`, `Badge` als Shared Components

### Schritt 3: Statische Seiten
1. Home (Hero, ToolTeaser mit Platzhaltern, ShortProfile)
2. About this Page
3. About Me (CV) — Inhalte aus aktueller Seite übernehmen
4. Kontakt (Formular + Links)
5. Impressum + Datenschutz
6. SEO: Metadata für alle Seiten, JSON-LD, Sitemap

### Schritt 4: Datenbank & Admin
1. Prisma Seed mit Kategorien ausführen
2. NextAuth.js einrichten (Credentials Provider)
3. Admin Layout + Login-Seite
4. Admin Dashboard (Statistik-Übersicht)
5. Kategorien-Verwaltung (CRUD)
6. Trending-Verwaltung (CRUD, Tabelle, Bearbeitungsformular)

### Schritt 5: Scraping-Pipeline
1. GitHub Trending Scraper implementieren + testen
2. Hacker News Client implementieren + testen
3. Product Hunt Client implementieren + testen
4. arXiv Client implementieren + testen
5. RSS/Blog Scraper implementieren + testen
6. Deduplizierung implementieren
7. Claude API Kategorisierung implementieren
8. Orchestrator (`runFullScrape`) zusammensetzen
9. Admin: "Jetzt scrapen" Button + Status-Anzeige
10. Cron-Job einrichten (wöchentlich)

### Schritt 6: Trending AI Tech (Frontend)
1. Trending-Seite mit Server Component (DB-Abfrage)
2. CategoryFilter (Client Component, Tabs)
3. SearchBar (Client Component)
4. TrendingGrid + TrendingCard
5. Home-Seite: LatestTrending-Bereich einbinden

### Schritt 7: Docker & Deployment
1. Dockerfile erstellen + testen
2. docker-compose.yml mit App + Nginx + Umami
3. Nginx-Konfiguration mit SSL
4. Auf VPS deployen, SSL einrichten
5. Umami einrichten, Tracking-Script einbinden
6. Smoke-Test aller Seiten und Features

---

## 13. Nicht-funktionale Anforderungen

| Anforderung | Ziel |
|---|---|
| Ladezeit (statische Seiten) | < 2 Sekunden |
| Ladezeit (Tool-Seiten) | < 4 Sekunden |
| Lighthouse Performance Score | > 90 |
| Mobile Responsiveness | Alle Seiten auf 320px+ benutzbar |
| Barrierefreiheit | Semantisches HTML, ARIA-Labels, Tastaturnavigation |
| Browser-Support | Aktuelle Versionen von Chrome, Firefox, Safari, Edge |
| Datenschutz | Keine Cookies (Umami ist cookieless), DSGVO-konform |
| Verfügbarkeit | Docker restart-policy: unless-stopped |

---

## 14. Spätere Phasen (Referenz)

### Phase 2: AI Use Cases
- Datenmodell steht bereits (UseCase in Prisma-Schema)
- Admin-CRUD für Use Cases + Kategorie-Pflege
- Frontend: Filter, Suche, Karten-Layout
- Aktualisierung: monatlich (manuell + KI-unterstützt)

### Phase 3: Prompt Library
- Datenmodell steht bereits (Prompt in Prisma-Schema)
- Admin-CRUD für Prompts
- Frontend: Kategorie-Nav, Suche, Expand, Copy-to-Clipboard
- Aktualisierung: monatlich

### Phase 4: User Story Generator
- API-Route: POST `/api/user-story` → Claude API
- Frontend: Eingabeformular, Ladeanimation, strukturierte Ausgabe
- Export: Copy + Markdown-Download
- Kostenkontrolle: Rate-Limiting, Token-Begrenzung, ggf. Captcha
- Details werden bei Beginn dieser Phase festgelegt

### Phase 5: Internationalisierung (i18n)
- next-intl oder next-i18next einrichten
- Routing: `/de/...` und `/en/...`
- Übersetzungsdateien für alle statischen Texte
- Tool-Inhalte: Datenbank-Felder für EN-Übersetzungen ergänzen
