# WrocDevs - Community Platform

A modern community platform for developers in Wroclaw, built with Payload CMS and Next.js.

## Tech Stack

- **CMS**: [Payload CMS](https://payloadcms.com) v3.67
- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Database**: PostgreSQL 16
- **Styling**: TailwindCSS + shadcn/ui
- **Languages**: Polish (default) / English

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL (or use Docker)

### Development Setup

```bash
# Clone the repository
git clone git@github.com:bartek-filipiuk/wrocdevs-next.git
cd wrocdevs-next

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start PostgreSQL (if using Docker)
docker compose up -d postgres

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the website and [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS.

## Commands

```bash
pnpm dev                    # Start dev server
pnpm build                  # Production build
pnpm start                  # Start production server
pnpm lint                   # ESLint check
pnpm lint:fix               # Auto-fix lint issues
pnpm generate:types         # Regenerate TypeScript types
pnpm payload migrate        # Run database migrations
pnpm payload migrate:create # Create new migration
```

## Features

### Content Types

- **Pages** - Layout builder with modular blocks
- **Posts** - Blog/news articles with categories
- **Events** - Community events (online/offline/hybrid)
- **Courses** - Educational courses with pricing
- **Workshops** - Hands-on workshops

### Blocks

- GlassHero - Hero section with glass effect
- Features - Feature grid
- UpcomingEvents - Event showcase
- CoursesShowcase - Course listing
- Testimonials - User testimonials
- ContactCTA - Call to action
- Content - Rich text content
- MediaBlock - Image/video content
- FormBlock - Dynamic forms

### Globals

- **Header** - Navigation links
- **Footer** - Footer links, social, newsletter
- **SiteSettings** - Site name, logo, contact info, social links

## Deployment

### Production (Digital Ocean)

The application is deployed to Digital Ocean with:
- Docker Compose orchestration
- Caddy reverse proxy with automatic HTTPS
- GitHub Actions CI/CD on push to main

**Quick deployment:**

```bash
# On the server
cd /var/www/wrocdevs
git pull origin main
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml exec app pnpm payload migrate
```

For detailed deployment instructions, see [docs/deployment.md](docs/deployment.md).

### GitHub Actions Secrets Required

| Secret | Description |
|--------|-------------|
| `DO_HOST` | Droplet IP address |
| `DO_USERNAME` | SSH username |
| `DO_SSH_KEY` | Private SSH key |

## Environment Variables

```bash
# Required
DATABASE_URI=postgresql://user:password@localhost:5432/payload
PAYLOAD_SECRET=your-secret-key-min-32-chars
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Optional
CRON_SECRET=your-cron-secret
PREVIEW_SECRET=your-preview-secret

# Brevo Newsletter
BREVO_API_KEY=your-brevo-api-key
BREVO_LIST_ID=your-list-id
BREVO_DOI_TEMPLATE_ID=your-template-id
```

## Project Structure

```
src/
├── app/
│   ├── (frontend)/      # Public website routes
│   └── (payload)/       # CMS admin panel
├── blocks/              # Page builder blocks
├── collections/         # Payload collections
├── components/          # React components
├── fields/              # Reusable field configs
├── Footer/              # Footer global
├── Header/              # Header global
├── SiteSettings/        # Site settings global
├── i18n/                # Internationalization
├── providers/           # React context providers
└── utilities/           # Helper functions
```

## Documentation

- [Deployment Guide](docs/deployment.md) - Production deployment
- [Implementation Tasks](docs/implementation-tasks.md) - Feature status
- [Page Creation Guide](docs/page-creation-guide.md) - Creating pages

## License

MIT
