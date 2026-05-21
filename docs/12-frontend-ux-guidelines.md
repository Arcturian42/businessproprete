# Frontend UX/UI Guidelines

## Design Principles

1. **Content-first** — The design serves the content, never the reverse. Typography and whitespace > decoration.
2. **B2B professional** — Clean, credible, serious. No playful illustrations, no bright gradients, no consumer-style patterns.
3. **Data-readable** — Tables, numbers, and statistics must be instantly scannable. Monospace for data, clear hierarchy.
4. **Trust signals everywhere** — Dates, sources, author credentials, review counts, verification badges.
5. **Conversion-optimized** — CTAs are prominent but not intrusive. Contextual, relevant, timely.

## Color System

### Primary Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary-900` | `#0C4A6E` | Dark headers, emphasis |
| `--color-primary-800` | `#075985` | H1, primary buttons (hover) |
| `--color-primary-700` | `#0369A1` | Primary buttons, links |
| `--color-primary-600` | `#0284C7` | Links (hover), secondary buttons |
| `--color-primary-500` | `#0EA5E9` | Accents, highlights |
| `--color-primary-100` | `#E0F2FE` | Light backgrounds, badges |
| `--color-primary-50` | `#F0F9FF` | Subtle backgrounds |

### Neutral Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-gray-950` | `#030712` | Body text |
| `--color-gray-900` | `#111827` | Headings |
| `--color-gray-700` | `#374151` | Secondary text |
| `--color-gray-500` | `#6B7280` | Tertiary text, captions |
| `--color-gray-300` | `#D1D5DB` | Borders |
| `--color-gray-200` | `#E5E7EB` | Light borders |
| `--color-gray-100` | `#F3F4F6` | Backgrounds |
| `--color-gray-50` | `#F9FAFB` | Subtle backgrounds |

### Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-success-600` | `#16A34A` | Verified badge, positive score |
| `--color-success-50` | `#F0FDF4` | Success background |
| `--color-warning-600` | `#CA8A04` | Medium score, caution |
| `--color-warning-50` | `#FEFCE8` | Warning background |
| `--color-danger-600` | `#DC2626` | Error states, low score |
| `--color-danger-50` | `#FEF2F2` | Error background |

### CTA Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-cta` | `#D97706` | Primary CTA buttons (amber stands out from blue) |
| `--color-cta-hover` | `#B45309` | CTA hover state |
| `--color-cta-light` | `#FFFBEB` | CTA background tints |

**Why amber for CTAs?** The site is predominantly blue (trust, professionalism). Amber/orange is complementary, draws attention without being aggressive like red. It's the "action" color.

## Typography

### Font Stack

| Purpose | Font | Weight | Size Scale |
|---|---|---|---|
| **Headings** | Inter (Google Fonts) | 600, 700 | See below |
| **Body** | Inter | 400, 500 | 16px-18px |
| **Data/Monospace** | JetBrains Mono (Google Fonts) | 400, 600 | 14px-16px |

### Type Scale

| Element | Size | Weight | Line Height | Color |
|---|---|---|---|---|
| H1 (page title) | 32px / 2rem | 700 | 1.2 | gray-900 |
| H1 (hero) | 40px / 2.5rem | 700 | 1.15 | gray-900 |
| H2 | 24px / 1.5rem | 600 | 1.3 | gray-900 |
| H3 | 20px / 1.25rem | 600 | 1.35 | gray-900 |
| H4 | 18px / 1.125rem | 600 | 1.4 | gray-700 |
| Body | 16px / 1rem | 400 | 1.7 | gray-950 |
| Body large | 18px / 1.125rem | 400 | 1.7 | gray-950 |
| Caption | 14px / 0.875rem | 400 | 1.5 | gray-500 |
| Small | 12px / 0.75rem | 500 | 1.4 | gray-500 |
| Data large | 48px / 3rem | 700 | 1 | primary-700 |
| Data medium | 32px / 2rem | 600 | 1.1 | gray-900 |

**Responsive:** H1 reduces to 28px on mobile, H2 to 22px.

### Special: BLUF Typography

The BLUF (first 50 words) uses Body Large (18px) with a left border accent:

```
│ En 2025, le salaire minimum d'un agent de nettoyage en France
│ est de 11,83 € brut/heure pour un débutant, selon la convention
│ collective IDCC 3043...
```

## Layout System

### Grid

```
Desktop (≥1024px):  12-column grid, max-width 1280px, gutter 24px
Tablet (≥768px):    8-column grid, full width, gutter 20px
Mobile (<768px):    4-column grid, full width, gutter 16px
```

### Page Layout Structure

```
┌──────────────────────────────────────────────────────────┐
│ [Header — fixed on scroll up, hidden on scroll down]     │
├──────────────────────────────────────────────────────────┤
│ [Breadcrumb — desktop only]                              │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────┐ ┌──────────────────────┐       │
│  │                     │ │                      │       │
│  │   MAIN CONTENT      │ │   SIDEBAR (desktop)  │       │
│  │   (8 cols / 66%)    │ │   (4 cols / 33%)     │       │
│  │                     │ │                      │       │
│  │   • Article         │ │   • Sticky TOC       │       │
│  │   • Tool            │ │   • CTA boxes        │       │
│  │   • Comparison      │ │   • Related content  │       │
│  │   • Directory       │ │   • Newsletter       │       │
│  │                     │ │   • Trust badges      │       │
│  │                     │ │                      │       │
│  └─────────────────────┘ └──────────────────────┘       │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ [Newsletter band — full width]                           │
├──────────────────────────────────────────────────────────┤
│ [Footer]                                                 │
└──────────────────────────────────────────────────────────┘
```

### Sidebar (Desktop Only)

On article/guide pages, the right sidebar contains:
1. **Table of Contents** — sticky, highlights current section
2. **CTA Box** — contextual lead magnet
3. **Trust indicator** — "Mis à jour le [date] · Vérifié par [expert]"
4. **Related articles** — 3 cards

On mobile: TOC becomes collapsible at top of article. CTA appears inline after BLUF and at end.

## Component Specifications

### Header

- **Height:** 64px desktop, 56px mobile
- **Background:** white with bottom border (gray-200)
- **Logo:** Left-aligned, SVG, ~140px wide
- **Nav:** Center, 6 items (Guides, Logiciels, Outils, Annuaire, Études, Villes)
- **CTA:** Right-aligned "Newsletter" button (ghost) + search icon
- **Sticky behavior:** Slides down when scrolling up, hides when scrolling down
- **Mobile:** Hamburger menu with full-screen overlay

### Card (Article / Company / Software)

```
┌──────────────────────────────┐
│ [Image/thumbnail — 16:9]    │  ← Optional, top
├──────────────────────────────┤
│ [Category badge]             │  ← Small, colored
│ Title of the card            │  ← 2 lines max, truncate
│ Excerpt text that describes  │  ← 2-3 lines, gray-700
│ the content in a brief way.  │
│                              │
│ [Author] · [Date] · [Time]  │  ← Caption row
└──────────────────────────────┘
```

- **Border radius:** 8px
- **Border:** 1px solid gray-200
- **Shadow:** none (shadow on hover: sm)
- **Hover:** border → primary-300, slight translateY(-2px)
- **Padding:** 16px

### CTA Box

```
┌──────────────────────────────┐
│ ┌────────────────────────┐   │
│ │  📥 Titre du lead      │   │
│ │     magnet             │   │
│ │                        │   │
│ │  [Email input          │   │
│ │   placeholder]         │   │
│ │                        │   │
│ │  [    RECEVOIR    ]    │   │
│ │                        │   │
│ │  ✓ Gratuit · ✓ Sans    │   │
│ │    engagement          │   │
│ └────────────────────────┘   │
└──────────────────────────────┘
```

- **Background:** amber-50
- **Border:** 1px solid amber-200
- **Border radius:** 12px
- **Button:** Full-width, amber background, white text

### Comparison Table

```
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│ Critère  │ Proprely │ Progiclean│ 2BePragma│ Organilog│
├──────────┼──────────┼──────────┼──────────┼──────────┤
│ Planning │  ★★★★☆   │  ★★★★★   │  ★★★☆☆   │  ★★★★☆   │
│   (20%)  │   8/10   │   10/10  │   6/10   │   8/10   │
├──────────┼──────────┼──────────┼──────────┼──────────┤
│ Agents   │  ★★★★★   │  ★★★★☆   │  ★★★★☆   │  ★★★☆☆   │
│   (15%)  │   10/10  │   8/10   │   8/10   │   6/10   │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

- **Header row:** gray-100 background, sticky on scroll
- **Score column:** Star rating + numeric score
- **Winner highlight:** Primary color background for highest score in row
- **Mobile:** Horizontal scroll with first column sticky

### Score Badge

| Range | Color | Label |
|---|---|---|
| 81-100 | `#16A34A` (green) | Excellent |
| 61-80 | `#16A34A` (green) | Bon |
| 41-60 | `#CA8A04` (yellow) | Moyen |
| 21-40 | `#DC2626` (red) | Faible |
| 0-20 | `#DC2626` (red) | À compléter |

### Data Highlight Box

```
┌─────────────────────────────────────────┐
│  📊 EN CHIFFRES                         │
│                                         │
│  21 Md€    15 500    600 000+          │
│  CA total  Entreprises  Emplois         │
│                                         │
│  Source: INSEE, 2024                    │
└─────────────────────────────────────────┘
```

- **Background:** primary-50
- **Border left:** 4px solid primary-500
- **Numbers:** Data large typography (JetBrains Mono)
- **Source caption:** Small text, gray-500

## Responsive Breakpoints

| Name | Width | Behavior |
|---|---|---|
| **Mobile** | < 640px | Single column, stacked layout, hamburger nav |
| **Tablet** | 640px - 1023px | 2 columns where applicable, condensed nav |
| **Desktop** | 1024px - 1279px | Full layout, sidebar visible |
| **Wide** | ≥ 1280px | Max-width container centered |

## Animation & Interactions

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Card hover | translateY(-2px) + border color | 200ms | ease-out |
| Button hover | Background darken + scale(1.02) | 150ms | ease-out |
| Page transition | Fade opacity 0→1 | 300ms | ease-in-out |
| Mobile menu | Slide from right | 250ms | ease-out |
| TOC highlight | Smooth scroll + active state | 100ms | linear |
| Modal/overlay | Fade + scale(0.95→1) | 200ms | ease-out |
| Skeleton loading | Shimmer pulse | 1.5s loop | ease-in-out |

**No animations for:** Content rendering (must be instant for SEO), above-fold elements, data tables.

## shadcn/ui Components to Install

```bash
npx shadcn add button
npx shadcn add card
npx shadcn add input
npx shadcn add table
npx shadcn add badge
npx shadcn add select
npx shadcn add tabs
npx shadcn add accordion
npx shadcn add dialog
npx shadcn add sheet
npx shadcn add separator
npx shadcn add skeleton
npx shadcn add toast
npx shadcn add tooltip
```

## Custom Components (to build)

| Component | Location | Description |
|---|---|---|
| `Breadcrumbs` | `components/layout/breadcrumbs.tsx` | Schema.org + visible HTML |
| `Toc` | `components/content/toc.tsx` | Sticky table of contents |
| `MdxRenderer` | `components/content/mdx-renderer.tsx` | MDX content with custom components |
| `CtaBox` | `components/content/cta-box.tsx` | Contextual lead magnet form |
| `NewsletterForm` | `components/content/newsletter-form.tsx` | Email signup with validation |
| `ComparisonTable` | `components/comparison/comparison-table.tsx` | Software comparison grid |
| `CompanyCard` | `components/directory/company-card.tsx` | Directory listing preview |
| `CompanyDetail` | `components/directory/company-detail.tsx` | Full profile display |
| `SearchFilters` | `components/directory/search-filters.tsx` | Directory search + filters |
| `PriceCalculator` | `components/tools/price-calculator.tsx` | T1: Cleaning price calc |
| `ProfitabilityCalc` | `components/tools/profitability-calc.tsx` | T2: Contract margin calc |
| `QuoteGenerator` | `components/tools/quote-generator.tsx` | T3: Quote generator |
| `CityHero` | `components/local/city-hero.tsx` | City page header with stats |
| `CompanyMap` | `components/local/company-map.tsx` | Interactive Leaflet map |
| `SchemaOrg` | `components/seo/schema-org.tsx` | JSON-LD schema renderer |
| `MetaTags` | `components/seo/meta-tags.tsx` | Dynamic head metadata |
