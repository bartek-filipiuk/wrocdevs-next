# Implementation Tasks - Payload CMS Features

## Summary of Decisions

| Feature | Decision | Status |
|---------|----------|--------|
| **Default Language** | Polish (/) - no prefix | DONE |
| **Secondary Language** | English (/en prefix) | DONE |
| **i18n Routing** | URL-based locale detection | DONE |
| **Events** | Full features: basic + online + registration + pricing | DONE |
| **Courses** | Type selection dropdowns (priceType, deliveryType) | DONE |
| **Workshops** | Separate collection from Courses | DONE |
| **Footer** | Social links + Contact info + Newsletter | DONE |
| **Contact Data** | CMS Global (SiteSettings) | DONE |
| **Content Pages** | Use existing Pages collection | DONE |
| **Newsletter** | Brevo API with double opt-in | PENDING (needs API key) |

---

## Task List - Updated Status

### 1. Multilanguage Support (pl/en) - DONE

- [x] **1.1 Configure Payload CMS Localization**
  - [x] Add `localization` config to `src/payload.config.ts`
  - [x] Set `defaultLocale: 'pl'`, locales: `['pl', 'en']`
  - [x] Enable `fallback: true`

- [x] **1.2 Update Collections with Localized Fields**
  - [x] Pages: `title`, `meta.title`, `meta.description` - `localized: true`
  - [x] Posts: `title`, `meta` fields - `localized: true`
  - [x] Events: `title`, `description` - `localized: true`
  - [x] Courses: `title`, `description` - `localized: true`
  - [x] Workshops: `title`, `description` - `localized: true`

- [ ] **1.3 Update Block Configs for Localization** (Optional - blocks inherit from page locale)
  - [ ] GlassHero: headline, subheadline
  - [ ] Features: sectionTitle, sectionDescription, feature content
  - [ ] UpcomingEvents: all text fields
  - [ ] CoursesShowcase: all text fields
  - [ ] Testimonials: all text fields
  - [ ] ContactCTA: all text fields
  - [ ] CallToAction: all text fields
  - [ ] Content: richText content
  - [ ] FormBlock: introContent

- [ ] **1.4 Update Globals for Localization** (Optional)
  - [ ] Header navItems labels
  - [ ] Footer navItems labels
  - [ ] Link field `label` - add `localized: true`

- [x] **1.5 Create Next.js Middleware**
  - [x] Created `src/middleware.ts`
  - [x] Detect locale from URL path
  - [x] Skip admin/api/_next/static routes
  - [x] Handle default locale (PL) without prefix

- [x] **1.6 Frontend Routes for Locales**
  - [x] Created `src/app/(frontend)/en/` route structure
  - [x] All pages query with locale parameter
  - [x] English routes mirror Polish routes

- [x] **1.7 Create Locale Utilities**
  - [x] Created `src/i18n/config.ts` - locales, defaultLocale, isValidLocale
  - [x] Created `src/i18n/translations.ts` - UI translations
  - [x] Created `src/i18n/index.ts` - exports all utilities
  - [x] Created `src/utilities/getLocale.ts` - server-side locale detection

- [x] **1.8 Create LocaleProvider**
  - [x] Created `src/providers/Locale/index.tsx`
  - [x] Provides locale context and translation function

- [x] **1.9 Create Language Switcher Component**
  - [x] Created `src/components/LanguageSwitcher/index.tsx`
  - [x] Detects locale from URL path
  - [x] Shows toggle to switch between PL/EN
  - [x] Added to Header navigation

- [ ] **1.10 Run migrations for localization**
  - [ ] Need to run interactive migration for snapshot columns

---

### 2. New Collections (Event, Course, Workshop) - DONE

#### 2.1 Event Collection - DONE
- [x] Created `src/collections/Events/index.ts`
  - [x] Fields: title (localized), description (richText, localized), slug
  - [x] Date/Time: startDate, endDate
  - [x] Location group: eventType (offline/online/hybrid), address, city, country
  - [x] meetingLink (conditional on online/hybrid)
  - [x] Registration: maxParticipants, registrationDeadline, externalRegistrationUrl
  - [x] Pricing: isFree checkbox, price, currency (conditional)
  - [x] featuredImage (upload), categories (relationship)
  - [x] SEO fields (from plugin)
  - [x] Drafts/versioning enabled
- [x] Created `src/collections/Events/hooks/revalidateEvent.ts`
- [x] Registered in `payload.config.ts`

#### 2.2 Course Collection - DONE
- [x] Created `src/collections/Courses/index.ts`
  - [x] Fields: title (localized), description (richText, localized), slug
  - [x] priceType dropdown: free/paid
  - [x] deliveryType dropdown: online/offline/hybrid
  - [x] price, currency (conditional on paid)
  - [x] duration, level (beginner/intermediate/advanced)
  - [x] startDate, instructorName
  - [x] Location fields (conditional on offline/hybrid)
  - [x] featuredImage, categories
  - [x] SEO fields, drafts/versioning
- [x] Created `src/collections/Courses/hooks/revalidateCourse.ts`
- [x] Registered in `payload.config.ts`

#### 2.3 Workshop Collection - DONE
- [x] Created `src/collections/Workshops/index.ts`
  - [x] Fields: title (localized), description (richText, localized), slug
  - [x] priceType, deliveryType dropdowns
  - [x] price, currency (conditional)
  - [x] date, duration
  - [x] maxParticipants
  - [x] Location fields (conditional)
  - [x] featuredImage
  - [x] SEO fields, drafts/versioning
- [x] Created `src/collections/Workshops/hooks/revalidateWorkshop.ts`
- [x] Registered in `payload.config.ts`

#### 2.4 Update Related Files - DONE
- [x] Updated `src/fields/link.ts` relationTo: added events, courses, workshops
- [x] Types generated

---

### 3. SiteSettings Global - DONE

- [x] **3.1 Created SiteSettings Global**
  - [x] Created `src/SiteSettings/config.ts`
  - [x] Fields: siteName, logo, contact (email, phone, address), socialLinks
- [x] Created `src/SiteSettings/hooks/revalidateSiteSettings.ts`
- [x] Registered in `payload.config.ts` globals array
- [x] Types generated

---

### 4. Brevo Newsletter Integration - PENDING

- [ ] **4.1 Brevo Account Setup (User Action Required)**
  - [ ] Get API key from Brevo: Settings > SMTP & API > API Keys
  - [ ] Note list ID from Contacts > Lists
  - [ ] Create DOI template with "optin" tag and double opt-in button
  - [ ] Note template ID

- [ ] **4.2 Create API Route**
  - [ ] Create `src/app/api/newsletter/subscribe/route.ts`
  - [ ] POST handler with email validation
  - [ ] Call Brevo DOI endpoint
  - [ ] Handle errors gracefully

- [x] **4.3 Create Newsletter Form Component**
  - [x] Created `src/components/NewsletterForm/index.tsx` (client component)
  - [x] Email input + submit button
  - [ ] Connect to Brevo API (pending API route)

- [ ] **4.4 Create Confirmation Page**
  - [ ] Create `src/app/(frontend)/newsletter/confirmed/page.tsx`

- [ ] **4.5 Environment Variables**
  - [ ] Add to `.env`: BREVO_API_KEY, BREVO_LIST_ID, BREVO_DOI_TEMPLATE_ID

---

### 5. Footer Enhancement - DONE

- [x] **5.1 Updated Footer Global Config**
  - [x] Newsletter section with title
  - [x] Social links display
  - [x] Contact info display

- [x] **5.2 Created Supporting Components**
  - [x] SocialLinks component (renders platform icons)
  - [x] ContactInfo component (displays email, phone)

- [x] **5.3 Updated Footer Component**
  - [x] Fetches SiteSettings global
  - [x] Multi-column grid layout
  - [x] Integrated NewsletterForm component

---

### 6. Menu / Navigation - DONE

- [x] **6.1 Current Implementation Verified**
  - [x] Header and Footer globals exist
  - [x] navItems array with link field
  - [x] Max 6 items per nav

- [x] **6.2 Added to Header**
  - [x] Language switcher component
  - [x] Responsive behavior works

---

### 7. Contact Page - DONE

- [x] **7.1 Created Contact Page Route**
  - [x] Created `src/app/(frontend)/contact/page.tsx`
  - [x] Fetches SiteSettings global
  - [x] Displays contact info
  - [x] Displays social links

---

### 8. Privacy Policy Page - PENDING

- [ ] **8.1 Create Page via CMS**
  - [ ] Create page with slug "privacy-policy" in Payload admin
  - [ ] Use Content block for text content
  - [ ] User needs to fill content

---

### 9. Logo & Site Name - DONE

- [x] Handled by SiteSettings global
- [x] Header uses siteName from config

---

### 10. Frontend Routes for New Collections - DONE

#### 10.1 Events Routes - DONE
- [x] Created `src/app/(frontend)/events/page.tsx` - listing
- [x] Created `src/app/(frontend)/events/[slug]/page.tsx` - detail
- [x] Added generateStaticParams, generateMetadata
- [x] EventCard component in listing

#### 10.2 Courses Routes - DONE
- [x] Created `src/app/(frontend)/courses/page.tsx` - listing
- [x] Created `src/app/(frontend)/courses/[slug]/page.tsx` - detail
- [x] Added generateStaticParams, generateMetadata
- [x] CourseCard component in listing

#### 10.3 Workshops Routes - DONE
- [x] Created `src/app/(frontend)/workshops/page.tsx` - listing
- [x] Created `src/app/(frontend)/workshops/[slug]/page.tsx` - detail
- [x] Added generateStaticParams, generateMetadata
- [x] WorkshopCard component in listing

---

## What's Left To Do

### Required (User Action)

1. **Brevo Newsletter Setup**
   - Create Brevo account at https://app.brevo.com
   - Get API key: Settings > SMTP & API > API Keys
   - Create contact list and note the List ID
   - Create DOI email template and note the Template ID
   - Add to `.env`:
     ```
     BREVO_API_KEY=your-api-key
     BREVO_LIST_ID=your-list-id
     BREVO_DOI_TEMPLATE_ID=your-template-id
     ```

2. **Privacy Policy Page**
   - Create in Payload Admin: Pages > Create New
   - Slug: `privacy-policy`
   - Add Content block with your privacy policy text

### Optional Enhancements

1. **Block-level Localization** - Mark individual block text fields as `localized: true` if you need different content per language

2. **Header/Footer Nav Localization** - Add `localized: true` to navigation item labels

3. **Database Migration** - Run `pnpm dev` and select "create column" for snapshot fields when prompted

---

## Environment Variables Needed

```bash
# Required (existing)
DATABASE_URI=postgresql://...
PAYLOAD_SECRET=...
NEXT_PUBLIC_SERVER_URL=...

# Brevo Newsletter (pending setup)
BREVO_API_KEY=xkeysib-your-api-key
BREVO_LIST_ID=your-list-id-number
BREVO_DOI_TEMPLATE_ID=your-template-id-number
```

---

## Files Created/Modified

### New Files
| File | Purpose |
|------|---------|
| `src/collections/Events/index.ts` | Events collection |
| `src/collections/Events/hooks/revalidateEvent.ts` | Cache revalidation |
| `src/collections/Courses/index.ts` | Courses collection |
| `src/collections/Courses/hooks/revalidateCourse.ts` | Cache revalidation |
| `src/collections/Workshops/index.ts` | Workshops collection |
| `src/collections/Workshops/hooks/revalidateWorkshop.ts` | Cache revalidation |
| `src/SiteSettings/config.ts` | Site settings global |
| `src/SiteSettings/hooks/revalidateSiteSettings.ts` | Cache revalidation |
| `src/i18n/config.ts` | Locale configuration |
| `src/i18n/translations.ts` | UI translations |
| `src/i18n/index.ts` | i18n exports |
| `src/middleware.ts` | Locale routing middleware |
| `src/providers/Locale/index.tsx` | Locale context provider |
| `src/utilities/getLocale.ts` | Server-side locale detection |
| `src/components/LanguageSwitcher/index.tsx` | Language toggle component |
| `src/components/NewsletterForm/index.tsx` | Newsletter signup form |
| `src/app/(frontend)/events/page.tsx` | Events listing |
| `src/app/(frontend)/events/[slug]/page.tsx` | Event detail |
| `src/app/(frontend)/courses/page.tsx` | Courses listing |
| `src/app/(frontend)/courses/[slug]/page.tsx` | Course detail |
| `src/app/(frontend)/workshops/page.tsx` | Workshops listing |
| `src/app/(frontend)/workshops/[slug]/page.tsx` | Workshop detail |
| `src/app/(frontend)/contact/page.tsx` | Contact page |
| `src/app/(frontend)/en/*` | English locale routes |

### Modified Files
| File | Changes |
|------|---------|
| `src/payload.config.ts` | Added localization, collections, globals |
| `src/fields/link.ts` | Added events, courses, workshops to relationTo |
| `src/Header/Nav/index.tsx` | Added LanguageSwitcher |
| `src/Footer/Component.tsx` | Added newsletter, social links, contact info |
