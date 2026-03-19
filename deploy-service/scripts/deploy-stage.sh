#!/bin/bash
set -e
echo "=== Deploying STAGE at $(date) ==="
cd /srv/repos/app-stage
git pull origin main
docker compose -f /srv/docker-compose.yml build app-stage
docker compose -f /srv/docker-compose.yml up -d --no-deps --force-recreate app-stage
docker compose -f /srv/docker-compose.yml exec -T app-stage \
  sh -c "DATABASE_URL=file:/app/data/app.db npx prisma migrate deploy"
docker compose -f /srv/docker-compose.yml exec -T app-stage \
  sh -c "DATABASE_URL=file:/app/data/app.db npx tsx /app/prisma/seed.ts"
echo "=== STAGE deployed ✅ ==="
