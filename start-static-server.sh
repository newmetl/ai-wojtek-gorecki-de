#!/bin/bash
# Start the static website server on port 80
# Kill any existing instance first
pkill -f "python3 -m http.server 80" 2>/dev/null
sleep 1
nohup python3 -m http.server 80 --bind 0.0.0.0 --directory /data/.openclaw/workspace/site > /tmp/webserver.log 2>&1 &
echo "Webserver started on port 80 (PID: $!)"
