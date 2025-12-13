# Claude Code Site Customization Guide

## Overview

This boilerplate provides **STRUCTURE ONLY** - minimal HTML with semantic CSS classes.
**YOU** create the visual identity based on PAGE_DESIGN.md.

Every site you generate should look **genuinely unique** because:
- Components have no hardcoded styles (no glass, gradients, or animations)
- All visual effects are created by you in `theme.css`
- PAGE_DESIGN.md drives all aesthetic decisions

---

## Core Principle

```
BOILERPLATE = Structure (HTML, semantic classes, layout)
YOU = Visual Identity (colors, effects, animations, component styles)
```

**Never rely on default styling. Always create custom visuals for each project.**

---

## Documentation Files

| File | Purpose |
|------|---------|
| **SETUP_PROMPT.md** | Customization workflow (YOU ARE HERE) |
| **PAGE_BOILERPLATE.md** | Technical reference - blocks, seed data |
| **PAGE_DEVTIPS.md** | Common issues, quick fixes |
| **PAGE_DESCRIPTION.md** | Business info (fill out) |
| **PAGE_DESIGN.md** | Visual design spec (fill out) |

---

## Environment Setup

### Docker (Recommended)

```bash
docker compose up -d        # Start PostgreSQL on port 5433
cp .env.example .env        # Copy environment
pnpm install                # Install dependencies
pnpm dev                    # Start dev server
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URI` | PostgreSQL connection (default: localhost:5433) |
| `NEXT_PUBLIC_SERVER_URL` | Public URL (default: http://localhost:3000) |
| `NEXT_PUBLIC_SITE_NAME` | Site name for SEO |
| `PAYLOAD_SECRET` | JWT secret (min 32 chars) |

---

## Step 0: Design Interpretation (CRITICAL)

### Read PAGE_DESIGN.md Thoroughly

Before writing any code, understand:
- Color philosophy and associations
- Visual style (modern, elegant, industrial, organic, etc.)
- Effects requested (glass, gradients, glows, textures)
- Animations requested (floats, pulses, reveals)
- Typography style
- Component-specific styling

### Generate `theme.css`

You must create ALL visual identity in `src/app/(frontend)/theme.css`:

#### Section 1: Colors

Interpret creative descriptions into HSL values:

```css
:root {
  /* Example: Racing theme */
  --primary: 0 85% 45%;      /* Crimson red - brake lights */
  --secondary: 0 0% 10%;     /* Carbon black */
  --accent: 45 100% 50%;     /* Warning yellow */
  --background: 0 0% 98%;
  --foreground: 0 0% 10%;
  /* ... all other variables */
}

[data-theme='dark'] {
  --primary: 0 80% 50%;
  --background: 0 0% 5%;
  /* ... dark variants */
}
```

#### Section 2: Custom Effects

If PAGE_DESIGN.md calls for glass, gradients, or glows:

```css
@layer components {
  /* Glass morphism - only if design calls for it */
  .glass {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid hsl(var(--primary) / 0.15);
  }

  /* Gradient - match design spec */
  .gradient-primary {
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
  }

  /* Glow effect */
  .glow-primary {
    box-shadow: 0 0 30px hsl(var(--primary) / 0.4);
  }
}
```

#### Section 3: Custom Animations

If PAGE_DESIGN.md specifies animations:

```css
@layer utilities {
  /* Example: Racing gauge animation */
  .animate-gauge {
    animation: gauge-fill 1.5s ease-out forwards;
  }

  @keyframes gauge-fill {
    from { stroke-dashoffset: 100; }
    to { stroke-dashoffset: 0; }
  }

  /* Example: Pulse effect */
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px hsl(var(--primary) / 0.3); }
    50% { box-shadow: 0 0 40px hsl(var(--primary) / 0.6); }
  }
}
```

#### Section 4: Component Styles

Style components to match design vision:

```css
/* Hero styling */
.hero-section {
  /* Add background patterns, textures */
}

.hero-background {
  background:
    url('/patterns/carbon-fiber.svg') repeat,
    linear-gradient(135deg, hsl(var(--secondary)), hsl(0 0% 5%));
}

.hero-headline {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  /* Add text gradient if design calls for it */
}

.hero-cta-primary {
  background: hsl(var(--primary));
  box-shadow: 0 0 30px hsl(var(--primary) / 0.4);
  transition: transform 0.3s, box-shadow 0.3s;
}

.hero-cta-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 0 50px hsl(var(--primary) / 0.6);
}

/* Feature cards */
.feature-card {
  border-left: 4px solid hsl(var(--primary));
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-8px);
}

/* Testimonials */
.testimonial-star.filled {
  color: hsl(var(--secondary));
}
```

### Available Component Classes

These classes exist on minimal components - style them in theme.css:

#### Hero Block
- `.hero-section` - Main section
- `.hero-background` - Background layer
- `.hero-content` - Content container
- `.hero-headline` - Main heading
- `.hero-subheadline` - Supporting text
- `.hero-cta-primary` - Primary button
- `.hero-cta-secondary` - Secondary button
- `.hero-overlay` - Image overlay

#### Features Block
- `.features-section` - Main section
- `.features-header` - Title container
- `.features-title` - Section heading
- `.features-grid` - Card grid
- `.feature-card` - Individual card
- `.feature-icon` - Icon container
- `.feature-title` - Card heading
- `.feature-description` - Card text
- `.feature-link` - Card link

#### Testimonials Block
- `.testimonials-section` - Main section
- `.testimonials-header` - Title container
- `.testimonials-title` - Section heading
- `.testimonials-grid` - Card grid
- `.testimonial-card` - Individual card
- `.testimonial-rating` - Stars container
- `.testimonial-star` - Individual star (`.filled` for filled)
- `.testimonial-quote` - Quote text
- `.testimonial-author` - Author container
- `.testimonial-avatar` - Avatar image
- `.testimonial-name` - Author name
- `.testimonial-role` - Author role

#### Contact CTA Block
- `.contact-section` - Main section
- `.contact-background` - Background layer
- `.contact-content` - Content container
- `.contact-headline` - Main heading
- `.contact-description` - Description text
- `.contact-info` - Contact info container
- `.contact-link` - Email/phone links
- `.contact-social` - Social links container
- `.contact-social-link` - Individual social link
- `.contact-cta` - Primary CTA button

---

## Step 1: Fill Description Files

Complete before running customization:

**PAGE_DESCRIPTION.md:**
- Business name and type
- Target audience
- Value propositions
- Required pages and sections
- Contact info

**PAGE_DESIGN.md:**
- Color philosophy (creative descriptions)
- Typography style
- Visual effects (glass, gradients, animations)
- Component-specific styling
- Page structure

---

## Step 2: Run Customization

Execute this prompt with Claude Code:

```
Based on PAGE_DESCRIPTION.md and PAGE_DESIGN.md, customize this boilerplate:

⚠️ CRITICAL: This is a BLANK CANVAS boilerplate.
   Components have NO default styling - YOU create ALL visual identity.

0. GENERATE theme.css (MOST IMPORTANT)
   - Interpret color descriptions → HSL values
   - Create custom effects if design calls for them (glass, gradients, glows)
   - Create animations if design specifies them
   - Style ALL component classes to match design vision
   - Include light AND dark mode variants
   - Verify visual identity is UNIQUE to this business

1. Update src/plugins/index.ts
   - Replace SITE_NAME with business name

2. Create seed data in src/endpoints/seed/
   - Generate pages with appropriate blocks
   - Create compelling content matching business type
   - Add testimonials, features, CTAs

3. Update Header navigation
   - Add nav items for each page

4. Update Footer navigation
   - Mirror header + add social links

5. Populate SiteSettings global
   - Set siteName, contact info, social links

6. Run pnpm generate:types

7. VERIFY:
   - theme.css has actual HSL values (no INTERPRET_FROM_PAGE_DESIGN)
   - Custom effects/animations match PAGE_DESIGN.md
   - Site looks UNIQUE, not like default boilerplate
```

---

## Step 3: Verify Uniqueness

After customization, check:

1. **Colors are unique** - Not default grayscale
2. **Effects match design** - Glass, gradients, glows if specified
3. **Animations work** - Hover effects, transitions, scroll reveals
4. **Typography matches** - Font styles, letter spacing
5. **Components styled** - Hero, cards, buttons look per design

---

## Design Theme Examples

### Racing/Automotive Theme
```css
/* Colors */
--primary: 0 85% 45%;      /* Crimson red */
--secondary: 0 0% 10%;     /* Carbon black */
--accent: 45 100% 50%;     /* Warning yellow */

/* Effects */
.hero-background {
  background: url('/carbon-pattern.svg') repeat,
    linear-gradient(135deg, hsl(0 0% 5%), hsl(0 0% 10%));
}

.feature-card {
  border-left: 4px solid hsl(var(--primary));
}

.hero-cta-primary {
  box-shadow: 0 0 30px hsl(var(--primary) / 0.4);
}
```

### Nature/Organic Theme
```css
/* Colors */
--primary: 150 60% 35%;    /* Forest green */
--secondary: 35 80% 45%;   /* Warm wood */
--accent: 45 90% 55%;      /* Sunlight gold */

/* Effects */
.hero-background {
  background: linear-gradient(to bottom,
    hsl(150 40% 95%),
    hsl(150 30% 98%));
}

.feature-card {
  border-radius: 1rem;
  border: none;
  background: hsl(var(--card));
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}
```

### Tech/Futuristic Theme
```css
/* Colors */
--primary: 270 85% 55%;    /* Electric violet */
--secondary: 180 90% 45%;  /* Cyan */
--accent: 330 100% 60%;    /* Magenta */

/* Effects */
.hero-background {
  background:
    radial-gradient(circle at 30% 50%, hsl(var(--primary) / 0.2), transparent 50%),
    radial-gradient(circle at 70% 80%, hsl(var(--secondary) / 0.2), transparent 50%),
    hsl(240 20% 8%);
}

.feature-card {
  background: hsl(var(--card) / 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid hsl(var(--primary) / 0.3);
}
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Site looks plain/unstyled | theme.css not generated → run Step 0 |
| Default grayscale colors | Replace INTERPRET_FROM_PAGE_DESIGN placeholders |
| No effects/animations | Add them in theme.css based on PAGE_DESIGN.md |
| Components look too basic | Style component classes in theme.css |
| TypeScript errors | Run `pnpm generate:types` |

---

## File Locations

| Purpose | Path |
|---------|------|
| **Theme (ALL visual styling)** | `src/app/(frontend)/theme.css` |
| Base structure (don't modify) | `src/app/(frontend)/globals.css` |
| SEO title | `src/plugins/index.ts` |
| Seed data | `src/endpoints/seed/index.ts` |
| Block components | `src/blocks/*/Component.tsx` |
