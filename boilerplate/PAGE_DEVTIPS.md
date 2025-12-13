# Development Tips & Gotchas

> **Note:** For the main customization workflow, see `SETUP_PROMPT.md`. This file contains quick fixes and gotchas.

Quick reference for common issues and patterns when customizing this boilerplate.

---

## Files to Update for New Site

| What | File | Notes |
|------|------|-------|
| Logo text | `src/components/Logo/Logo.tsx` | Hardcoded "YourHub" - change it |
| Site name (SEO) | `src/plugins/index.ts` | `SITE_NAME` constant |
| Theme colors | `src/app/(frontend)/theme.css` | HSL format without `hsl()` wrapper |
| Seed data | `src/endpoints/seed/index.ts` | Pages, navigation, settings |
| Home fallback | `src/endpoints/seed/home-static.ts` | Must exist (even empty) |

---

## Common Issues & Fixes

### 1. "Module not found: home-static"
**Problem**: `src/app/(frontend)/[slug]/page.tsx` imports `homeStatic`
**Fix**: Create `src/endpoints/seed/home-static.ts`:
```typescript
import type { RequiredDataFromCollectionSlug } from 'payload'

export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  id: 0,
  title: 'Home',
  slug: 'home',
  hero: { type: 'none' },
  layout: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
```

### 2. CSS @layer Error
**Problem**: `@layer components` in theme.css fails
**Fix**: Don't use `@layer` directives in theme.css - only use them in globals.css which has `@tailwind` directives

### 3. Link Field Validation Errors
**Problem**: "Document to link to" or "Label" required even for custom URLs
**Fix**: In `src/fields/link.ts`, ensure `required: false` on conditional fields:
```typescript
{ name: 'reference', required: false, ... }
{ name: 'url', required: false, ... }
{ name: 'label', required: false, ... }
```

### 4. Seed Route 403 Forbidden
**Problem**: `/next/seed` requires authentication
**Fix**: For development, simplify `src/app/(frontend)/next/seed/route.ts`:
```typescript
export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const payloadReq = await createLocalReq({}, payload)
  await seed({ payload, req: payloadReq })
  return Response.json({ success: true })
}

export async function GET(): Promise<Response> {
  return POST()
}
```

### 5. Content Invisible on Page
**Problem**: ScrollReveal animations keep content at `opacity: 0`
**Cause**: IntersectionObserver hasn't triggered
**Note**: Content appears when user scrolls - this is expected behavior

---

## Data Structures

### HSL Colors (theme.css)
```css
/* Format: H S% L% (no hsl wrapper, no commas) */
--primary: 220 70% 25%;
--secondary: 30 95% 50%;
```

### Rich Text (Lexical format)
```typescript
const createRichText = (text: string) => ({
  root: {
    type: 'root',
    children: [{
      type: 'paragraph',
      children: [{ type: 'text', text, version: 1 }],
      version: 1,
    }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})
```

### Link Field
```typescript
// Internal link
{ type: 'reference', reference: { relationTo: 'pages', value: pageId }, label: 'Click' }

// External link
{ type: 'custom', url: '/path', label: 'Click' }

// Phone link
{ type: 'custom', url: 'tel:+48123456789', label: 'Call Us' }
```

### Feature Item
```typescript
{
  icon: 'star', // calendar|book|users|star|code|globe|heart|lightning
  title: 'Feature Title',
  description: 'Feature description text',
}
```

---

## Quick Commands

```bash
# Reset database (when schema conflicts)
psql -U postgres -c "DROP DATABASE payload; CREATE DATABASE payload;"

# Regenerate types after schema changes
pnpm generate:types

# Clear Next.js cache
rm -rf .next && pnpm dev

# Trigger seed (browser)
http://localhost:3000/next/seed
```

---

## Seed Data Checklist

- [ ] Admin user (email + password)
- [ ] Home page (slug: 'home')
- [ ] Other pages (unique slugs)
- [ ] Header global (navItems array)
- [ ] Footer global (navItems + social enabled)
- [ ] Site-settings global (siteName, contact, social URLs)
