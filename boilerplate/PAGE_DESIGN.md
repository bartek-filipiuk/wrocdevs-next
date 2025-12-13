# Visual Design Specification

> **IMPORTANT FOR CLAUDE CODE:**
> This file may contain CREATIVE COLOR DESCRIPTIONS instead of hex values.
> You MUST INTERPRET these descriptions and generate actual HSL values.
> See SETUP_PROMPT.md "Step 0: Color Generation" for instructions.

Fill out this template to define your website's visual style. You can use either:
- **Creative descriptions** (recommended) - Let Claude Code interpret the mood and generate colors
- **Hex codes** - If you have specific brand colors

---

## Color Scheme

### Color Philosophy (Optional but Recommended)

Describe the overall feeling, mood, or inspiration for your color palette:

```
INSPIRATION: [What mood/feeling should the colors evoke?]
Examples:
- Warm and welcoming like a cozy cafe
- Professional and trustworthy like a law firm
- Energetic and modern like a tech startup
- Natural and organic like an eco-friendly brand
```

### Primary Color
*Main brand color - used for CTAs, buttons, key highlights*

**Option A - Creative Description:**
```
CONCEPT: [Describe the color feeling, associations, mood]
ASSOCIATIONS: [What does this color remind you of? List 3-5 things]
INTENSITY: [Vibrant/Muted/Deep/Light/etc.]
```

**Option B - Hex Code:**
Primary: #[hex code]
Primary Foreground: #[hex code for text on primary]

### Secondary Color
*Supporting accent color - used for secondary actions, highlights*

**Option A - Creative Description:**
```
CONCEPT: [Describe the color feeling]
ASSOCIATIONS: [What does this color remind you of?]
USE CASES: [Where should this color appear?]
```

**Option B - Hex Code:**
Secondary: #[hex code]
Secondary Foreground: #[hex code]

### Accent Color
*Special highlights and decorative elements*

**Option A - Creative Description:**
```
CONCEPT: [Describe the color feeling]
ASSOCIATIONS: [What does this color remind you of?]
INTENSITY: [How bold/subtle should it be?]
```

**Option B - Hex Code:**
Accent: #[hex code]
Accent Foreground: #[hex code]

### Background Colors

**Light Mode:**
```
MAIN BACKGROUND: [Describe - e.g., "Pure white", "Warm cream", "Cool off-white"]
CARD/SECTION BACKGROUNDS: [Describe - e.g., "Slightly darker than main"]
```

**Dark Mode:**
```
MAIN BACKGROUND: [Describe - e.g., "Deep charcoal", "True black", "Navy night"]
CARD/SECTION BACKGROUNDS: [Describe - e.g., "Slightly lighter than main"]
```

### Semantic Colors (Optional)
*Success, warning, error states - leave blank for defaults*

```
SUCCESS: [Describe or hex - e.g., "Fresh green", "Growth color"]
WARNING: [Describe or hex - e.g., "Attention amber", "Caution yellow"]
ERROR: [Describe or hex - e.g., "Alert red", "Danger signal"]
```

---

## Typography

### Font Preferences

**Heading Font:** [Font name, e.g., Inter, Poppins, Oswald, Space Grotesk]
- Style: [Modern, Classic, Elegant, Bold, Industrial]

**Body Font:** [Font name, e.g., Inter, Open Sans, Roboto, Source Sans Pro]
- Style: [Clean, Readable, Professional, Friendly]

### Font Weights

**Headings:** [e.g., Bold (700), Semibold (600)]
**Body text:** [e.g., Regular (400)]
**CTAs/Buttons:** [e.g., Bold, Uppercase, etc.]

---

## Visual Style

### Overall Mood

Choose or describe:
- [ ] Modern & Clean
- [ ] Warm & Inviting
- [ ] Bold & Dynamic
- [ ] Elegant & Sophisticated
- [ ] Playful & Creative
- [ ] Minimal & Professional
- [ ] Tech & Futuristic
- [ ] Industrial & Strong
- [ ] Other: [describe]

### Design Elements

**Border Radius:**
- [ ] Sharp (0px)
- [ ] Subtle (4px)
- [ ] Medium (8px)
- [ ] Rounded (16px)
- [ ] Pill shape for buttons

**Shadows:**
- [ ] None
- [ ] Subtle
- [ ] Medium
- [ ] Prominent
- [ ] Colored/Glow

---

## Effects

### Glass Morphism

**Use Glass Effects:** [ ] Yes / [ ] No

If yes:
- **Where:** [Hero, Cards, Navigation, etc.]
- **Intensity:** [Light/Medium/Strong blur]
- **Background:** [Primary color with low opacity]

### Gradients

**Use Gradients:** [ ] Yes / [ ] No

If yes:
- **Main Gradient:** [From primary to secondary/accent]
- **Direction:** [Diagonal 135deg, Horizontal, Vertical, Radial]
- **Where:** [Backgrounds, Buttons, Text]

### Animations

**Animation Level:**
- [ ] Minimal (essential transitions only)
- [ ] Moderate (hover effects, smooth transitions)
- [ ] Dynamic (floating elements, parallax, particles)

---

## Dark Mode

**Support Dark Mode:** [ ] Yes / [ ] No

If yes, describe any specific preferences:
```
[e.g., "Should feel like a premium night mode, not just inverted colors"]
```

---

## Page Structure (Optional)

If you have specific layout requirements, describe them here. See example files in `/examples/` for detailed page structure templates.

---

## Inspiration / References

List websites or brands whose visual style you admire:

1. [URL or brand] - [What you like about it]
2. [URL or brand] - [What you like about it]

---

## Additional Notes

[Any other visual requirements or preferences]

---

## How Claude Code Uses This File

1. **Color Interpretation**: Claude Code reads your color descriptions/hex codes and generates HSL values for `theme.css`
2. **No defaults**: Every color MUST be explicitly generated - Claude Code will NOT use the default blue theme
3. **Both modes supported**: Creative descriptions OR hex codes work equally well

### CSS Variable Mapping

| This file | CSS Variable |
|-----------|--------------|
| Primary | `--primary` |
| Secondary | `--secondary` |
| Accent | `--accent` |
| Background | `--background` |
| Success | `--success` |
| Warning | `--warning` |
| Error | `--error` / `--destructive` |
