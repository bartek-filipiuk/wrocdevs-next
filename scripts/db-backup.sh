#!/bin/bash
# Create database backup
# Usage: ./scripts/db-backup.sh [output-dir]

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"

OUTPUT_DIR="${1:-.}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${OUTPUT_DIR}/backup_${TIMESTAMP}.sql"

echo "=== Database Backup ==="
echo "Creating backup: $BACKUP_FILE"

docker compose -f docker-compose.prod.yml exec -T postgres pg_dump -U postgres payload > "$BACKUP_FILE"

echo "Backup created: $BACKUP_FILE ($(du -h "$BACKUP_FILE" | cut -f1))"
echo "=== Backup Complete ==="
