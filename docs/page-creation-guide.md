# Payload CMS Page Creation Guide

This guide explains how to create new pages with block sections in this Payload CMS + Next.js project. Use this as a prompt for AI agents to generate new pages.

---

## Architecture Overview

```
src/
├── blocks/                    # Block components and configs
│   ├── [BlockName]/
│   │   ├── config.ts         # Payload field definitions
│   │   └── Component.tsx     # React frontend component
│   └── RenderBlocks.tsx      # Block renderer
├── collections/
│   └── Pages/index.ts        # Page collection with blocks field
├── endpoints/seed/           # Seed data files
│   ├── index.ts              # Main seed orchestrator
│   └── [page-name].ts        # Page seed data
└── app/(frontend)/
    └── [slug]/page.tsx       # Dynamic page renderer
```

---

## Available Block Types

| Block Type | Slug | Purpose |
|------------|------|---------|
| GlassHero | `glassHero` | Hero section with glass effect, headline, CTAs |
| Features | `features` | Grid of feature cards with icons |
| UpcomingEvents | `upcomingEvents` | Event cards with dates and locations |
| CoursesShowcase | `coursesShowcase` | Course cards with duration and level |
| Testimonials | `testimonials` | Customer quotes with ratings |
| ContactCTA | `contactCTA` | Contact section with email, phone, social links |
| CallToAction | `cta` | Simple CTA with rich text and links |
| Content | `content` | Flexible columns with rich text |
| MediaBlock | `mediaBlock` | Single media/image display |
| Archive | `archive` | Dynamic post listing |
| FormBlock | `formBlock` | Embedded form |

---

## Block Field Structures

### GlassHero
```typescript
{
  blockType: 'glassHero',
  blockName: 'Hero Section',
  headline: 'Your Headline Here',
  subheadline: createRichText('Subheadline text'),
  primaryCTA: {
    type: 'custom',
    appearance: 'default',
    label: 'Primary Button',
    url: '/path'
  },
  secondaryCTA: {
    type: 'custom',
    appearance: 'outline',
    label: 'Secondary Button',
    url: '/path'
  },
  backgroundMedia: null // or media ID
}
```

### Features
```typescript
{
  blockType: 'features',
  blockName: 'Features Section',
  sectionTitle: 'What We Offer',
  sectionDescription: 'Optional description text',
  features: [
    {
      icon: 'calendar', // calendar|book|users|star|code|globe|heart|lightning
      title: 'Feature Title',
      description: 'Feature description text',
      linkUrl: '/optional-link',
      linkLabel: 'Learn More'
    }
  ]
}
```

### UpcomingEvents
```typescript
{
  blockType: 'upcomingEvents',
  blockName: 'Events Section',
  sectionTitle: 'Upcoming Events',
  sectionDescription: 'Optional description',
  events: [
    {
      title: 'Event Name',
      description: 'Event description',
      date: '2025-01-15T18:00:00.000Z', // ISO date string
      location: 'Event Location',
      image: null, // or media ID
      link: {
        type: 'custom',
        appearance: 'default',
        label: 'Register Now',
        url: '/events/event-slug'
      }
    }
  ],
  viewAllLink: {
    type: 'custom',
    label: 'View All Events',
    url: '/events'
  }
}
```

### CoursesShowcase
```typescript
{
  blockType: 'coursesShowcase',
  blockName: 'Courses Section',
  sectionTitle: 'Popular Courses',
  sectionDescription: 'Optional description',
  courses: [
    {
      image: null, // or media ID
      title: 'Course Title',
      description: 'Course description',
      duration: '12 weeks',
      level: 'beginner', // beginner|intermediate|advanced
      price: '$299',
      link: {
        type: 'custom',
        label: 'Enroll Now',
        url: '/courses/course-slug'
      }
    }
  ],
  viewAllLink: {
    type: 'custom',
    label: 'Browse All Courses',
    url: '/courses'
  }
}
```

### Testimonials
```typescript
{
  blockType: 'testimonials',
  blockName: 'Testimonials Section',
  sectionTitle: 'What People Say',
  sectionDescription: 'Optional description',
  testimonials: [
    {
      quote: 'Customer testimonial text here.',
      author: 'John Doe',
      role: 'CEO at Company',
      avatar: null, // or media ID
      rating: 5 // 1-5
    }
  ]
}
```

### ContactCTA
```typescript
{
  blockType: 'contactCTA',
  blockName: 'Contact Section',
  headline: 'Ready to Get Started?',
  description: createRichText('Contact us today'),
  contactEmail: 'hello@example.com',
  contactPhone: '+1 (555) 123-4567',
  socialLinks: [
    { platform: 'twitter', url: 'https://twitter.com/handle' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/name' }
    // Available: twitter|facebook|instagram|linkedin|youtube|github|discord
  ],
  primaryCTA: {
    type: 'custom',
    label: 'Contact Us',
    url: '/contact'
  }
}
```

### CallToAction
```typescript
{
  blockType: 'cta',
  blockName: 'CTA Section',
  richText: createRichText('Your call to action text'),
  links: [
    {
      link: {
        type: 'custom',
        appearance: 'default',
        label: 'Get Started',
        url: '/signup'
      }
    }
  ]
}
```

### Content
```typescript
{
  blockType: 'content',
  blockName: 'Content Section',
  columns: [
    {
      size: 'full', // oneThird|half|twoThirds|full
      richText: createRichText('Column content'),
      enableLink: false,
      link: null
    }
  ]
}
```

---

## Helper Functions

### Rich Text (Lexical Format)
```typescript
const createRichText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1
          }
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1
      }
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1
  }
})
```

### Rich Text with Heading
```typescript
const createHeading = (text: string, tag: 'h1' | 'h2' | 'h3' = 'h2') => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'heading',
        children: [
          { type: 'text', text, version: 1 }
        ],
        tag,
        version: 1
      }
    ],
    version: 1
  }
})
```

---

## Complete Page Seed Example

```typescript
import type { RequiredDataFromCollectionSlug } from 'payload'

const createRichText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1
      }
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1
  }
})

export const aboutPage: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'about',
  _status: 'published',
  title: 'About Us',

  // Hero section (optional, use 'none' to skip)
  hero: {
    type: 'none'
  },

  // Page blocks
  layout: [
    // Hero block
    {
      blockType: 'glassHero',
      blockName: 'About Hero',
      headline: 'About Our Company',
      subheadline: createRichText('Learn more about who we are and what we do.'),
      primaryCTA: {
        type: 'custom',
        appearance: 'default',
        label: 'Contact Us',
        url: '/contact'
      },
      secondaryCTA: {
        type: 'custom',
        appearance: 'outline',
        label: 'Our Services',
        url: '/services'
      }
    },

    // Features block
    {
      blockType: 'features',
      blockName: 'Our Values',
      sectionTitle: 'Our Core Values',
      sectionDescription: 'What drives us every day',
      features: [
        {
          icon: 'heart',
          title: 'Customer First',
          description: 'We put our customers at the center of everything we do.'
        },
        {
          icon: 'star',
          title: 'Excellence',
          description: 'We strive for excellence in every project.'
        },
        {
          icon: 'users',
          title: 'Collaboration',
          description: 'We believe in the power of teamwork.'
        },
        {
          icon: 'lightning',
          title: 'Innovation',
          description: 'We embrace new ideas and technologies.'
        }
      ]
    },

    // Testimonials block
    {
      blockType: 'testimonials',
      blockName: 'Client Testimonials',
      sectionTitle: 'What Our Clients Say',
      testimonials: [
        {
          quote: 'Working with this team has been an incredible experience.',
          author: 'Jane Smith',
          role: 'Marketing Director',
          rating: 5
        },
        {
          quote: 'They delivered beyond our expectations.',
          author: 'Mike Johnson',
          role: 'Startup Founder',
          rating: 5
        }
      ]
    },

    // Contact CTA block
    {
      blockType: 'contactCTA',
      blockName: 'Get in Touch',
      headline: 'Ready to Work Together?',
      description: createRichText('Reach out to discuss your project.'),
      contactEmail: 'hello@company.com',
      contactPhone: '+1 (555) 123-4567',
      socialLinks: [
        { platform: 'twitter', url: 'https://twitter.com/company' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/name' }
      ],
      primaryCTA: {
        type: 'custom',
        label: 'Start a Project',
        url: '/contact'
      }
    }
  ],

  // SEO metadata
  meta: {
    title: 'About Us | Company Name',
    description: 'Learn about our company, values, and the team behind our success.'
  }
}
```

---

## Seeding the Page

### Method 1: Add to Main Seed
Edit `/src/endpoints/seed/index.ts`:
```typescript
import { aboutPage } from './about-page'

// In the seed function:
await payload.create({
  collection: 'pages',
  data: aboutPage,
  context: { disableRevalidate: true }
})
```

### Method 2: Standalone Seed Script
Create `/seed-about.ts`:
```typescript
import { getPayload } from 'payload'
import config from '@payload-config'
import { aboutPage } from './src/endpoints/seed/about-page'

const seed = async () => {
  const payload = await getPayload({ config })

  // Delete existing page with same slug
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: aboutPage.slug } }
  })

  for (const doc of existing.docs) {
    await payload.delete({ collection: 'pages', id: doc.id })
  }

  // Create new page
  await payload.create({
    collection: 'pages',
    data: aboutPage
  })

  console.log('Page seeded successfully!')
  process.exit(0)
}

seed()
```

Run with: `npx tsx seed-about.ts`

---

## Key Files Reference

| Purpose | File Path |
|---------|-----------|
| Block configs | `/src/blocks/[BlockName]/config.ts` |
| Block components | `/src/blocks/[BlockName]/Component.tsx` |
| Block renderer | `/src/blocks/RenderBlocks.tsx` |
| Page collection | `/src/collections/Pages/index.ts` |
| Link field helper | `/src/fields/link.ts` |
| Seed orchestrator | `/src/endpoints/seed/index.ts` |
| Homepage seed example | `/src/endpoints/seed/hub-home.ts` |

---

## Tips for AI Agents

1. **Always use `blockType` slug** - Must match exactly (e.g., `glassHero` not `GlassHero`)
2. **Rich text requires Lexical format** - Use the `createRichText` helper
3. **Links have specific structure** - Use `type: 'custom'` for URL links
4. **Arrays have limits** - Check minRows/maxRows in block configs
5. **Icons are predefined** - Only use icons listed in the Features block
6. **Dates are ISO strings** - Use `'2025-01-15T18:00:00.000Z'` format
7. **Media fields accept IDs** - Pass media document ID or `null`
8. **SEO is important** - Always include `meta.title` and `meta.description`
