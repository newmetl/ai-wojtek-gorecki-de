# ai.wojtek-gorecki.de

Next.js-Plattform für KI-Tools und Ressourcen für Product Owner und Digitalexperten.

**Live:** https://ai.wojtek-gorecki.de
**Staging:** https://ai-stage.wojtek-gorecki.de

---

## Tech Stack

| Komponente | Technologie |
|---|---|
| Framework | Next.js 16 (App Router), TypeScript |
| Styling | Tailwind CSS v4 |
| UI-Komponenten | shadcn/ui v4 |
| Datenbank | SQLite via Prisma ORM v6 |
| KI-Integration | Anthropic Claude API |
| Analytics | Umami (self-hosted) |
| Auth (Admin) | NextAuth.js v4, Credentials Provider |
| Hosting | Hostinger VPS, Docker Compose, Nginx + SSL |

---

## Lokale Entwicklung

### Voraussetzungen

- Node.js 22+ (empfohlen via [nvm](https://github.com/nvm-sh/nvm))
- npm

### Setup

```bash
# Repo klonen
git clone git@github.com:newmetl/ai-wojtek-gorecki-de.git
cd ai-wojtek-gorecki-de

# Node-Version aktivieren (falls nvm genutzt wird)
nvm use 22

# Abhängigkeiten installieren
npm install

# Umgebungsvariablen anlegen
cp .env.example .env.local
# .env.local mit echten Werten befüllen (siehe Abschnitt Umgebungsvariablen)

# Datenbank anlegen und Seed-Daten laden
DATABASE_URL="file:./data/app.db" npx prisma migrate dev
DATABASE_URL="file:./data/app.db" npx tsx prisma/seed.ts

# Entwicklungsserver starten
npm run dev
```

Die App ist dann unter http://localhost:3000 erreichbar.
Admin-Bereich: http://localhost:3000/admin (Passwort aus `ADMIN_PASSWORD` in `.env.local`)

### Umgebungsvariablen

Alle benötigten Variablen sind in `.env.example` dokumentiert. Kopiere die Datei nach `.env.local` und befülle sie:

| Variable | Beschreibung |
|---|---|
| `DATABASE_URL` | SQLite-Pfad, lokal: `file:./data/app.db` |
| `NEXTAUTH_SECRET` | Zufälliger String für JWT-Signierung |
| `NEXTAUTH_URL` | Basis-URL der App (lokal: `http://localhost:3000`) |
| `ADMIN_PASSWORD` | Passwort für den Admin-Bereich |
| `ANTHROPIC_API_KEY` | Claude API Key für Scraping-Kategorisierung |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami Analytics (optional lokal) |

---

## Projektstruktur

```
src/
├── app/
│   ├── (public)/          # Öffentliche Seiten (Navbar + Footer)
│   │   ├── page.tsx       # Home
│   │   ├── about/         # About this Page
│   │   ├── cv/            # Lebenslauf
│   │   ├── kontakt/       # Kontaktformular
│   │   └── tools/
│   │       └── trending-ai/  # Trending AI Tech Tool
│   ├── admin/             # Admin-Bereich (Auth-geschützt)
│   └── api/               # API-Routen
├── components/            # React-Komponenten
├── lib/
│   ├── scraping/          # Scraping-Pipeline (GitHub, HN, arXiv, RSS)
│   ├── auth.ts            # NextAuth-Konfiguration
│   ├── claude.ts          # Claude API Client
│   └── db.ts              # Prisma Client Singleton
└── types/                 # TypeScript-Typdefinitionen
```

---

## Server-Architektur (VPS)

Die Anwendung läuft auf einem Hostinger VPS in 7 Docker-Containern, alle im internen Netzwerk `vps_net`:

```
Internet (Port 80/443)
        │
        ▼
┌───────────────────────────────────────────────┐
│  nginx (Reverse Proxy, SSL-Terminierung)      │
│  ai.wojtek-gorecki.de      → app-prod:3000    │
│  ai-stage.wojtek-gorecki.de → app-stage:3000  │
│  /umami/                   → umami:3000       │
└───────────────────────────────────────────────┘
        │  (internes Docker-Netzwerk: vps_net)
        ├── app-prod       Next.js Produktion
        ├── app-stage      Next.js Staging
        ├── umami          Analytics
        ├── umami-db       PostgreSQL für Umami
        ├── openclaw       AI-Agent-Plattform
        └── deploy-service HTTP-API für Deployments (:8080, nur intern)
```

### Container im Detail

| Container | Image | Aufgabe |
|---|---|---|
| `nginx` | nginx:alpine | Reverse Proxy, SSL-Terminierung (Let's Encrypt) |
| `app-prod` | Eigener Build | Next.js Produktionsserver |
| `app-stage` | Eigener Build | Next.js Stagingserver (zum Testen vor Prod-Deploy) |
| `umami` | ghcr.io/umami-software/umami | Privacy-freundliche Analytics (cookieless) |
| `umami-db` | postgres:15-alpine | Datenbank für Umami |
| `openclaw` | node:22-alpine | AI-Agent-Plattform, triggert Deployments |
| `deploy-service` | Python FastAPI | HTTP-API für Deployment-Skripte |

### Verzeichnisstruktur auf dem VPS

```
/srv/
├── docker-compose.yml
├── .env.prod              # Prod-Secrets (nie in Git, chmod 600)
├── .env.stage             # Stage-Secrets (nie in Git, chmod 600)
├── .env.shared            # Umami + Deploy-Key (nie in Git, chmod 600)
├── repos/
│   ├── app-prod/          # git clone (main-Branch)
│   ├── app-stage/         # git clone (main-Branch)
│   └── openclaw/          # git clone openclaw/openclaw
├── nginx/
│   ├── nginx.conf
│   └── ssl/               # Let's Encrypt Zertifikate
├── data/
│   ├── prod/              # SQLite Datenbank Produktion
│   └── stage/             # SQLite Datenbank Staging
└── deploy-service/        # FastAPI Service + Shell-Scripts
```

---

## Deployments

Deployments werden über den `deploy-service` ausgelöst, der nur intern im Docker-Netzwerk erreichbar ist. Der OpenClaw AI-Agent triggert sie via HTTP:

```http
POST http://deploy-service:8080/deploy/stage
X-Api-Key: <DEPLOY_API_KEY>

POST http://deploy-service:8080/deploy/prod
X-Api-Key: <DEPLOY_API_KEY>
```

**Was bei einem Deployment passiert:**
1. `git pull origin main` im entsprechenden Repo-Verzeichnis
2. `docker compose build app-prod|app-stage`
3. `docker compose up -d --no-deps --force-recreate app-prod|app-stage`
4. `npx prisma migrate deploy` (automatische DB-Migrationen)

**Reihenfolge:** Immer zuerst Stage deployen und testen, dann Prod.

Weitere Details: [`docs/deployment.md`](docs/deployment.md)

---

## Erstmaliger VPS-Setup

```bash
# 1. SSH-Key bei GitHub hinterlegen, dann:
git clone git@github.com:newmetl/ai-wojtek-gorecki-de.git /srv/repos/app-prod
git clone git@github.com:newmetl/ai-wojtek-gorecki-de.git /srv/repos/app-stage

# 2. Konfigurationsdateien kopieren
cp /srv/repos/app-prod/docker-compose.yml /srv/docker-compose.yml
cp /srv/repos/app-prod/nginx/nginx.conf   /srv/nginx/nginx.conf
cp -r /srv/repos/app-prod/deploy-service/* /srv/deploy-service/

# 3. Secrets anlegen (manuell befüllen, chmod 600)
cp .env.example /srv/.env.prod
cp .env.example /srv/.env.stage
# /srv/.env.shared manuell anlegen (nur Umami + DEPLOY_API_KEY)

# 4. SSL-Zertifikate (DNS muss vorher zeigen)
bash /srv/repos/app-prod/ssl-init.sh

# 5. Starten
cd /srv && docker compose build && docker compose up -d

# 6. Datenbank initialisieren
docker run --rm -e DATABASE_URL=file:/data/app.db \
  -v /srv/data/stage:/data -v /srv/repos/app-stage/prisma:/prisma \
  node:20-alpine sh -c "npx --yes prisma@6.19.2 migrate deploy --schema=/prisma/schema.prisma"
docker run --rm -e DATABASE_URL=file:/data/app.db \
  -v /srv/data/stage:/data -v /srv/repos/app-stage:/app \
  -w /app node:20-alpine sh -c "npm ci && DATABASE_URL=file:/data/app.db npx tsx prisma/seed.ts"
chown 1001:1001 /srv/data/stage/app.db
```

---

## Features (MVP)

- **Trending AI Tech** — wöchentlich aktualisierte KI-Tool-Übersicht mit Scraping-Pipeline
- **Admin-Interface** — Content-Pflege, Scraping manuell auslösen, Kategorien verwalten
- **Statische Seiten** — Home, About, CV/Lebenslauf, Kontakt, Impressum, Datenschutz
- **SEO** — Metadata API, JSON-LD, Sitemap, robots.txt

**Geplante Features:**
- AI Use Cases (Phase 2)
- Prompt Library (Phase 3)
- User Story Generator (Phase 4)
