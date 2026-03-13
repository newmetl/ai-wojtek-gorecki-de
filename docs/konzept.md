# Fachliches Konzept — Website-Relaunch ai.wojtek-gorecki.de

> **Version:** 1.1 — März 2026  
> **Status:** Finaler Entwurf  
> **Technische Umsetzung:** Siehe `CLAUDE.md`

---

## 1. Executive Summary

Dieses Dokument beschreibt das fachliche Konzept für den Relaunch der Website ai.wojtek-gorecki.de. Die bestehende statische Portfolio-Website wird zu einer dynamischen Plattform mit interaktiven Tools für Product Owner und Digitalexperten weiterentwickelt.

Die Plattform verfolgt zwei zentrale Ziele: Erstens soll sie echten Mehrwert durch praxisnahe Werkzeuge bieten. Zweitens dient sie als lebendige Referenz, die Wojtek Gorecki als Experten an der Schnittstelle von Produktmanagement und Künstlicher Intelligenz positioniert.

### Kernentscheidungen

- **Tech-Stack:** Next.js 14+ (App Router) mit TypeScript
- **Hosting:** Hostinger VPS + Docker (bestehendes Setup)
- **Sprache:** Deutsch (Englisch in späterer Phase)
- **Datenbank:** SQLite (via Prisma/Drizzle), Migration zu PostgreSQL möglich
- **Analytics:** Umami (self-hosted, privacy-freundlich)
- **SEO:** Von Anfang an mit Meta-Tags, Open Graph und strukturierten Daten
- **Admin:** Leichtgewichtiges Admin-Interface für Content-Pflege
- **Ansatz:** MVP-first mit schrittweiser Erweiterung

---

## 2. Ausgangslage

### 2.1 Aktuelle Website

Die bestehende Website ist eine statische Portfolio-Seite mit vier Seiten: Home, CV, Case Study und Kontakt. Sie wurde über den KI-Agenten OpenClaw mit Claude Opus erstellt und läuft auf einem Hostinger VPS in einem Docker-Container.

| Eigenschaft | Wert |
|---|---|
| URL | ai.wojtek-gorecki.de |
| Technologie | Statisches HTML/CSS/JS |
| Hosting | Hostinger VPS, Docker, Python SimpleHTTPServer |
| Kontaktformular | Formspree |
| Sprachen | Deutsch und Englisch |
| KI-Agent | OpenClaw mit Claude Opus 4 |

### 2.2 Motivation für den Relaunch

- **Von der Visitenkarte zur Plattform:** Statt nur über Kompetenzen zu sprechen, sollen diese durch funktionierende Tools demonstriert werden.
- **Expertenstatus untermauern:** Regelmäßig aktualisierte Inhalte zu AI-Trends und Use Cases zeigen, dass Wojtek am Puls der Technologie ist.
- **Praktischer Mehrwert:** Tools wie die Prompt Library und der User Story Generator sind direkt im Arbeitsalltag nutzbar.
- **Technische Referenz:** Die Seite selbst demonstriert moderne Webentwicklung mit Next.js, API-Integration und KI-gestützte Datenaufbereitung.

---

## 3. Vision & Ziele

### 3.1 Vision

ai.wojtek-gorecki.de wird zur **Anlaufstelle für Product Owner und Digitalexperten**, die praxisnah verstehen wollen, wie KI ihre Arbeit verbessern kann — mit konkreten Tools, kuratierten Inhalten und realen Beispielen.

### 3.2 Zielgruppe

- **Primär:** Product Owner und Produktmanager, die KI in ihre Arbeit integrieren wollen
- **Sekundär:** Tech-Leads, CTOs und Gründer:innen, die nach KI-Inspiration für ihre Produkte suchen
- **Tertiär:** Potenzielle Auftraggeber und Arbeitgeber, die sich ein Bild von Wojteks Kompetenz machen wollen

### 3.3 Erfolgskriterien

- Mindestens ein Tool (Trending AI Tech) ist funktionsfähig und wird regelmäßig automatisch aktualisiert
- Die Seite hinterlässt visuell einen professionellen, modernen Eindruck
- Die Architektur ermöglicht einfaches Hinzufügen weiterer Tools ohne größere Umbauarbeiten
- Ladezeiten unter 2 Sekunden für statische Seiten, unter 4 Sekunden für Tool-Seiten
- SEO-Grundlagen (Meta-Tags, Open Graph, strukturierte Daten) sind von Anfang an implementiert

---

## 4. Seitenstruktur & Navigation

### 4.1 Sitemap

| Seite | Pfad | Beschreibung |
|---|---|---|
| Home | `/` | Startseite mit Hero, Tool-Teaser, Kurzprofil |
| Tools | `/tools` | Übersichtsseite aller Tools |
| → Trending AI Tech | `/tools/trending-ai` | Top-10-Listen nach Kategorien |
| → AI Use Cases | `/tools/ai-use-cases` | Kuratierte Use-Case-Sammlung |
| → Prompt Library | `/tools/prompt-library` | Prompt-Datenbank für POs |
| → User Story Generator | `/tools/user-story-generator` | Interaktives Tool |
| About this Page | `/about` | Entstehungsgeschichte & eingesetzte Technologien |
| About Me | `/cv` | Lebenslauf / Profil |
| Kontakt | `/kontakt` | Formular + Kontakt-Links |
| Admin | `/admin` | Geschützter Bereich für Content-Pflege |
| Impressum | `/impressum` | Rechtlich erforderlich |
| Datenschutz | `/datenschutz` | Rechtlich erforderlich |

### 4.2 Navigation

Die Hauptnavigation enthält: Home, Tools (mit Dropdown zu den einzelnen Tools), About this Page, About Me und Kontakt. Impressum und Datenschutz werden im Footer verlinkt. Der Admin-Bereich ist nicht in der Navigation sichtbar.

Auf mobilen Geräten wird die Navigation zu einem Hamburger-Menü zusammengefasst.

---

## 5. Detaillierte Seitenbeschreibungen

### 5.1 Home

**Zweck:** Erster Eindruck, Orientierung geben, zu den Tools führen.

**Aufbau:**

1. **Hero-Bereich:** Headline, Subline, Call-to-Action zu den Tools
2. **Tool-Teaser:** Visuelle Karten der vier Tools mit kurzer Beschreibung und Link
3. **Kurzprofil:** Foto, 2–3 Sätze zur Person, Link zum CV
4. **Aktuelles:** Dynamischer Bereich mit den neuesten Trending-AI-Einträgen

> **Design-Hinweis:** Der Hero-Bereich soll visuell stark sein — dunkel, modern, mit einem subtilen KI/Tech-Motiv. Die Tool-Karten sollen interaktiv wirken (Hover-Effekte, Icons) und Lust machen, sie auszuprobieren.

---

### 5.2 Tool: Trending AI Tech

**Zweck:** Einen stets aktuellen Überblick über die wichtigsten KI-Technologien bieten, kategorisiert und mit kurzen Erklärungen.

#### 5.2.1 Datenquellen & Scraping-Strategie

| Quelle | Zugang | Liefert | Intervall |
|---|---|---|---|
| GitHub Trending | HTML-Scraping oder Community-APIs (z.B. GiTrends) | Trending Repos nach Sprache/Zeitraum, Stars, Forks, Beschreibungen | Wöchentlich |
| Product Hunt | GraphQL API (api.producthunt.com/v2), kostenloser Developer Token | Neue AI-Produkt-Launches, Upvotes, Taglines, Kategorien | Wöchentlich |
| Hacker News | Offizielle Firebase API (keine Auth nötig) | Top-Stories mit AI-Bezug, Scores, Kommentarzahlen | Wöchentlich |
| arXiv | Offene REST API (export.arxiv.org/api), Python-Bibliothek arxiv.py | Neueste AI/ML-Papers mit Abstracts aus cs.AI, cs.LG, cs.CL | Wöchentlich |
| Tech-Blogs & News | RSS-Feeds + Web-Scraping (Cheerio/Playwright) | Artikel von TechCrunch AI, VentureBeat AI, Ars Technica | Wöchentlich |

#### 5.2.2 Aufbereitungspipeline

1. Cron-Job sammelt Rohdaten aus allen Quellen
2. Deduplizierung: Gleiche Technologien aus verschiedenen Quellen werden zusammengeführt
3. KI-Aufbereitung (Claude API): Kategorisierung, Zusammenfassung in 1–2 Sätze, Emoji-Zuweisung, Trending-Score
4. Speicherung in der Datenbank mit Zeitstempel und Quell-Referenzen
5. Admin-Review: Über das Admin-Interface können Einträge nach dem Scraping angepasst, ergänzt oder entfernt werden

#### 5.2.3 Kategorien (initial)

- LLMs & Foundation Models
- Coding-Assistenten & Dev-Tools
- Bild-, Video- & Audiogenerierung
- KI-Agenten & Automation
- Datenanalyse & Business Intelligence
- Sprache, NLP & Conversational AI
- Sicherheit, Governance & Alignment
- Infrastruktur, MLOps & Deployment

#### 5.2.4 Pro Technologie

- Name + Emoji/Icon
- Kurzbeschreibung (1–2 Sätze)
- Link zur Originalquelle
- Trending-Status: Neu / Steigend / Stabil
- Datum der letzten Aktualisierung

#### 5.2.5 UI-Elemente

- Kategorie-Filter (Tabs oder Sidebar)
- Suchfeld zum schnellen Finden
- Kompakte Karten-Ansicht (Grid) mit Expand-Option für Details
- Badge für Trending-Status (Neu, Hot, Stabil)

---

### 5.3 Tool: AI Use Cases

**Zweck:** Inspiration für Unternehmer und Tech-Experten, wie sie ihre digitalen Produkte mit KI sinnvoll erweitern oder welche neuen Produkte möglich sind.

**Kategorien (Beispiele):** E-Commerce, SaaS, Gesundheit, Bildung, Finanzen, Marketing, HR, Logistik, Medien

**Pro Use Case:**
- Titel
- Kategorie-Tag
- Kurzbeschreibung (2–3 Sätze)
- Beispiel-Unternehmen (wenn vorhanden)
- Komplexitätsstufe: Einfach / Mittel / Komplex
- Eingesetzte KI-Technologie

**Datenquelle:** Kuratiert, ergänzt durch KI-gestützte Recherche. Semi-automatisch gepflegt über Admin-Interface.

**Aktualisierung:** Monatlich

**UI:** Filter nach Kategorie und Komplexität, Suchfunktion, Karten-Layout mit farbcodierten Kategorie-Tags

---

### 5.4 Tool: Prompt Library

**Zweck:** Eine nach Kategorien sortierte Datenbank mit nützlichen Prompts, um als Product Owner effektiver zu arbeiten.

**Kategorien (Beispiele):** User Stories schreiben, Stakeholder-Kommunikation, Sprint Planning, Backlog Refinement, Marktanalyse, Wettbewerbsrecherche, Dokumentation, Testing

**Pro Prompt:**
- Titel
- Kategorie
- Prompt-Text
- Hinweise zur Nutzung
- Beispiel-Output (optional)

**Interaktion:** Copy-to-Clipboard Button, Favoriten-Markierung (lokal, ohne Login)

**Aktualisierung:** Monatlich, über Admin-Interface pflegbar

**UI:** Kategorie-Navigation, Suche, kompakte Liste mit Expand, Copy-Button pro Prompt

---

### 5.5 Tool: User Story Generator

**Zweck:** Aus einer groben Produktidee eine strukturierte Liste mit Anforderungen und User Stories generieren — unterstützt durch KI.

**Ablauf:**

1. **Eingabe:** Nutzer beschreibt Produktidee in Freitextfeld (1–5 Sätze)
2. **Optional:** Auswahl von Zielgruppe, Branche und gewünschtem Detailgrad
3. **Verarbeitung:** Eingabe wird serverseitig an Claude API gesendet mit spezialisiertem System-Prompt
4. **Ausgabe:** Strukturierte Liste mit Epics, User Stories (Als [Rolle] möchte ich [Aktion] damit [Nutzen]), Akzeptanzkriterien und Priorisierungsvorschlag

**Export:** Kopieren oder als Markdown herunterladen

**Kostenkontrolle:** Details werden bei der konkreten Umsetzung dieses Tools festgelegt (Rate-Limiting, Token-Begrenzung, ggf. Captcha).

**UI-Elemente:**
- Eingabeformular mit Freitextfeld und optionalen Dropdowns
- Ladeanimation während der KI-Verarbeitung
- Strukturierte Ergebnis-Darstellung (gruppiert nach Epics)
- Export-Optionen: Kopieren, als Markdown herunterladen

---

### 5.6 About this Page

**Zweck:** Transparenz darüber, wie die Seite entstanden ist und welche Technologien zum Einsatz kommen.

**Inhalte:**
- Entstehungsgeschichte: Vom statischen Portfolio zur Tool-Plattform
- Eingesetzte Technologien: Next.js, Docker, Claude API, Scraping-Stack etc.
- Architektur-Diagramm: Wie die Komponenten zusammenspielen
- Lessons Learned und Verweis auf OpenClaw

---

### 5.7 About Me (CV)

**Zweck:** Professionelle Darstellung des Lebenslaufs.

Die Inhalte des aktuellen CVs werden übernommen: Berufserfahrung, Tätigkeitsschwerpunkte, Ausbildung, technischer Hintergrund, Kompetenzen und Sprachen. Das Layout wird an das neue Design angepasst — modern, scanbar, mit visuellen Akzenten.

#### Tätigkeitsschwerpunkte

- Strategische Schärfung und Operationalisierung von Produktvisionen
- Konzeption digitaler Produkte und Features von der Idee bis zur Umsetzungsreife
- Übersetzung von Business- und Experience-Zielen in technisch tragfähige Lösungen
- Integration von KI-Funktionalitäten und neuen Technologien in bestehende Produktkontexte
- Strukturierung, Priorisierung und Roadmap-Gestaltung in komplexen Umfeldern
- Enge Zusammenarbeit mit Entwicklungsteams bei Architektur- und Umsetzungsentscheidungen
- Entwicklung sinnvoller Test- und Qualitätsstrategien (Testability by Design)
- Weiterentwicklung von Team- und Zusammenarbeitsstrukturen im Produkt- und Projektkontext

#### Berufserfahrung

- **Beratung für persönliche Entwicklung** — Selbstständig, 04/2025 – heute
- **Product Owner / Dev-Teamleiter / Projektportfoliomanager** — Shift Digital / publicplan GmbH, 05/2023 – 03/2025
- **Co-Founder und Mentor** — let's lead, 09/2020 – 05/2022
- **Berater für Organisations- und Persönlichkeitsentwicklung** — Selbstständig, 11/2018 – 04/2023
- **Trainer für JavaScript, TypeScript und React** — Freiberuflich bei workshops.de, 11/2018 – 08/2020
- **Web-Entwickler und Team-Lead** — 9elements GmbH, 02/2011 – 10/2018
- **Consulting und Web-Entwicklung** — e-Spirit AG, 12/2009 – 01/2011

#### Ausbildung

- **Diplom-Informatiker** — Technische Universität Dortmund, Abschluss 2009

#### Technischer Hintergrund

TypeScript, JavaScript, React, Angular, Ruby on Rails, PostgreSQL, REST APIs, Git

#### Kompetenzen

Product Ownership, Scrum / Kanban, Stakeholder Management, Künstliche Intelligenz, Prompt Engineering, LLM Integration, Roadmap Planning, Organisationsentwicklung, Leadership & Coaching, Digitale Transformation, Testability by Design, Agile Methoden

#### Sprachen

- Deutsch — Muttersprache
- Englisch — Verhandlungssicher
- Polnisch — Grundkenntnisse
- Französisch — Grundkenntnisse

---

### 5.8 Kontakt

**Elemente:**
- Kontaktformular (Name, E-Mail, Nachricht) — Backend via Formspree oder eigenen API-Endpunkt
- Direkte Links: WhatsApp, Telegram, E-Mail, Telefon
- Calendly-Link für Zoom-Call-Buchung (https://calendly.com/wojtek-gorecki/60-minuten-gesprach)
- LinkedIn-Profil (https://www.linkedin.com/in/wojtek-gorecki/)

---

## 6. Admin-Interface

Ein leichtgewichtiges, passwortgeschütztes Admin-Interface ermöglicht die Pflege der dynamischen Inhalte nach automatisierten Scraping-Läufen.

### 6.1 Zugang & Sicherheit

- Erreichbar unter `/admin` (nicht in der öffentlichen Navigation)
- Authentifizierung über einfaches Passwort oder Token-basierte Lösung (NextAuth.js mit Credentials-Provider)
- Nur ein Nutzer (Admin = Wojtek)

### 6.2 Funktionsumfang

**Trending AI Tech:**
- Liste aller gescrapten Einträge mit Status (neu/geprüft/ausgeblendet)
- Bearbeiten: Beschreibung anpassen, Kategorie ändern, Emoji ändern
- Manuell hinzufügen oder entfernen
- Scraping manuell auslösen (Button)
- Letzten Scraping-Lauf einsehen (Zeitstempel, Anzahl neue Einträge)

**AI Use Cases & Prompt Library:**
- CRUD-Operationen (Erstellen, Bearbeiten, Löschen)
- Kategorie-Verwaltung
- Reihenfolge/Sortierung anpassen

**Dashboard:**
- Schnellübersicht: Anzahl Einträge pro Tool, letztes Update, nächster Scraping-Lauf

> **Hinweis:** Das Admin-Interface wird als geschützte Route in der Next.js App umgesetzt. Kein separates CMS — alles innerhalb der bestehenden Anwendung. UI: Schlicht und funktional, z.B. mit shadcn/ui Komponenten.

---

## 7. Design & Visuelles Konzept

### 7.1 Design-Prinzipien

- **Modern & professionell:** Dunkles Farbschema mit hellen Akzenten. Klare Typografie, großzügiger Whitespace.
- **Tool-fokussiert:** Die Tools stehen im Mittelpunkt, nicht die Person. Der CV ergänzt, dominiert aber nicht.
- **Interaktiv:** Hover-Effekte, Micro-Animations, reibungslose Übergänge. Die Seite soll sich lebendig anfühlen.
- **Responsiv:** Mobile-first Design. Alle Tools müssen auf Smartphones benutzbar sein.

### 7.2 Farbschema

| Rolle | Farbe | Verwendung |
|---|---|---|
| Hintergrund | `#0F172A` (Slate 900) | Seitenhintergrund |
| Primärfarbe | `#3B82F6` (Blue 500) | CTAs, Links, Akzente |
| Sekundärfarbe | `#06B6D4` (Cyan 500) | Highlights |
| Text | `#F8FAFC` (Slate 50) | Haupttext auf dunklem Hintergrund |
| Karten | `#1E293B` (Slate 800) | Leicht angehobener dunkler Ton |
| Erfolg/Trend | `#22C55E` (Green 500) | Trending-Indikatoren |
| Muted | `#94A3B8` (Slate 400) | Sekundärer Text |

### 7.3 Typografie

- **Hauptschrift:** Inter oder Geist Sans (modern, gut lesbar, Google-Font-verfügbar)
- **Code:** JetBrains Mono oder Fira Code

---

## 8. MVP-Definition & Roadmap

### 8.1 MVP (Phase 1)

Der MVP umfasst:

- Alle statischen Seiten: Home, About this Page, About Me (CV), Kontakt, Impressum, Datenschutz
- Neues Design-System (Dark Theme, Tailwind, shadcn/ui)
- Responsive Navigation mit Hamburger-Menü
- Tool #1: Trending AI Tech — komplett mit Scraping-Pipeline, KI-Aufbereitung und UI
- Admin-Interface (Basis): Login, Trending-Einträge verwalten, Scraping-Status
- Tools-Übersichtsseite mit Platzhaltern für kommende Tools
- Docker-Setup mit Nginx, SSL und Umami
- SEO-Grundlagen: Meta-Tags, Open Graph, Sitemap, JSON-LD
- Umami Analytics eingebunden

### 8.2 Roadmap

| Phase | Zeitraum | Inhalte |
|---|---|---|
| **Phase 1** | MVP | Grundstruktur, Design-System, Trending AI Tech (komplett mit Scraping), Admin-Basis, Docker, SEO, Umami |
| **Phase 2** | Nach MVP | AI Use Cases: Kuratierte Datenbank, Filter, Karten-UI. Admin erweitert um Use-Case-Pflege. |
| **Phase 3** | Nach Phase 2 | Prompt Library: Prompt-Datenbank, Copy-to-Clipboard, Suche. Admin erweitert um Prompt-Pflege. |
| **Phase 4** | Nach Phase 3 | User Story Generator: Claude API Integration, Eingabeformular, strukturierte Ausgabe, Export. Kostenkontrolle. |
| **Phase 5** | Später | Englische Sprachversion (i18n). Übersetzung aller Inhalte und Tool-Interfaces. |

---

## 9. Verbleibende offene Punkte

1. **Kostenkontrolle Claude API (User Story Generator):** Budget-Limits, Token-Begrenzung pro Anfrage, Captcha-Schutz — wird bei Phase 4 konkretisiert.
2. **Scraping-Feintuning:** Exakte Selektoren und API-Parameter werden beim Aufsetzen der Pipeline iterativ getestet.
3. **OG-Images:** Automatische Generierung (z.B. via @vercel/og oder Satori) oder manuelle Erstellung?