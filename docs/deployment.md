# Deployment — ai.wojtek-gorecki.de

Diese Dokumentation richtet sich an den OpenClaw AI-Agenten und erklärt, wie Deployments
für `ai.wojtek-gorecki.de` (Produktion) und `ai-stage.wojtek-gorecki.de` (Staging) ausgelöst
werden.

---

## Architektur

7 Docker-Container im internen Netzwerk `vps_net` auf dem Hostinger VPS:

| Container | Aufgabe |
|---|---|
| `nginx` | Reverse Proxy, SSL-Terminierung (Port 80/443) |
| `app-prod` | Next.js Produktionsserver → ai.wojtek-gorecki.de |
| `app-stage` | Next.js Stagingserver → ai-stage.wojtek-gorecki.de |
| `umami` | Analytics (geteilt, 2 Sites: prod + stage) |
| `umami-db` | PostgreSQL für Umami |
| `openclaw` | AI-Agent-Plattform (du selbst) |
| `deploy-service` | HTTP-API für Deployment-Skripte (intern :8080) |

Der `deploy-service` ist **ausschließlich intern** über `vps_net` erreichbar — kein öffentlicher Port.

---

## Deployments auslösen

### Stage deployen

```http
POST http://deploy-service:8080/deploy/stage
X-Api-Key: <DEPLOY_API_KEY aus /srv/.env.shared>
```

### Prod deployen

```http
POST http://deploy-service:8080/deploy/prod
X-Api-Key: <DEPLOY_API_KEY aus /srv/.env.shared>
```

### Status prüfen

```http
GET http://deploy-service:8080/status
X-Api-Key: <DEPLOY_API_KEY aus /srv/.env.shared>
```

**Antwort:** `{"status": "started", "env": "stage|prod"}` — das Deployment läuft im Hintergrund.

---

## Was passiert bei einem Deployment?

```
git pull origin main
→ docker compose build app-prod|app-stage
→ docker compose up -d --no-deps --force-recreate app-prod|app-stage
→ npx prisma migrate deploy
```

Der Container wird neu gebaut und ersetzt — Downtime beträgt wenige Sekunden.

---

## Wann Stage vs. Prod deployen?

**Reihenfolge immer:**
1. Erst Stage deployen und testen (`https://ai-stage.wojtek-gorecki.de`)
2. Bei Erfolg: Prod deployen (`https://ai.wojtek-gorecki.de`)

**Nur direkt Prod deployen wenn:**
- Explizit vom Nutzer angewiesen
- Nur Konfigurationsänderungen (keine Code-Änderungen)

---

## API-Key ermitteln

Der `DEPLOY_API_KEY` steht in `/srv/.env.shared` auf dem VPS:

```bash
grep DEPLOY_API_KEY /srv/.env.shared
```

---

## Verifikation nach Deployment

1. Stage: `curl -I https://ai-stage.wojtek-gorecki.de` → HTTP 200
2. Prod: `curl -I https://ai.wojtek-gorecki.de` → HTTP 200
3. Container-Status: `docker compose -f /srv/docker-compose.yml ps`

---

## VPS-Verzeichnisstruktur

```
/srv/
├── docker-compose.yml          ← Orchestrierung aller Container
├── .env.prod                    ← Prod-Secrets (nie in Git, chmod 600)
├── .env.stage                   ← Stage-Secrets (nie in Git, chmod 600)
├── .env.shared                  ← Umami + DEPLOY_API_KEY (nie in Git, chmod 600)
├── repos/
│   ├── app-prod/               ← git clone (main-Branch, für Produktion)
│   ├── app-stage/              ← git clone (main-Branch, für Staging)
│   └── openclaw/               ← git clone des OpenClaw-Repos
├── nginx/
│   ├── nginx.conf
│   └── ssl/ (fullchain.pem, privkey.pem)
├── data/
│   ├── prod/                   ← SQLite DB für Produktion
│   └── stage/                  ← SQLite DB für Staging
└── deploy-service/
    ├── server.py
    ├── Dockerfile
    └── scripts/
        ├── deploy-prod.sh
        └── deploy-stage.sh
```

---

## Erststart (einmalig)

```bash
# 1. Setup ausführen
curl -fsSL https://raw.githubusercontent.com/adalbertgorecki/ai-wojtek-gorecki-de/main/setup.sh | bash

# 2. Secrets befüllen
nano /srv/.env.prod
nano /srv/.env.stage
nano /srv/.env.shared

# 3. SSL-Zertifikate holen (DNS muss bereits zeigen)
bash /srv/repos/app-prod/ssl-init.sh

# 4. Alle Container starten
cd /srv && docker compose build && docker compose up -d

# 5. Datenbanken initialisieren
docker compose exec app-prod  sh -c "DATABASE_URL=file:/app/data/app.db npx prisma migrate deploy && npx tsx prisma/seed.ts"
docker compose exec app-stage sh -c "DATABASE_URL=file:/app/data/app.db npx prisma migrate deploy && npx tsx prisma/seed.ts"
```
