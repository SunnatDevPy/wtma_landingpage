#!/bin/sh
set -e

echo "=== WTMA Production Container Starting ==="

# 1. Start Node.js Telegram Lead Service in background
if [ -f /usr/share/nginx/html/server.js ]; then
    echo "[+] Starting Telegram Lead Service (server.js) on port 3000..."
    node /usr/share/nginx/html/server.js &
else
    echo "[-] Warning: server.js not found in /usr/share/nginx/html"
fi

# 2. Start Nginx in foreground
echo "[+] Starting Nginx Web Server on port 80..."
exec nginx -g "daemon off;"
