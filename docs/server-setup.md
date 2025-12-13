# WrocDevs.com Server Setup

This document covers the production server setup at `wrocdevs.com`. For general deployment instructions, see [deployment.md](./deployment.md).

## Architecture Overview

```
                    ┌─────────────────────────────────────────────┐
                    │          Digital Ocean Droplet              │
                    │          IP: 207.154.244.167                │
                    │                                             │
  Internet ──────▶  │  ┌─────────────┐    ┌─────────────────────┐ │
                    │  │ Global Caddy│───▶│  wrocdevs-app       │ │
                    │  │  :80/:443   │    │  :3001 (internal)   │ │
                    │  │  (systemd)  │    │                     │ │
                    │  └─────────────┘    └──────────┬──────────┘ │
                    │         │                      │            │
                    │         │           ┌──────────▼──────────┐ │
                    │         │           │  wrocdevs-db        │ │
                    │         │           │  PostgreSQL 16      │ │
                    │         │           │  :5433 (localhost)  │ │
                    │         │           └─────────────────────┘ │
                    │         │                                   │
                    │         ├───▶ wrocdevs.pl (:3000)          │
                    │         ├───▶ qivio.pl (:4321)             │
                    │         └───▶ api.qivio.pl (:8000)         │
                    │                                             │
                    └─────────────────────────────────────────────┘
```

### Key Differences from Generic Deployment

| Component | Generic (deployment.md) | This Server |
|-----------|------------------------|-------------|
| Caddy | Docker container | Global systemd service |
| App Port | 3000 | 3001 (avoids conflict with wrocdevs.pl) |
| DB Port | Internal only | 5433 on localhost (for builds) |
| Config | `/etc/caddy/Caddyfile` in container | `/etc/caddy/Caddyfile` on host |

## Directory Structure

```
/var/www/wrocdevs.com/
├── .env                    # Environment variables (not in git)
├── docker-compose.prod.yml # Production Docker config
├── Dockerfile              # App build configuration
├── scripts/
│   ├── full-reload.sh     # Rebuild and restart app
│   ├── db-backup.sh       # Create database backup
│   └── db-import.sh       # Import database backup
├── docs/
│   ├── deployment.md      # Generic deployment guide
│   └── server-setup.md    # This file
└── src/                    # Application source code
```

## Quick Commands

### Restart Application (Rebuild)

```bash
cd /var/www/wrocdevs.com
./scripts/full-reload.sh
```

### Database Backup

```bash
cd /var/www/wrocdevs.com
./scripts/db-backup.sh              # Creates backup in current dir
./scripts/db-backup.sh /backups     # Creates backup in /backups
```

### Database Import

```bash
cd /var/www/wrocdevs.com
./scripts/db-import.sh backup_20251213.sql
```

### View Logs

```bash
# App logs
docker compose -f docker-compose.prod.yml logs -f app

# Database logs
docker compose -f docker-compose.prod.yml logs -f postgres

# Caddy logs
journalctl -u caddy -f
# or
tail -f /var/log/caddy/wrocdevs.com.log
```

### Container Status

```bash
docker compose -f docker-compose.prod.yml ps
```

## Environment Variables

Location: `/var/www/wrocdevs.com/.env`

| Variable | Description |
|----------|-------------|
| `DB_PASSWORD` | PostgreSQL password |
| `PAYLOAD_SECRET` | Payload CMS JWT secret (min 32 chars) |
| `NEXT_PUBLIC_SERVER_URL` | Public URL (`https://wrocdevs.com`) |
| `CRON_SECRET` | Cron job authentication |
| `PREVIEW_SECRET` | Draft preview authentication |

## Caddy Configuration

The Caddy config for wrocdevs.com is in `/etc/caddy/Caddyfile`:

```caddyfile
wrocdevs.com, www.wrocdevs.com {
    @www host www.wrocdevs.com
    redir @www https://wrocdevs.com{uri} permanent

    reverse_proxy localhost:3001 {
        header_up Host {host}
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto {scheme}
    }

    encode gzip zstd

    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options nosniff
        X-Frame-Options SAMEORIGIN
        Referrer-Policy strict-origin-when-cross-origin
        -Server
    }

    log {
        output file /var/log/caddy/wrocdevs.com.log
        format json
    }
}
```

Reload Caddy after changes:
```bash
systemctl reload caddy
```

## Build Process

The app requires database access during build for Payload CMS static generation. The build command:

```bash
source .env
DOCKER_BUILDKIT=1 docker build \
  --network=host \
  --build-arg DATABASE_URI="postgresql://postgres:${DB_PASSWORD}@127.0.0.1:5433/payload" \
  --build-arg PAYLOAD_SECRET="${PAYLOAD_SECRET}" \
  -t wrocdevs-app:latest .
```

This is automated in `scripts/full-reload.sh`.

## SSH / Deploy Keys

SSH keys for www-admin user: `~www-admin/.ssh/`

| Key | Purpose |
|-----|---------|
| `id_wrocdevs_nextjs` | Read access to repo |
| `id_wrocdevs_next_push` | Write access to repo |

SSH config: `~www-admin/.ssh/config`

```
Host github-wrocdevs-push
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_wrocdevs_next_push
    IdentitiesOnly yes
```

Git remotes:
- `origin` - Default (read-only)
- `origin-push` - Uses push key

## Troubleshooting

### App not responding

```bash
# Check container status
docker compose -f docker-compose.prod.yml ps

# Check app logs
docker compose -f docker-compose.prod.yml logs app

# Restart app
docker compose -f docker-compose.prod.yml restart app
```

### Database connection issues

```bash
# Test database
docker compose -f docker-compose.prod.yml exec postgres pg_isready -U postgres -d payload

# Connect to database
docker compose -f docker-compose.prod.yml exec postgres psql -U postgres payload
```

### Caddy issues

```bash
# Check Caddy status
systemctl status caddy

# Validate config
caddy validate --config /etc/caddy/Caddyfile

# Check SSL certificates
caddy cert wrocdevs.com
```

### Permission issues with git

```bash
# Fix git directory ownership
chown -R www-admin:caddy /var/www/wrocdevs.com/.git

# Pull as www-admin
sudo -u www-admin git pull origin main
```
