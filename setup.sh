#!/bin/bash
# Einmaliger VPS-Setup
# Ausführen: curl -fsSL https://raw.githubusercontent.com/<user>/ai-wojtek-gorecki-de/main/setup.sh | bash
set -e

REPO_URL="https://github.com/newmetl/ai-wojtek-gorecki-de.git"
VPS_IP=$(curl -s ifconfig.me)

echo "=== VPS Setup: ai.wojtek-gorecki.de ==="

# 1. Docker installieren (falls nicht vorhanden)
if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | sh
  usermod -aG docker $USER
fi

# 2. Verzeichnisstruktur
mkdir -p /srv/{repos,nginx/ssl,nginx/certbot-webroot,data/prod,data/stage,deploy-service/scripts}

# 3. Repos klonen
[ -d /srv/repos/app-prod ]  || git clone "$REPO_URL" /srv/repos/app-prod
[ -d /srv/repos/app-stage ] || git clone "$REPO_URL" /srv/repos/app-stage
# OpenClaw: manuell oder separater Klon
# git clone https://github.com/<user>/openclaw.git /srv/repos/openclaw

# 4. Konfigurationsdateien aus dem Repo kopieren
cp /srv/repos/app-prod/docker-compose.yml  /srv/docker-compose.yml
cp /srv/repos/app-prod/nginx/nginx.conf    /srv/nginx/nginx.conf
cp -r /srv/repos/app-prod/deploy-service/  /srv/deploy-service/
chmod +x /srv/deploy-service/scripts/*.sh

# 5. Secrets-Templates anlegen (manuell befüllen)
for f in .env.prod .env.stage .env.shared; do
  [ -f /srv/$f ] || cp /srv/repos/app-prod/.env.example /srv/$f
  chmod 600 /srv/$f
done

echo ""
echo "=== Setup abgeschlossen ==="
echo "Nächste Schritte:"
echo "  1. DNS: A-Record ai.wojtek-gorecki.de → $VPS_IP"
echo "  2. DNS: A-Record ai-stage.wojtek-gorecki.de → $VPS_IP"
echo "  3. Secrets befüllen:"
echo "       nano /srv/.env.prod"
echo "       nano /srv/.env.stage"
echo "       nano /srv/.env.shared"
echo "  4. SSL: bash /srv/repos/app-prod/ssl-init.sh"
echo "  5. Start: cd /srv && docker compose build && docker compose up -d"
echo "  6. DBs initialisieren:"
echo "       docker compose exec app-prod  sh -c \"DATABASE_URL=file:/app/data/app.db npx prisma migrate deploy && npx tsx prisma/seed.ts\""
echo "       docker compose exec app-stage sh -c \"DATABASE_URL=file:/app/data/app.db npx prisma migrate deploy && npx tsx prisma/seed.ts\""
