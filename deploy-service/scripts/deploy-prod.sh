#!/bin/bash
set -e
echo "=== Deploying PROD at $(date) ==="
cd /srv/repos/app-prod
git fetch origin prod
git reset --hard origin/prod
docker compose -f /srv/docker-compose.yml build app-prod
docker compose -f /srv/docker-compose.yml up -d --no-deps --force-recreate app-prod
docker compose -f /srv/docker-compose.yml exec -T app-prod \
  sh -c "DATABASE_URL=file:/app/data/app.db npx prisma migrate deploy"
docker compose -f /srv/docker-compose.yml exec -T app-prod \
  sh -c "DATABASE_URL=file:/app/data/app.db npx tsx /app/prisma/seed.ts"
echo "=== PROD deployed ✅ ==="
