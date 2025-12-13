#!/bin/bash
# Full reload of wrocdevs.com application (rebuild and restart)
# Usage: ./scripts/full-reload.sh

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"
source .env

echo "=== WrocDevs Full Reload ==="
echo "Directory: $SCRIPT_DIR"

# 1. Build new image (needs DB for Payload static generation)
echo "[1/3] Building Docker image..."
DOCKER_BUILDKIT=1 docker build \
  --network=host \
  --build-arg DATABASE_URI="postgresql://postgres:${DB_PASSWORD}@127.0.0.1:5433/payload" \
  --build-arg PAYLOAD_SECRET="${PAYLOAD_SECRET}" \
  -t wrocdevs-app:latest .

# 2. Restart app container only
echo "[2/3] Restarting app container..."
docker compose -f docker-compose.prod.yml up -d --force-recreate app

# 3. Show status
echo "[3/3] Checking status..."
sleep 5
docker compose -f docker-compose.prod.yml ps
curl -s -o /dev/null -w "App HTTP Status: %{http_code}\n" http://127.0.0.1:3001/

echo "=== Reload Complete ==="
