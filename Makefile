.PHONY: up down logs deploy-stage deploy-prod status build \
        db-migrate-prod db-migrate-stage db-seed-prod db-seed-stage

up:
	cd /srv && docker compose up -d

down:
	cd /srv && docker compose down

build:
	cd /srv && docker compose build

logs:
	cd /srv && docker compose logs -f --tail=100

status:
	cd /srv && docker compose ps

deploy-stage:
	curl -s -X POST http://localhost:8080/deploy/stage \
	  -H "X-Api-Key: $$(grep DEPLOY_API_KEY /srv/.env.shared | cut -d= -f2)"

deploy-prod:
	curl -s -X POST http://localhost:8080/deploy/prod \
	  -H "X-Api-Key: $$(grep DEPLOY_API_KEY /srv/.env.shared | cut -d= -f2)"

db-migrate-prod:
	cd /srv && docker compose exec app-prod sh -c \
	  "DATABASE_URL=file:/app/data/app.db npx prisma migrate deploy"

db-migrate-stage:
	cd /srv && docker compose exec app-stage sh -c \
	  "DATABASE_URL=file:/app/data/app.db npx prisma migrate deploy"

db-seed-prod:
	cd /srv && docker compose exec app-prod sh -c \
	  "DATABASE_URL=file:/app/data/app.db npx tsx prisma/seed.ts"

db-seed-stage:
	cd /srv && docker compose exec app-stage sh -c \
	  "DATABASE_URL=file:/app/data/app.db npx tsx prisma/seed.ts"
