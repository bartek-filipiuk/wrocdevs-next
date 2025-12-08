# Deployment Guide - Digital Ocean

This guide covers deploying the WrocDevs website to a Digital Ocean droplet with automated CI/CD via GitHub Actions.

## Architecture Overview

```
                    ┌─────────────────────────────────────────┐
                    │          Digital Ocean Droplet          │
                    │                                         │
  Internet ──────▶  │  ┌─────────┐    ┌─────────┐    ┌─────┐  │
                    │  │  Caddy  │───▶│   App   │───▶│ DB  │  │
                    │  │  :80    │    │  :3000  │    │:5432│  │
                    │  │  :443   │    │         │    │     │  │
                    │  └─────────┘    └─────────┘    └─────┘  │
                    │                                         │
                    └─────────────────────────────────────────┘
```

- **Caddy**: Reverse proxy with automatic HTTPS (Let's Encrypt)
- **App**: Next.js + Payload CMS (Docker container)
- **DB**: PostgreSQL 16 (Docker container)

## Prerequisites

- Digital Ocean account
- Domain pointed to your droplet IP (wrocdevs.com)
- GitHub repository: `git@github.com:bartek-filipiuk/wrocdevs-next.git`
- SSH key pair for GitHub Actions

---

## 1. Droplet Setup (One-Time)

### 1.1 Create Droplet

1. Log into Digital Ocean
2. Create Droplet:
   - **Image**: Ubuntu 24.04 LTS
   - **Size**: Basic, 2GB RAM minimum (4GB recommended)
   - **Datacenter**: Frankfurt (FRA1) or closest to users
   - **Authentication**: SSH Key
   - **Hostname**: `wrocdevs-prod`

### 1.2 Initial Server Setup

SSH into your droplet:

```bash
ssh root@YOUR_DROPLET_IP
```

Run initial setup:

```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh

# Install Docker Compose plugin
apt install docker-compose-plugin -y

# Verify installation
docker --version
docker compose version

# Install Git
apt install git -y

# Create deployment directory
mkdir -p /var/www/wrocdevs
cd /var/www/wrocdevs
```

### 1.3 Clone Repository

```bash
cd /var/www/wrocdevs

# Clone via HTTPS (simpler for server)
git clone https://github.com/bartek-filipiuk/wrocdevs-next.git .

# Or via SSH (requires deploy key)
git clone git@github.com:bartek-filipiuk/wrocdevs-next.git .
```

### 1.4 Create Environment File

```bash
# Generate secure secrets
openssl rand -hex 32  # Use this for PAYLOAD_SECRET
openssl rand -hex 16  # Use this for DB_PASSWORD
openssl rand -hex 16  # Use this for CRON_SECRET
openssl rand -hex 16  # Use this for PREVIEW_SECRET

# Create .env file
cat > /var/www/wrocdevs/.env << 'EOF'
# Database
DB_PASSWORD=YOUR_GENERATED_PASSWORD

# Payload CMS
PAYLOAD_SECRET=YOUR_GENERATED_SECRET
NEXT_PUBLIC_SERVER_URL=https://wrocdevs.com

# Optional
CRON_SECRET=YOUR_GENERATED_SECRET
PREVIEW_SECRET=YOUR_GENERATED_SECRET

# Brevo Newsletter (if configured)
# BREVO_API_KEY=
# BREVO_LIST_ID=
# BREVO_DOI_TEMPLATE_ID=
EOF

# Secure the file
chmod 600 /var/www/wrocdevs/.env
```

### 1.5 Point DNS to Droplet

In your domain registrar, add:

| Type | Name | Value |
|------|------|-------|
| A | @ | YOUR_DROPLET_IP |
| A | www | YOUR_DROPLET_IP |

Wait for DNS propagation (can take up to 48 hours, usually faster).

---

## 2. First Deployment (Manual)

### 2.1 Build and Start

```bash
cd /var/www/wrocdevs

# Build the application
docker compose -f docker-compose.prod.yml build

# Start all services
docker compose -f docker-compose.prod.yml up -d

# Check status
docker compose -f docker-compose.prod.yml ps

# View logs
docker compose -f docker-compose.prod.yml logs -f
```

### 2.2 Run Migrations

```bash
# Wait for app to be ready, then run migrations
docker compose -f docker-compose.prod.yml exec app pnpm payload migrate
```

### 2.3 Create Admin User

1. Navigate to https://wrocdevs.com/admin
2. Create your admin account
3. Configure site settings

---

## 3. GitHub Actions Setup

### 3.1 Generate SSH Key for Deployment

On your **local machine**:

```bash
# Generate a dedicated deploy key
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/wrocdevs_deploy

# Display public key (add to droplet)
cat ~/.ssh/wrocdevs_deploy.pub

# Display private key (add to GitHub secrets)
cat ~/.ssh/wrocdevs_deploy
```

### 3.2 Add Public Key to Droplet

On the **droplet**:

```bash
# Add the public key to authorized_keys
echo "YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
```

### 3.3 Add GitHub Secrets

Go to your repository: **Settings > Secrets and variables > Actions > New repository secret**

Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `DO_HOST` | Your droplet IP address |
| `DO_USERNAME` | `root` (or your user) |
| `DO_SSH_KEY` | Contents of `~/.ssh/wrocdevs_deploy` (private key) |
| `DO_PORT` | `22` (optional, default is 22) |

### 3.4 Test Deployment

Push to main branch or manually trigger the workflow:

```bash
git push origin main
```

Check the Actions tab in GitHub for deployment status.

---

## 4. Maintenance

### View Logs

```bash
# All services
docker compose -f docker-compose.prod.yml logs -f

# Specific service
docker compose -f docker-compose.prod.yml logs -f app
docker compose -f docker-compose.prod.yml logs -f postgres
docker compose -f docker-compose.prod.yml logs -f caddy
```

### Restart Services

```bash
# Restart all
docker compose -f docker-compose.prod.yml restart

# Restart specific service
docker compose -f docker-compose.prod.yml restart app
```

### Update Application

Deployments are automatic via GitHub Actions on push to main.

For manual deployment:

```bash
cd /var/www/wrocdevs
git pull origin main
docker compose -f docker-compose.prod.yml build --no-cache app
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml exec app pnpm payload migrate
```

### Database Backup

```bash
# Create backup
docker compose -f docker-compose.prod.yml exec postgres pg_dump -U postgres payload > backup_$(date +%Y%m%d).sql

# Restore backup
docker compose -f docker-compose.prod.yml exec -T postgres psql -U postgres payload < backup_20241201.sql
```

### View Disk Usage

```bash
# Docker volumes
docker system df

# Cleanup unused images
docker image prune -a

# Cleanup everything unused
docker system prune -a
```

---

## 5. Troubleshooting

### App Not Starting

```bash
# Check logs
docker compose -f docker-compose.prod.yml logs app

# Check if container is running
docker compose -f docker-compose.prod.yml ps

# Restart the app
docker compose -f docker-compose.prod.yml restart app
```

### Database Connection Issues

```bash
# Check if postgres is running
docker compose -f docker-compose.prod.yml ps postgres

# Check postgres logs
docker compose -f docker-compose.prod.yml logs postgres

# Test connection
docker compose -f docker-compose.prod.yml exec postgres psql -U postgres -d payload -c "SELECT 1"
```

### SSL Certificate Issues

```bash
# Check Caddy logs
docker compose -f docker-compose.prod.yml logs caddy

# Verify DNS is pointing correctly
dig wrocdevs.com

# Restart Caddy to retry certificate
docker compose -f docker-compose.prod.yml restart caddy
```

### Out of Memory

```bash
# Check memory usage
free -h
docker stats --no-stream

# Increase swap (temporary fix)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

### GitHub Actions Deployment Fails

1. Check the Actions tab for error logs
2. Verify secrets are set correctly
3. Test SSH connection manually:
   ```bash
   ssh -i ~/.ssh/wrocdevs_deploy root@YOUR_DROPLET_IP
   ```

---

## 6. Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DB_PASSWORD` | Yes | PostgreSQL password |
| `PAYLOAD_SECRET` | Yes | JWT encryption key (min 32 chars) |
| `NEXT_PUBLIC_SERVER_URL` | Yes | Public URL (https://wrocdevs.com) |
| `CRON_SECRET` | No | Secret for cron job authentication |
| `PREVIEW_SECRET` | No | Secret for draft preview |
| `BREVO_API_KEY` | No | Brevo newsletter API key |
| `BREVO_LIST_ID` | No | Brevo contact list ID |
| `BREVO_DOI_TEMPLATE_ID` | No | Brevo double opt-in template ID |

---

## 7. Security Recommendations

1. **Firewall**: Enable UFW
   ```bash
   ufw allow 22
   ufw allow 80
   ufw allow 443
   ufw enable
   ```

2. **Fail2ban**: Install to prevent brute-force attacks
   ```bash
   apt install fail2ban -y
   systemctl enable fail2ban
   ```

3. **Automatic Updates**: Enable unattended upgrades
   ```bash
   apt install unattended-upgrades -y
   dpkg-reconfigure -plow unattended-upgrades
   ```

4. **Non-root User**: Consider creating a deploy user
   ```bash
   adduser deploy
   usermod -aG docker deploy
   ```
