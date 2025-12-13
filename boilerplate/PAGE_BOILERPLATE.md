# Payload CMS Boilerplate - Technical Documentation

> **Note:** This is the technical reference. For the step-by-step customization workflow, see `SETUP_PROMPT.md`.

## Overview

This is a **Payload CMS 3.x Website Boilerplate** built on Next.js 15 with App Router, TailwindCSS, and shadcn/ui components. It provides a complete foundation for building block-based websites with a headless CMS.

**Core Principle:** This boilerplate provides **STRUCTURE ONLY**. All visual identity (colors, effects, animations) must be created in `theme.css` based on `PAGE_DESIGN.md`.

---

## Architecture

### Route Groups
```
src/app/
├── (frontend)/     # Public website routes
│   ├── globals.css # Base styles (neutral, don't modify)
│   ├── theme.css   # ALL visual styling (customize this!)
│   └── layout.tsx  # Root layout
└── (payload)/      # CMS admin panel & API routes
```

### Data Flow
1. **Collections** store content (pages, posts, media)
2. **Globals** store site-wide settings (header, footer, site settings)
3. **Blocks** are modular content units embedded in pages
4. **RenderBlocks** component maps block types to React components

---

## Key Files Reference

| Purpose | File Path |
|---------|-----------|
| **Theme (ALL visual styling)** | `src/app/(frontend)/theme.css` |
| Base styles (don't modify) | `src/app/(frontend)/globals.css` |
| SEO site name | `src/plugins/index.ts` (line 17: `SITE_NAME`) |
| Seed data | `src/endpoints/seed/index.ts` |
| Header config | `src/Header/config.ts` |
| Footer config | `src/Footer/config.ts` |
| Site settings | `src/SiteSettings/config.ts` |
| Pages collection | `src/collections/Pages/index.ts` |
| Block configs | `src/blocks/*/config.ts` |
| Block components | `src/blocks/*/Component.tsx` |
| Block renderer | `src/blocks/RenderBlocks.tsx` |
| Link field | `src/fields/link.ts` |

---

## Collections

### Pages
- **Purpose:** Main content pages with layout builder
- **Key fields:**
  - `title` (text, required)
  - `slug` (auto-generated from title)
  - `layout` (array of blocks)
  - `meta` (SEO fields via plugin)
- **Features:** Drafts, versions, preview

### Posts
- **Purpose:** Blog/news content
- **Key fields:** title, content, categories, publishedAt, authors
- **Features:** Rich text, categories taxonomy

### Categories
- **Purpose:** Nested taxonomy for posts
- **Features:** Nested docs plugin enabled

### Media
- **Purpose:** Image/file uploads
- **Features:** Focal point, alt text, sizes

### Users
- **Purpose:** Admin authentication
- **Default:** admin@example.com / admin123

---

## Globals

### Header (`src/Header/config.ts`)
```typescript
fields: [
  {
    name: 'navItems',
    type: 'array',
    maxRows: 6,
    fields: [link({ appearances: false })]
  }
]
```

### Footer (`src/Footer/config.ts`)
```typescript
tabs: [
  {
    label: 'Navigation',
    fields: [navItems array]
  },
  {
    label: 'Display Options',
    fields: [
      showSocialLinks (checkbox, default: true),
      showContactInfo (checkbox, default: true),
      showNewsletter (checkbox, default: true)
    ]
  },
  {
    label: 'Newsletter',
    fields: [newsletterTitle, newsletterDescription]
  }
]
```

### SiteSettings (`src/SiteSettings/config.ts`)
```typescript
tabs: [
  {
    label: 'General',
    fields: [siteName (required), logo (media)]
  },
  {
    label: 'Contact',
    fields: [email, phone, address: {street, city, postalCode, country}]
  },
  {
    label: 'Social Media',
    fields: [
      socialLinks array: [
        platform (select: facebook, twitter, instagram, linkedin, youtube, discord, github, tiktok),
        url (text, required)
      ]
    ]
  }
]
```

---

## Available Blocks

### 1. GlassHero (Minimal Structure)

**Purpose:** Hero section - provides structure only, style via theme.css

**Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `headline` | text | yes | Main hero text |
| `subheadline` | richText | no | Supporting text |
| `primaryCTA` | link | no | Primary button |
| `secondaryCTA` | link | no | Secondary button |
| `backgroundMedia` | upload | no | Background image |

**CSS Classes for Styling:**
| Class | Element |
|-------|---------|
| `.hero-section` | Main section wrapper |
| `.hero-background` | Background layer |
| `.hero-content` | Content container |
| `.hero-headline` | Main heading |
| `.hero-subheadline` | Supporting text |
| `.hero-cta-primary` | Primary button |
| `.hero-cta-secondary` | Secondary button |
| `.hero-overlay` | Image overlay |

**Example theme.css styling:**
```css
.hero-section {
  min-height: 90vh;
}

.hero-background {
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
}

.hero-headline {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-cta-primary {
  background: hsl(var(--accent));
  box-shadow: 0 0 30px hsl(var(--accent) / 0.4);
}
```

---

### 2. Features (Minimal Structure)

**Purpose:** Grid of feature/service cards - provides structure only

**Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sectionTitle` | text | no | Section heading |
| `sectionDescription` | textarea | no | Section intro |
| `features` | array (1-8) | yes | Feature items |

**Feature item fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `icon` | select | no | Icon identifier |
| `title` | text | yes | Feature title |
| `description` | textarea | yes | Feature description |
| `linkUrl` | text | no | Optional link |
| `linkLabel` | text | conditional | Link text |

**Available icons:**
```
calendar | book | users | star | code | globe | heart | lightning
```

**CSS Classes for Styling:**
| Class | Element |
|-------|---------|
| `.features-section` | Main section wrapper |
| `.features-header` | Title and description container |
| `.features-title` | Section heading |
| `.features-description` | Section description |
| `.features-grid` | Card grid container |
| `.feature-card` | Individual card |
| `.feature-icon` | Icon container |
| `.feature-title` | Card heading |
| `.feature-description` | Card text |
| `.feature-link` | Card link |

**Example theme.css styling:**
```css
.feature-card {
  border-left: 4px solid hsl(var(--primary));
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-8px);
}

.feature-icon {
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
  color: white;
}
```

---

### 3. Testimonials (Minimal Structure)

**Purpose:** Customer reviews/quotes - provides structure only

**Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sectionTitle` | text | no | Default: "What People Say" |
| `sectionDescription` | textarea | no | Section intro |
| `testimonials` | array (1-6) | yes | Review items |

**Testimonial item fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `quote` | textarea | yes | Review text |
| `author` | text | yes | Reviewer name |
| `role` | text | no | Role/Company |
| `avatar` | upload | no | Profile image |
| `rating` | number (1-5) | no | Star rating (default: 5) |

**CSS Classes for Styling:**
| Class | Element |
|-------|---------|
| `.testimonials-section` | Main section wrapper |
| `.testimonials-header` | Title and description container |
| `.testimonials-title` | Section heading |
| `.testimonials-description` | Section description |
| `.testimonials-grid` | Card grid container |
| `.testimonial-card` | Individual card |
| `.testimonial-rating` | Stars container |
| `.testimonial-star` | Individual star (`.filled` for filled) |
| `.testimonial-quote` | Quote text |
| `.testimonial-author` | Author container |
| `.testimonial-avatar` | Avatar image/placeholder |
| `.testimonial-name` | Author name |
| `.testimonial-role` | Author role |

**Example theme.css styling:**
```css
.testimonial-card {
  background: hsl(var(--card));
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.testimonial-star.filled {
  color: hsl(45 100% 50%); /* Gold */
}

.testimonial-quote::before {
  content: '"';
  font-size: 4rem;
  color: hsl(var(--primary) / 0.2);
}
```

---

### 4. ContactCTA (Minimal Structure)

**Purpose:** Contact section with info and CTA - provides structure only

**Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `headline` | text | yes | Default: "Ready to Get Started?" |
| `description` | richText | no | Supporting text |
| `form` | relationship | no | Link to form |
| `contactEmail` | email | no | Contact email |
| `contactPhone` | text | no | Phone number |
| `socialLinks` | array | no | Social media links |
| `primaryCTA` | link | no | Primary button |

**Social link platforms:**
```
twitter | facebook | instagram | linkedin | youtube | github | discord
```

**CSS Classes for Styling:**
| Class | Element |
|-------|---------|
| `.contact-section` | Main section wrapper |
| `.contact-background` | Background layer |
| `.contact-content` | Content container |
| `.contact-headline` | Main heading |
| `.contact-description` | Description text |
| `.contact-info` | Email/phone container |
| `.contact-link` | Email/phone links |
| `.contact-social` | Social links container |
| `.contact-social-link` | Individual social link |
| `.contact-cta` | Primary CTA button |

**Example theme.css styling:**
```css
.contact-background {
  background: hsl(var(--primary));
}

.contact-headline {
  color: hsl(var(--primary-foreground));
}

.contact-social-link:hover {
  background: hsl(var(--primary-foreground) / 0.3);
  transform: scale(1.1);
}
```

---

### 5. CallToAction
**Purpose:** Simple CTA section

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `richText` | richText | CTA content (h1-h4 enabled) |
| `linkGroup` | array (max 2) | CTA buttons |

---

### 6. Content
**Purpose:** Flexible rich text columns

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `columns` | array | Content columns |

**Column fields:**
| Field | Type | Options |
|-------|------|---------|
| `size` | select | oneThird, half, twoThirds, full |
| `richText` | richText | Content (h2-h4 enabled) |
| `enableLink` | checkbox | Show link below content |
| `link` | link | Conditional on enableLink |

---

### 7. MediaBlock
**Purpose:** Image/video display

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `media` | upload | Media file |
| `position` | select | Image positioning |

---

### 8. Archive
**Purpose:** Post/collection listing

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `relationTo` | select | Collection to display |
| `categories` | relationship | Filter by categories |
| `limit` | number | Items to show |

---

### 9. FormBlock
**Purpose:** Embed CMS-managed forms

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `form` | relationship | Reference to form |

---

## Block Rendering System

**File:** `src/blocks/RenderBlocks.tsx`

```typescript
const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  glassHero: GlassHeroBlock,
  features: FeaturesBlock,
  testimonials: TestimonialsBlock,
  contactCTA: ContactCTABlock,
}
```

Pages render blocks by mapping the `layout` array through `RenderBlocks`.

---

## Theme System

### Architecture

```
globals.css  → Neutral base (CSS variables, structure) - DON'T MODIFY
theme.css    → ALL visual identity (colors, effects, animations) - CUSTOMIZE!
```

### CSS Variables (HSL Format)

Colors are defined using HSL values without the `hsl()` wrapper.

**Format:** `hue saturation% lightness%`

**Example:**
```css
:root {
  --primary: 0 85% 45%;          /* Racing red */
  --primary-foreground: 0 0% 100%; /* White */
  --secondary: 0 0% 10%;         /* Carbon black */
  --accent: 45 100% 50%;         /* Warning yellow */
  --background: 0 0% 98%;
  --foreground: 0 0% 10%;
  --success: 150 60% 45%;
  --warning: 45 100% 55%;
  --error: 0 70% 55%;
}

[data-theme='dark'] {
  --background: 0 0% 5%;
  --foreground: 0 0% 95%;
  --primary: 0 80% 50%;
  /* ... */
}
```

### Theme.css Sections

1. **Color Palette** - Light and dark mode HSL values
2. **Custom Effects** - Glass, gradients, glows (only if design requires)
3. **Custom Animations** - @keyframes (only if design requires)
4. **Component Overrides** - Style semantic CSS classes
5. **Typography** - Font customizations
6. **Responsive** - Breakpoint adjustments

### Example: Racing Theme

```css
/* Section 1: Colors */
:root {
  --primary: 0 85% 45%;      /* Crimson red */
  --secondary: 0 0% 10%;     /* Carbon black */
  --accent: 45 100% 50%;     /* Warning yellow */
}

/* Section 3: Custom Effects */
@layer components {
  .carbon-texture {
    background: url('/patterns/carbon-fiber.svg') repeat;
  }
}

/* Section 4: Animations */
@layer utilities {
  .animate-rpm {
    animation: rpm-pulse 0.5s ease-out;
  }

  @keyframes rpm-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
}

/* Section 5: Component Styles */
.hero-background {
  background:
    url('/patterns/carbon-fiber.svg') repeat,
    linear-gradient(135deg, hsl(0 0% 5%), hsl(0 0% 10%));
}

.feature-card {
  border-left: 4px solid hsl(var(--primary));
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-8px);
}
```

---

## Link Field Structure

**File:** `src/fields/link.ts`

The link field provides flexible link options:

```typescript
{
  type: select('reference' | 'custom'),
  newTab: checkbox,
  reference: {
    relationTo: ['pages', 'posts'],
    // Creates internal link to content
  },
  url: text, // For custom/external links
  label: text, // Link text
  appearance: select('default' | 'outline') // Button style
}
```

---

## Seed Data System

**File:** `src/endpoints/seed/index.ts`

### Current behavior:
1. Clears all collections and globals
2. Creates demo admin user
3. Sets up empty header/footer

### Utility functions:

```typescript
// Create Lexical-compatible rich text
export const createRichText = (text: string) => ({
  root: {
    type: 'root',
    children: [{
      type: 'paragraph',
      children: [{
        type: 'text',
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text,
        version: 1,
      }],
      direction: 'ltr',
      format: '',
      indent: 0,
      textFormat: 0,
      version: 1,
    }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

// Fetch file from URL
export async function fetchFileByURL(url: string): Promise<File>
```

### Creating pages with blocks:

```typescript
await payload.create({
  collection: 'pages',
  data: {
    title: 'Page Title',
    slug: 'page-slug',
    layout: [
      {
        blockType: 'glassHero',
        headline: 'Hero Headline',
        subheadline: createRichText('Subheadline text'),
        primaryCTA: {
          type: 'reference',
          reference: { relationTo: 'pages', value: pageId },
          label: 'Button Text',
          appearance: 'default',
        },
      },
      {
        blockType: 'features',
        sectionTitle: 'Features',
        features: [
          {
            icon: 'star',
            title: 'Feature 1',
            description: 'Description text',
          },
        ],
      },
    ],
    _status: 'published',
  },
})
```

### Updating globals:

```typescript
// Header
await payload.updateGlobal({
  slug: 'header',
  data: {
    navItems: [
      {
        link: {
          type: 'reference',
          reference: { relationTo: 'pages', value: pageId },
          label: 'Nav Item',
        },
      },
    ],
  },
})

// Site Settings
await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    siteName: 'Site Name',
    contact: {
      email: 'email@example.com',
      phone: '+48 123 456 789',
      address: {
        street: 'Street 123',
        city: 'City',
        postalCode: '00-000',
        country: 'Country',
      },
    },
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com/...' },
    ],
  },
})
```

---

## Localization

Pre-configured for:
- **Polish (pl)** - default
- **English (en)**

Configuration in `src/payload.config.ts`.

---

## Commands

```bash
# Database (Docker)
docker compose up -d  # Start PostgreSQL on port 5433
docker compose down   # Stop database

# Development
pnpm install          # Install dependencies
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Production build
pnpm lint             # ESLint check
pnpm generate:types   # Regenerate TypeScript types
pnpm payload migrate  # Run database migrations
```

---

## Database Setup

### Docker (Recommended)

PostgreSQL runs on **port 5433** to avoid conflicts with other projects.

```bash
# Start database
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs postgres

# Stop database
docker compose down
```

### Connection

```bash
# Default connection string (Docker)
DATABASE_URI=postgres://postgres:postgres@localhost:5433/payload
```

---

## Environment Variables

```bash
DATABASE_URI=postgres://...@localhost:5433/payload  # PostgreSQL (port 5433!)
PAYLOAD_SECRET=...                                   # JWT encryption key
NEXT_PUBLIC_SERVER_URL=http://localhost:3000         # Public site URL
NEXT_PUBLIC_SITE_NAME=My Website                     # Site name for SEO
PREVIEW_SECRET=...                                   # Draft preview auth
```

---

## Admin Panel

- **URL:** `http://localhost:3000/admin`
- **Default login:** admin@example.com / admin123
- **Seed endpoint:** `/api/seed` (or admin UI seed button)

---

## Customization Workflow

1. Start database: `docker compose up -d`
2. Copy `.env.example` to `.env`
3. Set `NEXT_PUBLIC_SITE_NAME` in `.env`
4. Fill `PAGE_DESCRIPTION.md` with business info
5. Fill `PAGE_DESIGN.md` with visual design
6. **Generate theme.css** with colors, effects, animations (interpret from PAGE_DESIGN.md)
7. Expand `seed/index.ts` to create pages with blocks
8. Configure header/footer navigation
9. Set site settings (contact, social)
10. Run `pnpm generate:types`
11. Test with `pnpm dev`
