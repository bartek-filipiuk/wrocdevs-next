# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Payload CMS 3.x Website Template** - a full-stack CMS built with:
- **Backend**: Payload CMS v3.67.0 with PostgreSQL
- **Frontend**: Next.js 15 with App Router
- **Styling**: TailwindCSS + shadcn/ui components
- **Editor**: Lexical rich text editor

Both the CMS admin panel (`/admin`) and public website are served from the same Next.js instance.

## Common Commands

```bash
pnpm dev                    # Start dev server (localhost:3000)
pnpm build                  # Production build
pnpm lint                   # ESLint check
pnpm lint:fix               # Auto-fix lint issues
pnpm generate:types         # Regenerate TypeScript types from CMS schema
pnpm payload migrate        # Run database migrations
pnpm payload migrate:create # Create new migration

# Testing
pnpm test:int               # Run Vitest integration tests
pnpm test:e2e               # Run Playwright E2E tests
pnpm test                   # Run all tests
```

## Architecture

### Route Groups
- `src/app/(frontend)/` - Public website routes
- `src/app/(payload)/` - Payload CMS admin panel and API

### Block-Based Page Building
Pages are built from modular blocks. Each block has:
- `src/blocks/[BlockName]/config.ts` - Payload field schema
- `src/blocks/[BlockName]/Component.tsx` - React component
- Blocks are rendered via `src/blocks/RenderBlocks.tsx`

**Available Blocks**: GlassHero, Features, UpcomingEvents, CoursesShowcase, Testimonials, ContactCTA, CallToAction, Content, MediaBlock, Archive, Form

### Collections
- **Pages** - Layout builder with blocks, drafts, SEO
- **Posts** - Blog content with categories
- **Categories** - Nested taxonomy (uses nested-docs plugin)
- **Media** - Image uploads with focal point
- **Users** - Authentication-enabled

### Key Patterns

**Access Control** (`src/access/`):
- `authenticated.ts` - Requires logged-in user
- `authenticatedOrPublished.ts` - Published content OR authenticated user
- `anyone.ts` - Public access

**Hooks** (`src/hooks/` and collection-specific):
- `populatePublishedAt` - Auto-sets publish date
- `revalidatePage` - Clears Next.js cache on CMS changes

**Link Field** (`src/fields/link.ts`):
- Reusable field supporting `custom` (URL) or `reference` (internal page) types
- Appearances: `default` or `outline`

### Component Conventions
- Server components: `Component.tsx`
- Client components: `Component.client.tsx`
- Config files: `config.ts` for Payload schemas

## Adding New Features

### New Block
1. Create `src/blocks/MyBlock/config.ts` with Payload field schema
2. Create `src/blocks/MyBlock/Component.tsx` with React component
3. Add block to `src/collections/Pages/index.ts` blocks array
4. Run `pnpm generate:types`

### New Collection
1. Create `src/collections/MyCollection.ts`
2. Add to `collections` array in `src/payload.config.ts`
3. Run `pnpm generate:types`

### Seed Data
Create seed scripts in `src/endpoints/seed/` following `hub-home.ts` pattern. See `/docs/page-creation-guide.md` for block field specifications.

## Styling

- CSS variables defined in `src/app/(frontend)/globals.css`
- Dark mode via `[data-theme="dark"]` selector
- Custom utility classes: `glass`, `gradient-blue`, `text-gradient-blue`, `glow-blue`
- TailwindCSS safelist includes all `lg:col-span-*` variants

## Environment Variables

```bash
DATABASE_URI=postgresql://...     # PostgreSQL connection
PAYLOAD_SECRET=...                # JWT encryption key
NEXT_PUBLIC_SERVER_URL=...        # Public site URL
PREVIEW_SECRET=...                # Draft preview authentication
```

## Plugins (Pre-configured)

- **Redirects** - URL redirect management
- **Nested Docs** - Hierarchical categories
- **SEO** - Meta title/description/image on pages/posts
- **Form Builder** - CMS-managed forms
- **Search** - Full-text search for posts

## TypeScript

Types are auto-generated in `src/payload-types.ts`. After modifying any collection or block config, run `pnpm generate:types` to update types.

## Testing

- **Integration tests**: `tests/int/*.int.spec.ts` (Vitest)
- **E2E tests**: `tests/e2e/*.e2e.spec.ts` (Playwright)
- E2E tests auto-start dev server if not running

## CMSLink Component

When using `CMSLink`, the `appearance` prop from CMS data can conflict with custom styling. For text links inside blocks, explicitly set `appearance="inline"` to prevent Button styling from being applied.
