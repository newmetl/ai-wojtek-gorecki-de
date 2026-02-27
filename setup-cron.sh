#!/bin/bash
# Setup cron job for webserver monitoring

CRON_JOB="*/30 * * * * /data/.openclaw/workspace/site/check-webserver.sh >> /data/.openclaw/workspace/site/webserver-cron.log 2>&1"

# Prüfe ob cron installiert ist
if ! command -v crontab &> /dev/null; then
    echo "⚠️ cron ist nicht installiert - installiere..."
    apt-get update && apt-get install -y cron
fi

# Starte cron daemon falls nicht läuft
if ! pgrep cron > /dev/null; then
    echo "Starte cron daemon..."
    service cron start
fi

# Füge Cron-Job hinzu (nur wenn noch nicht vorhanden)
(crontab -l 2>/dev/null | grep -v "check-webserver.sh"; echo "$CRON_JOB") | crontab -

echo "✅ Cron-Job eingerichtet:"
echo "$CRON_JOB"
echo ""
echo "Aktuelle crontab:"
crontab -l
