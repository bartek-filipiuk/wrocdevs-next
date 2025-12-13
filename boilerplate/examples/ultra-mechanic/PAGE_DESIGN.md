# Visual Specification - Ultra Mechanic

> **CONCEPT: "HIGH-PERFORMANCE PRECISION"**
> Inspired by racing, precision engineering, and premium automotive. The design should evoke associations with an F1 pit stop, luxury tuning workshops, and high performance. WOW effect guaranteed.

---

## COLOR PALETTE (Creative Concept)

### Color Philosophy
```
INSPIRATION: Formula 1 pit stop during a night race
- Red-hot glowing brake discs
- Carbon fiber gleaming in headlights
- Chrome exhaust reflecting track lights
- Digital gauges on the dashboard
- Precision measurement to hundredths of a second
```

### Primary - Dominant Color
```
CONCEPT: Deep carbon fiber black
ASSOCIATIONS:
- Carbon fiber in supercars (Ferrari, Lamborghini)
- Night asphalt surface of a race track
- Premium, luxury, exclusivity
- Matte black with subtle sheen

USAGE:
- Main section backgrounds
- Card and element frames
- Headlines
- Premium button bases

INTENSITY: Deep, but not flat - should have carbon fiber texture
```

### Secondary - Energy Color
```
CONCEPT: Blood-red racing red - Brembo brake caliper red
ASSOCIATIONS:
- Red-hot glowing brake discs
- Ferrari, Alfa Romeo logos
- Adrenaline pulse, speed, power
- "Urgent" warning lights
- Neon in a night tuning workshop

USAGE:
- CTA buttons (Call Now!)
- 24h emergency numbers
- Accents, underlines
- Hover states
- Pulsing emergency elements

INTENSITY: Intense, pure, eye-catching like a brake light
```

### Accent - Precision
```
CONCEPT: Cool chrome / brushed steel
ASSOCIATIONS:
- Professional Snap-On tools
- Workshop table surface
- Polished aluminum wheels
- Precision, cleanliness, professionalism
- Metallic shine in light

USAGE:
- Element borders
- Section dividers
- Tool icons
- Subtle card gradients
- "Metallic" shine effects

INTENSITY: Cool, metallic, elegant
```

### Tertiary - Digital Energy
```
CONCEPT: Neon yellow like an RPM indicator
ASSOCIATIONS:
- Glowing digits on speedometer
- Yellow zone on tachometer before red-line
- Premium warning lights
- Energy, readiness, alertness

USAGE:
- Animated counters
- Progress indicators
- Subtle accents on dark backgrounds
- "Digital" elements

INTENSITY: Bright, electric, but used sparingly
```

### Backgrounds
```
MAIN BACKGROUND - LIGHT MODE:
- Very light gray with brushed aluminum texture
- Subtle carbon weave pattern
- Clean, professional, premium

MAIN BACKGROUND - DARK MODE:
- Deep black with carbon fiber texture
- Subtle diagonal weave pattern
- NOT flat black - should have depth and texture

ACCENT SECTION BACKGROUNDS:
- Dark: Gradient from black to very dark red (barely visible)
- Light: Gradient from white to very light gray

CARD BACKGROUNDS:
- Glass effect with red glow on dark
- Matte white with chrome border on light
- "Floating" effect above background
```

### Semantic Colors
```
SUCCESS: Race flag green - clean, clear "GO!"
WARNING: Yellow flag - caution, careful
ERROR: Red flag - stop, problem
INFO: Blue like OBD diagnostic light
```

---

## TYPOGRAPHY

### Fonts
```
HEADLINES:
- Style: Aggressive, angular, motorsport
- Inspiration: Orbitron, Audiowide, Rajdhani, Exo 2
- Features: Futuristic but readable, techno-feel
- Letter-spacing: Slightly expanded, uppercase on H1
- Weight: Extra Bold / Black

BODY TEXT:
- Style: Geometric, modern, readable
- Inspiration: Barlow, Titillium Web, Exo 2, Rajdhani
- Features: Excellent readability, slightly technical vibe
- Weight: Regular for body, Medium for emphasis

NUMBERS / STATISTICS:
- Style: Racing / Dashboard feel
- Inspiration: Orbitron, DS-Digital, Racing Sans One
- Features: Like digits on a speedometer
- Weight: Bold, monospace proportions
- Feature: Tabular numbers for counters

CTA BUTTONS:
- Style: Bold, uppercase, tracking wide
- Inspiration: Pit board / racing signage
- Features: Strong, confident, commanding
```

### Hierarchy
```
H1: Racing headline - Very large, uppercase, can have red accent
H2: Section titles - Bold, with accent (red line underneath)
H3: Card titles - Semibold, technical feel
Body: Standard text - Regular, high line-height for readability
Small: Technical data - Light, monospace feel
Numbers: Dashboard-like - Bold, tabular
```

---

## VISUAL EFFECTS (WOW Factor)

### Carbon Fiber Pattern
```
WHERE: Section backgrounds, cards, hero background
HOW:
- Subtle carbon fiber weave pattern
- Diagonal 45° orientation
- Very low opacity (5-8%) so it doesn't overwhelm
- Premium, high-end automotive effect

CSS:
- Background pattern with SVG or CSS gradient
- Animated subtle shimmer on scroll (optional)
```

### Racing Stripes
```
WHERE: Dividers between sections, card accents
HOW:
- Classic racing stripes (2 red lines on black)
- Or single red line with gradient fade
- Direction: Diagonal or horizontal
- Speed, movement effect

VARIANTS:
- Hero: Two parallel lines from top to bottom
- Cards: Red line on left edge
- Sections: Gradient line as separator
```

### Gauge / Speedometer Elements
```
WHERE: Statistics, counters, progress indicators
HOW:
- Circular gauge with number in center
- Partial circle progress (like RPM meter)
- Red "danger zone" at end of scale
- Animation: Needle / number grows to value

ELEMENTS:
- "16 years" as 80% filled gauge
- "4.8" as nearly full circle with stars
- "24h" as clock/dial
- RPM-style counter animation on numbers
```

### Red Glow Effects
```
WHERE: Important buttons, emergency CTA, hover states
HOW:
- Box-shadow with red color, blur 20-30px
- Opacity: 30-50%
- Effect: Like brakes glowing in darkness
- Pulsing for emergency (24h assistance)

INTENSITY:
- CTA buttons: Subtle glow always, intense on hover
- Emergency: Gentle pulse (not annoying)
- Cards: Red glow on left edge on hover
```

### Precision Crosshair / Reticle
```
WHERE: Background decoration in hero, "precision" section
HOW:
- Subtle crosshair / precision target
- Thin lines, very low opacity (3-5%)
- Technical-engineering vibe
- Can be animated (rotation, pulse)

STYLE:
- Concentric circles with scale marks
- Lines crossing at 90°
- Small "calibration" marks
```

### Glass Morphism (Premium variant)
```
WHERE: Service cards, testimonials, navigation
HOW:
- Background: Very dark with 10% opacity
- Blur: Strong (20-32px) for premium feel
- Border: 1px gradient from chrome to transparent
- Effect: Like glass HUD display in car

DETAILS:
- On dark sections: red glow behind card
- On light: chrome/metallic border
- Hover: Increased glow, lift effect
```

### Animations and Interactions
```
RPM COUNTER (Hero stats):
- Numbers grow like on tachometer
- Start from 0, quickly to target
- "Bounce" at end like needle
- Trigger: When element visible

GAUGE FILL (Progress circles):
- Circle fills from 0 to value
- Red zone at end (for high values)
- Smooth easing, 1.5-2s duration

CARD HOVER:
- Lift (translateY -8px) - larger than standard
- Red glow appears / intensifies
- Border changes to red gradient
- Shadow: Increased + red tint
- Transition: Smooth, 0.3s cubic-bezier

BUTTON PULSE:
- 24h emergency button
- Subtle red glow pulse
- Not annoying, but noticeable
- 2s interval

SCROLL REVEAL:
- Fade in + slide from left (motion reference)
- Stagger: Elements appear sequentially
- Faster timing than typical (0.4s) - more dynamic
```

### Decorative Elements
```
RACING LINE DECORATION:
- Red line running through page
- Like brake mark on track
- Subtle, not dominant
- Can have gradient fade at ends

TECHNICAL GRID:
- Subtle engineering grid in background
- Blueprint-style, very low opacity
- Creates precision, planning effect

CHROME DIVIDERS:
- Lines between sections
- Gradient: transparent → chrome → transparent
- Subtle metallic shine

ICONS:
- Style: Line icons, 2px stroke, sharp angles
- Size: 24px standard, 40px featured
- Color: Chrome/red depending on context
- Hover: Fill with red
```

---

## PLACEHOLDER IMAGES

### Hero Background
```
IMAGE: "Night Pit Stop"
DESCRIPTION: Professional workshop at night. Car on lift (BMW or Audi),
lit from below with red light. Mechanic in black overalls
working on wheel. Tool wall on red panels in background.
Smoke/fog for atmosphere. Lighting: dramatic, high contrast.
MOOD: Premium, professional, dramatic
SOURCE: Unsplash/Pexels search: "car workshop night", "automotive garage dark"
OVERLAY: 70% dark gradient for text readability
```

### Workshop Interior
```
IMAGE: "Precision Workspace"
DESCRIPTION: Clean, organized work station. Snap-On tools on
red tool cart. Diagnostic computer on table.
Car partially visible in background. Epoxy floor, gray.
MOOD: Order, professionalism, precision
SOURCE: "professional auto repair shop", "clean garage workshop"
```

### Team Photo
```
IMAGE: "The Crew"
DESCRIPTION: 6-8 mechanics in black overalls with red accents.
Standing in front of workshop, arms crossed or holding tools.
Lighting: natural daylight + workshop lights from behind.
Smiling but professional.
MOOD: Team, competence, trust
ALTERNATIVE: Individual photos of each team member, consistent style
```

### Diagnostic Equipment
```
IMAGE: "Tech Edge"
DESCRIPTION: Modern diagnostic equipment. Laptop with OBD software,
cables connected to car. Screen showing technical data.
Blue/red screen light reflecting on metal parts.
MOOD: Technology, modernity, diagnostic precision
SOURCE: "car diagnostic computer", "automotive scan tool"
```

### Service Action Shots
```
IMAGE 1: "Brake Service"
DESCRIPTION: Close-up on red Brembo brake calipers during replacement.
Mechanic's hands in black gloves. Detail on precision work.

IMAGE 2: "Engine Bay"
DESCRIPTION: Open engine, mechanic with diagnostics. Chrome elements,
clean cables. Focus on professionalism.

IMAGE 3: "Wheel Alignment"
DESCRIPTION: Car on 3D alignment machine. Red laser targets.
Technological vibe, measurement precision.

IMAGE 4: "Under the Hood"
DESCRIPTION: Dramatic shot from below car on lift.
Mechanic working on suspension. Red/warm work light.
```

### Atmosphere/Detail Shots
```
IMAGE: "Tool Wall"
DESCRIPTION: Wall with tools, perfect order. Wrenches sorted
by size. Red/black panel background. Every tool in its place.
MOOD: Organization, professionalism, attention to detail

IMAGE: "Clean Floor"
DESCRIPTION: Epoxy workshop floor, perfectly clean. Partially
visible car wheels. Light reflections on surface.
MOOD: Cleanliness, premium, customer respect

IMAGE: "Night Sign"
DESCRIPTION: "Ultra Mechanic" sign lit by red neon at night.
Rain or wet pavement for reflections.
MOOD: Recognition, 24h availability, modernity
```

---

## PAGE STRUCTURE

### NAVIGATION (Header)
```
STYLE: Sticky, premium glass morphism, dark
HEIGHT: 70-80px (larger than standard = premium feel)
LOGO: Left side, "Ultra Mechanic" in racing font + red accent

MENU ITEMS:
1. Home
2. Services (can have dropdown with categories)
3. About Us
4. Reviews
5. Contact

CTA IN NAVIGATION:
- "CALL" - red button with pulsing glow
- Phone number visible on desktop
- Phone icon on mobile

EFFECTS:
- Blur increases on scroll
- Red bottom border (1px) appears after scroll
- Logo can have hover animation
```

---

## HOME PAGE

### SECTION 1: Hero
```
BLOCK: GlassHero

LAYOUT:
- Full viewport height (100vh)
- Split layout: Content (60%) | Visual (40%)
- Or centered with background

BACKGROUND:
- Night workshop photo
- Dark overlay (70-80%)
- Carbon fiber pattern overlay (5% opacity)
- Racing stripe accent (red diagonal line)

HEADLINE:
"PRECISION. POWER. TRUST."
- Uppercase, racing font
- Very large (48-64px mobile, 72-96px desktop)
- Red accent on one word (e.g., "POWER")
- Animation: Each word appears separately

SUBHEADLINE:
"Professional Car Service in Wroclaw"
- Smaller font, regular weight
- Chrome/silver color
- Below: "16 years • 4.8/5 Google • 127+ customers" with icons

STATS ROW (below headline):
Three gauge indicators:
- [GAUGE] "16" years of experience
- [GAUGE] "4.8" Google rating
- [GAUGE] "24h" roadside assistance
Animated counter + gauge fill

PRIMARY CTA:
"BOOK APPOINTMENT"
- Large button, red gradient
- Uppercase, tracking wide
- Icon: Calendar or arrow
- Hover: Red glow intensifies

SECONDARY CTA:
"24h EMERGENCY: 600 123 456"
- Outline button with red border
- Pulsing glow (subtle)
- Click-to-call
- Icon: Phone

DECORATIVE ELEMENTS:
- Subtle racing stripes in background
- Technical grid overlay (very low opacity)
- Precision crosshair decoration in corner
```

### SECTION 2: Trust Indicators (Speed Stats)
```
BLOCK: Features (compact racing variant)

LAYOUT:
- 4 columns, full width
- Dark background with carbon fiber texture
- Each stat is a "gauge card"

ELEMENTS (with gauge animations):
1. RPM Gauge: "16+" years in business
2. Speed Gauge: "127+" satisfied customers
3. Star Gauge: "4.8" average rating
4. Clock Gauge: "24/7" roadside assistance

STYLE:
- Each element is a circular gauge with number
- Animated progress circle
- Red "hot zone" at end
- Number animates like tachometer
- Label below in chrome color

EFFECT: Like instrument panel in a car
```

### SECTION 3: Services (Grid)
```
BLOCK: Features

LAYOUT:
- Centered section headline
- Grid 3x2 (desktop), 2x3 (tablet), 1x6 (mobile)
- Light background for contrast (or cards on dark)

HEADLINE:
"FULL RANGE OF SERVICES"
- Red line under text
- Subheadline: "One workshop - all your car's needs"

SERVICE CARDS (6):
1. COMPUTER DIAGNOSTICS
   - Icon: Monitor/chip
   - Description: "Professional error reading for all makes"
   - Accent: Red line on left

2. ENGINE & DRIVETRAIN
   - Icon: Engine/cog
   - Description: "Engine repairs, timing, turbo"

3. BRAKES & SUSPENSION
   - Icon: Brake disc
   - Description: "Pads, discs, shocks, alignment"

4. AIR CONDITIONING
   - Icon: Snowflake
   - Description: "Recharge, repair, sanitizing"

5. TIRE SERVICE
   - Icon: Tire/wheel
   - Description: "Change, balancing, storage"

6. 24h ROADSIDE ASSISTANCE
   - Icon: Tow truck
   - Description: "Towing within 50km"
   - HIGHLIGHTED: Red background, pulsing

CARD STYLE:
- Glass effect on dark / white shadow on light
- Red left edge (racing stripe)
- Chrome icon, changes to red on hover
- Hover: Lift + red glow + scale(1.02)

CTA BELOW GRID:
"VIEW ALL SERVICES →"
- Red color link
- Animated arrow on hover
```

### SECTION 4: Why Ultra Mechanic
```
BLOCK: Content + Features hybrid

LAYOUT:
- Dark background
- 2 columns or 4 cards
- Racing stripe divider on top

HEADLINE:
"WHY CUSTOMERS CHOOSE US?"
- "CHOOSE" in red

FEATURES (4 cards):
1. HONEST PRICES
   - Icon: Price tag / coins
   - "You know the price before repair. No hidden fees."
   - Detail: "Quote sent via SMS before every service"

2. EXPRESS SERVICE
   - Icon: Lightning / stopwatch
   - "Most repairs done same day."
   - Detail: "Pit-stop efficiency"

3. QUALITY WARRANTY
   - Icon: Shield / checkmark
   - "12 month warranty on services and parts."
   - Detail: "OEM parts or premium aftermarket"

4. EXPERIENCE
   - Icon: Trophy / medal
   - "16 years and thousands of repaired cars."
   - Detail: "Certified VAG, BMW, Mercedes specialists"

STYLE:
- Large icons (48px) in red
- Glass cards with chrome border
- Hover: Icon scale + slight rotate
- Counter for experience ("16" animated)
```

### SECTION 5: Reviews
```
BLOCK: Testimonials

LAYOUT:
- Light background
- Carousel with 3 reviews (desktop), 1 (mobile)
- Prominent Google badge

HEADLINE:
"WHAT CUSTOMERS SAY"
- Google logo + "4.8/5 from 127 reviews"
- 5 stars in red

TESTIMONIALS (3):
Each card:
- 5 stars on top (red filled)
- Quote in quotation marks (decorative " in red)
- First name and last initial
- Review date
- Small Google icon

STYLE:
- White cards with shadow, rounded corners
- Red quote mark decoration (40px, 20% opacity)
- Smooth slide transition
- Chrome arrows, hover red

TRUST BADGE BELOW CAROUSEL:
- "Check us on Google Maps →"
- Google logo + stars
```

### SECTION 6: Final CTA
```
BLOCK: ContactCTA

LAYOUT:
- Dark background with gradient red accent
- Centered content
- Racing stripes as decoration

HEADLINE:
"DOES YOUR CAR NEED HELP?"
- Large, bold

SUBHEADLINE:
"Call now or leave your number - we'll call back in 15 minutes"

CTA BUTTONS:
1. PRIMARY: "CALL: 71 123 45 67"
   - Large red button
   - Phone icon
   - Red glow
   - Click-to-call

2. SECONDARY: "LEAVE YOUR NUMBER"
   - Outline button
   - Form modal trigger
   - Message icon

EMERGENCY BANNER (below buttons):
"24/7 EMERGENCY: 600 123 456"
- Highlighted box with pulsing red border
- Tow truck icon
- Always visible, section accent

HOURS QUICK INFO:
- Day icons + hours in single line
- Compact, informational
```

---

## SERVICES PAGE

### Structure
```
HERO (compact):
- "OUR SERVICES"
- Subheadline: "Complete service for all makes"
- Decorative red line

SERVICE PRICING:
- Accordion or cards grid
- Categories: 7 sections (as in PAGE_DESCRIPTION)
- Each service: name + short description + "from XX PLN" + time

STYLE:
- Light background, white cards
- Category = header with icon
- Prices in red, bold
- Time in chrome/gray

CTA:
"Didn't find your service? Call us!"
```

---

## ABOUT US PAGE

### Structure
```
HERO:
- "ABOUT ULTRA MECHANIC"
- Team or workshop photo

SECTION: History
- Timeline: 2008 → today
- Milestone cards with dates
- Counters: Cars repaired, years, customers

SECTION: Team
- Grid of photos/avatars
- Each person: Name, position, specialization
- Hover: Expanded with experience

SECTION: Workshop
- Gallery slider with photos
- Equipment and certifications
- Premium equipment badges

SECTION: Values
- 3-4 values in racing card style
- Icons + short descriptions
```

---

## REVIEWS PAGE

### Structure
```
HERO:
- "CUSTOMER REVIEWS"
- Big stats: 4.8/5 • 127 reviews • 94% recommend
- Prominent Google badge

FILTERS:
- All / 5 stars / 4+ stars
- Sort: Newest / Highest

REVIEWS LIST:
- Cards grid or list
- All 6 Google reviews (from PAGE_DESCRIPTION)
- Owner responses in different color

CTA:
"Been to our shop? Rate us on Google!"
- Google icon + link
```

---

## CONTACT PAGE

### Structure
```
LAYOUT: 2 columns - Form | Info + Map

FORM:
- Fields: Name, Phone (required), Email, Car Make, Service (select), Message
- Button: "SEND INQUIRY" - red
- GDPR checkbox

INFO:
- Address with Google Maps link
- Main phone (click-to-call, red highlight)
- Emergency phone (pulsing)
- Email
- Hours (table)

MAP:
- Google Maps embed
- Custom red marker
- Link: "Navigate to workshop"

EMERGENCY BANNER:
- Top or bottom
- "24h EMERGENCY" box
```

---

## FOOTER

### Structure
```
LAYOUT: 4 columns + bottom bar
STYLE: Dark background with carbon texture

COLUMN 1: Brand
- Ultra Mechanic logo
- Tagline: "Precision. Power. Trust."
- Social icons (red on hover)

COLUMN 2: Menu
- Quick links to pages

COLUMN 3: Services
- Top 6 services as links

COLUMN 4: Contact
- Address, phone, email, hours
- Emergency phone highlighted

BOTTOM BAR:
- Copyright
- Privacy policy
- "Made by [agency]"
- Racing stripe thin line on top
```

---

## RESPONSIVE DESIGN

### Breakpoints
```
MOBILE: < 640px
- Single column layouts
- Hamburger menu with full-screen overlay
- Smaller gauge elements
- Touch-friendly (48px min touch targets)
- Sticky "Call" button at bottom

TABLET: 640px - 1024px
- 2-column grids
- Reduced animations
- Simplified gauges

DESKTOP: > 1024px
- Full layouts
- All animations active
- Hover effects enabled
```

### Mobile-First Priorities
```
- Click-to-call prominent
- Emergency number always visible
- Quick access to form
- Opening hours easily accessible
- Map with navigation
```

---

## ACCESSIBILITY

### Requirements
```
- Contrast ratio: AA minimum (4.5:1 for text)
- Red tested on both dark and light backgrounds
- Alt text on all images
- Full keyboard navigation
- Visible focus indicators (red)
- Reduced motion: Disable animations
- Screen reader friendly
```

---

## PERFORMANCE

### Optimizations
```
- Lazy loading for images and backgrounds
- Animations use transform/opacity only
- will-change for gauge animations
- Preload critical fonts
- Reduced motion media query honored
- Carbon fiber pattern as CSS, not image
- SVG icons instead of font icons
```

---

## SUMMARY - WOW FACTORS

1. **Racing/Motorsport DNA** - Entire site breathes high-performance
2. **Animated Gauges** - Statistics like on dashboard
3. **Red Glow Effects** - Dramatic, premium accents
4. **Carbon Fiber Textures** - Luxury, automotive feel
5. **Precision Typography** - Racing fonts = instant industry recognition
6. **Racing Stripes** - Dynamics and movement in static elements
7. **Emergency Pulse** - 24h assistance draws attention without irritation
8. **Counter Animations** - Numbers grow like RPM = engagement
9. **Chrome/Steel Accents** - Authenticity, professionalism
10. **Technical Grid Overlays** - Engineering precision
