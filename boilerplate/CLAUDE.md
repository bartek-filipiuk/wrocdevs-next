# CLAUDE.md - Payload CMS Boilerplate

This file provides guidance to Claude Code (claude.ai/code) when working with this boilerplate.

## Project Overview

This is a **Payload CMS 3.x Website Boilerplate** - a clean starting point for building websites with:
- **Backend**: Payload CMS v3.67.0 with PostgreSQL
- **Frontend**: Next.js 15 with App Router
- **Styling**: TailwindCSS + shadcn/ui components
- **Editor**: Lexical rich text editor

## Core Principle: Blank Canvas

```
BOILERPLATE = Structure (HTML, semantic classes, layout)
YOU = Visual Identity (colors, effects, animations, component styles)
```

This boilerplate provides **STRUCTURE ONLY** - minimal HTML with semantic CSS classes.
**YOU** create the visual identity based on PAGE_DESIGN.md.

Every site you generate should look **genuinely unique** because:
- Components have no hardcoded styles (no glass, gradients, or animations)
- All visual effects are created by you in `theme.css`
- PAGE_DESIGN.md drives all aesthetic decisions

## Documentation Files

| File | Purpose |
|------|---------|
| **SETUP_PROMPT.md** | Step-by-step customization workflow (START HERE) |
| **PAGE_BOILERPLATE.md** | Technical reference - blocks, globals, seed data |
| **PAGE_DEVTIPS.md** | Common issues, gotchas, quick fixes |
| **PAGE_DESCRIPTION.md** | Template for business info (fill out) |
| **PAGE_DESIGN.md** | Template for visual design (fill out) |

## Customization Process

1. Fill out `PAGE_DESCRIPTION.md` with business details
2. Fill out `PAGE_DESIGN.md` with design preferences
3. Run Claude Code with the prompt from `SETUP_PROMPT.md`
4. Claude Code will:
   - **Generate theme.css** with colors, effects, animations
   - Create seed data with compelling content
   - Configure navigation and site settings

### CRITICAL: Theme Generation

The `theme.css` file contains placeholders that MUST be replaced:

1. **Interpret Colors** - Read PAGE_DESIGN.md color descriptions → HSL values
2. **Create Effects** - If design calls for glass/glow/gradients, CREATE them
3. **Add Animations** - If design specifies animations, CREATE @keyframes
4. **Style Components** - Add CSS for semantic classes to match design

All `INTERPRET_FROM_PAGE_DESIGN` markers must be replaced with actual values.

## Common Commands

```bash
docker compose up -d        # Start PostgreSQL database (port 5433)
pnpm install                # Install dependencies
pnpm dev                    # Start dev server (localhost:3000)
pnpm build                  # Production build
pnpm lint                   # ESLint check
pnpm generate:types         # Regenerate TypeScript types from CMS schema
pnpm payload migrate        # Run database migrations
```

## Docker & Database

- **PostgreSQL runs on port 5433** (not 5432) to avoid conflicts
- Start database: `docker compose up -d`
- Each project instance uses its own Docker container and volume

## Architecture

### Route Groups
- `src/app/(frontend)/` - Public website routes
- `src/app/(payload)/` - Payload CMS admin panel and API

### Block-Based Page Building
Pages are built from modular blocks. Each block has:
- `src/blocks/[BlockName]/config.ts` - Payload field schema
- `src/blocks/[BlockName]/Component.tsx` - React component (minimal structure)

**Available Blocks**:
- **GlassHero** - Hero section (minimal structure, style via theme.css)
- **Features** - Feature grid (minimal cards, style via theme.css)
- **Testimonials** - Customer quotes (minimal cards, style via theme.css)
- **ContactCTA** - Contact information (minimal layout, style via theme.css)
- **CallToAction** - CTA section
- **Content** - Rich text content
- **MediaBlock** - Media display
- **Archive** - Post listing
- **FormBlock** - CMS forms

### Semantic CSS Classes

Components expose semantic classes for styling in theme.css:

**Hero Block:**
- `.hero-section`, `.hero-background`, `.hero-content`
- `.hero-headline`, `.hero-subheadline`
- `.hero-cta-primary`, `.hero-cta-secondary`, `.hero-overlay`

**Features Block:**
- `.features-section`, `.features-header`, `.features-grid`
- `.features-title`, `.features-description`
- `.feature-card`, `.feature-icon`, `.feature-title`
- `.feature-description`, `.feature-link`

**Testimonials Block:**
- `.testimonials-section`, `.testimonials-header`, `.testimonials-grid`
- `.testimonial-card`, `.testimonial-rating`, `.testimonial-star`
- `.testimonial-quote`, `.testimonial-author`
- `.testimonial-avatar`, `.testimonial-name`, `.testimonial-role`

**Contact CTA Block:**
- `.contact-section`, `.contact-background`, `.contact-content`
- `.contact-headline`, `.contact-description`
- `.contact-info`, `.contact-link`
- `.contact-social`, `.contact-social-link`, `.contact-cta`

### Collections
- **Pages** - Layout builder with blocks, drafts, SEO
- **Posts** - Blog content with categories
- **Categories** - Nested taxonomy
- **Media** - Image uploads with focal point
- **Users** - Authentication-enabled

### Key Files for Customization

| Purpose | File |
|---------|------|
| **Theme (ALL visual styling)** | `src/app/(frontend)/theme.css` **(MUST CUSTOMIZE!)** |
| Base structure (don't modify) | `src/app/(frontend)/globals.css` |
| SEO site name | `src/plugins/index.ts` (SITE_NAME constant) |
| Seed data | `src/endpoints/seed/index.ts` |
| Header nav | `src/Header/config.ts` |
| Footer nav | `src/Footer/config.ts` |
| Site settings | `src/SiteSettings/config.ts` |

## Styling Architecture

### File Purposes

- **globals.css** - Neutral base styles, CSS variable structure (don't modify)
- **theme.css** - ALL visual identity goes here (colors, effects, animations, component styles)

### Theme.css Sections

1. **Color Palette** - HSL values for light/dark modes
2. **Custom Effects** - Glass, gradients, glows (only if design requires)
3. **Custom Animations** - Keyframes (only if design requires)
4. **Component Overrides** - Style semantic classes
5. **Typography** - Font customizations
6. **Responsive** - Breakpoint adjustments

### Example Theme Styles

```css
/* Racing theme example */
:root {
  --primary: 0 85% 45%;      /* Racing red */
  --secondary: 0 0% 10%;     /* Carbon black */
}

.hero-background {
  background: url('/carbon-pattern.svg') repeat,
    linear-gradient(135deg, hsl(0 0% 5%), hsl(0 0% 10%));
}

.feature-card {
  border-left: 4px solid hsl(var(--primary));
}
```

## Adding New Features

### New Block
1. Create `src/blocks/MyBlock/config.ts` with Payload field schema
2. Create `src/blocks/MyBlock/Component.tsx` with minimal React component
3. Add semantic CSS classes for styling hooks
4. Add block to `src/collections/Pages/index.ts` blocks array
5. Add block to `src/blocks/RenderBlocks.tsx`
6. Run `pnpm generate:types`

### New Collection
1. Create `src/collections/MyCollection.ts`
2. Add to `collections` array in `src/payload.config.ts`
3. Run `pnpm generate:types`

## Environment Variables

```bash
DATABASE_URI=postgresql://...     # PostgreSQL connection
PAYLOAD_SECRET=...                # JWT encryption key
NEXT_PUBLIC_SERVER_URL=...        # Public site URL
PREVIEW_SECRET=...                # Draft preview authentication
```

## Default Admin Login

After running seed:
- Email: admin@example.com
- Password: admin123

## TypeScript

Types are auto-generated in `src/payload-types.ts`. After modifying any collection or block config, run `pnpm generate:types` to update types.

## Localization

Pre-configured for:
- Polish (pl) - default
- English (en)

Modify in `src/payload.config.ts` localization settings.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Site looks plain/unstyled | theme.css not generated - see SETUP_PROMPT.md Step 0 |
| Default grayscale colors | Replace INTERPRET_FROM_PAGE_DESIGN placeholders |
| No effects/animations | Add them in theme.css based on PAGE_DESIGN.md |
| Components look too basic | Style component classes in theme.css |
| TypeScript errors | Run `pnpm generate:types` |

## Additional Resources

- **Seed data examples** - See `PAGE_BOILERPLATE.md`
- **Rich Text helper** - See `PAGE_BOILERPLATE.md`
- **Troubleshooting** - See `PAGE_DEVTIPS.md`
