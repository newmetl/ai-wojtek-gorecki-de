#!/bin/bash
# Einmalig nach DNS-Propagation ausführen
# Voraussetzung: Port 80 muss frei sein (kein Nginx laufend)
set -e

DOMAINS="-d ai.wojtek-gorecki.de -d ai-stage.wojtek-gorecki.de"
EMAIL="wojtek@gorecki.de"

echo "=== SSL-Zertifikate holen (Let's Encrypt) ==="

docker run --rm -p 80:80 \
  -v /srv/nginx/ssl:/etc/letsencrypt \
  certbot/certbot certonly --standalone \
  $DOMAINS --email $EMAIL --agree-tos --no-eff-email

# Symlinks für Nginx
ln -sf /srv/nginx/ssl/live/ai.wojtek-gorecki.de/fullchain.pem /srv/nginx/ssl/fullchain.pem
ln -sf /srv/nginx/ssl/live/ai.wojtek-gorecki.de/privkey.pem   /srv/nginx/ssl/privkey.pem

# Auto-Renewal (wöchentlich montags 03:00)
(crontab -l 2>/dev/null; echo "0 3 * * 1 docker run --rm -p 80:80 -v /srv/nginx/ssl:/etc/letsencrypt certbot/certbot renew --standalone && docker restart nginx") | crontab -

echo "✅ SSL eingerichtet."
