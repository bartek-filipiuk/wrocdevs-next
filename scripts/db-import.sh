#!/bin/bash
# Import database backup into wrocdevs postgres
# Creates backup before import, then drops and recreates database
# Usage: ./scripts/db-import.sh <backup-file.sql>

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SCRIPT_DIR"

if [ -z "$1" ]; then
  echo "Usage: $0 <backup-file.sql>"
  exit 1
fi

BACKUP_FILE="$1"
if [ ! -f "$BACKUP_FILE" ]; then
  echo "Error: File not found: $BACKUP_FILE"
  exit 1
fi

echo "=== Database Import ==="
echo "Importing: $BACKUP_FILE"
echo ""
echo "This will:"
echo "  1. Create a backup of current database"
echo "  2. Drop the existing 'payload' database"
echo "  3. Create fresh 'payload' database"
echo "  4. Import from: $BACKUP_FILE"
echo ""
read -p "Continue? (y/N) " confirm
if [ "$confirm" != "y" ]; then
  echo "Aborted."
  exit 0
fi

# 1. Create backup first
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_BEFORE="backup_before_import_${TIMESTAMP}.sql"
echo "[1/4] Creating backup: $BACKUP_BEFORE"
docker compose -f docker-compose.prod.yml exec -T postgres pg_dump -U postgres payload > "$BACKUP_BEFORE"
echo "Backup saved: $BACKUP_BEFORE"

# 2. Drop database
echo "[2/4] Dropping database..."
docker compose -f docker-compose.prod.yml exec -T postgres psql -U postgres -c "DROP DATABASE IF EXISTS payload;"

# 3. Create database
echo "[3/4] Creating fresh database..."
docker compose -f docker-compose.prod.yml exec -T postgres psql -U postgres -c "CREATE DATABASE payload;"

# 4. Import
echo "[4/4] Importing data..."
docker compose -f docker-compose.prod.yml exec -T postgres psql -U postgres payload < "$BACKUP_FILE"

echo ""
echo "=== Import Complete ==="
echo "Previous data backed up to: $BACKUP_BEFORE"
