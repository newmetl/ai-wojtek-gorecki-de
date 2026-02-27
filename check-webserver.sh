#!/bin/bash
# Webserver health check - runs via cron

if ! pgrep -f "python3 -m http.server 80" > /dev/null; then
    echo "⚠️ Webserver nicht aktiv - starte neu..."
    /data/.openclaw/workspace/site/start-static-server.sh
    
    # Warte kurz und prüfe ob es geklappt hat
    sleep 2
    if pgrep -f "python3 -m http.server 80" > /dev/null; then
        echo "✅ Webserver erfolgreich gestartet"
        # Benachrichtige über OpenClaw (optional - nur bei Neustart)
        # openclaw message send --message "🔄 Webserver wurde automatisch neu gestartet (war offline)"
    else
        echo "❌ Webserver-Start fehlgeschlagen!"
        # Kritische Benachrichtigung
        openclaw message send --message "🚨 KRITISCH: Webserver konnte nicht gestartet werden!"
    fi
fi
