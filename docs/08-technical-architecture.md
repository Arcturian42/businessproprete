# Technical Architecture

## Stack Overview

| Layer | Technology | Justification |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | SSR/SSG for SEO, React ecosystem, Vercel optimization |
| **Language** | TypeScript | Type safety, developer experience, maintainability |
| **Styling** | Tailwind CSS | Utility-first, rapid development, small bundle |
| **Components** | shadcn/ui | Accessible, customizable, Tailwind-native |
| **Database** | Supabase PostgreSQL | Managed Postgres, real-time, Row Level Security, generous free tier |
| **Storage** | Supabase Storage | Images, PDFs, tool exports |
| **Auth** | Supabase Auth | Built-in auth, OAuth providers, RGPD-friendly |
| **CMS** | MDX (content) + Supabase (dynamic data) | MDX for editorial, DB for directory/tools/comparisons |
| **Hosting** | Vercel | Edge network, automatic preview deployments, Next.js optimization |
| **Analytics** | Vercel Analytics + GA4 | Performance + business metrics |
| **Email** | Brevo (Sendinblue) | Free tier 300 emails/day, French company, good deliverability |
| **Search** | In-site: client-side (MiniSearch) / External: Algolia (V2 if needed) | MiniSearch is lightweight for <1,000 pages |

## Why This Stack

### Next.js App Router

- **Server Components by default** — No JS bundle for static content, better Core Web Vitals
- **SSR/SSG flexibility** — Articles = SSG (revalidated), Directory = SSR (dynamic), Tools = client hydration
- **File-based routing** — Clean URL structure matching our sitemap
- **Image optimization** — Built-in next/image with WebP/AVIF, lazy loading, responsive sizes
- **Font optimization** — Built-in next/font for zero-layout-shift fonts
- **Metadata API** — Programmatic meta tags, OpenGraph, Twitter cards per page

### Supabase over Vercel Postgres or other

- **Free tier generous** — 500MB database, 1GB storage, 2M edge function invocations/month
- **Row Level Security** — Fine-grained access control without backend code
- **Real-time subscriptions** — If needed for live features (V2)
- **PostGIS extension** — For geographic queries (directory radius search)
- **Type generation** — supabase-js generates TypeScript types from schema
- **French hosting option** — GDPR-friendly

### MDX over a headless CMS (for editorial content)

- **Version control** — Content lives in Git, reviewable, rollback-able
- **No CMS dependency** — No Strapi/Contentful/Sanity to manage, update, secure
- **Component embedding** — React components directly in MDX (calculators, charts, callouts)
- **Free** — No monthly CMS cost
- **V2 migration path** — If CMS needed later, content can be batch-exported to any CMS

**Trade-off:** MDX requires developer involvement to publish. For MVP with 20-30 articles, this is acceptable. For daily publishing at scale, a CMS addition (Strapi or Sanity) is a V2 option.

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  React Server │  │   Client JS   │  │   Interactive Tools   │   │
│  │  Components   │  │  (Hydration)  │  │   (Calculators)       │   │
│  │  (Static HTML)│  │               │  │                       │   │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬────────────┘   │
│         │                  │                      │                │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────────┴────────────┐   │
│  │  next/font    │  │  next/image  │  │  React State + Fetch  │   │
│  │  Tailwind CSS │  │  Lazy load   │  │  (Client components)  │   │
│  └───────────────┘  └──────────────┘  └───────────────────────┘   │
└──────────────────────────────┬─────────────────────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │   VERCEL EDGE       │
                    │   (CDN + Functions) │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
      ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
      │  SSR Pages    │ │  SSG Pages   │ │  API Routes  │
      │  (Dynamic)    │ │  (Static)    │ │  (Serverless)│
      │               │ │              │ │              │
      │  /annuaire/*  │ │  /guides/*   │ │  /api/search │
      │  /[ville]/*   │ │  (reval.)    │ │  /api/lead   │
      │  /logiciels/* │ │              │ │  /api/tool   │
      └──────┬───────┘ └──────────────┘ └──────┬───────┘
             │                                   │
             └────────────────┬──────────────────┘
                              │
                    ┌─────────┴──────────┐
                    │   SUPABASE         │
                    │                    │
                    │  ┌──────────────┐  │
                    │  │  PostgreSQL   │  │
                    │  │  + PostGIS    │  │
                    │  └──────────────┘  │
                    │  ┌──────────────┐  │
                    │  │    Storage   │  │
                    │  │  (Images/PDFs)│ │
                    │  └──────────────┘  │
                    │  ┌──────────────┐  │
                    │  │     Auth     │  │
                    │  │  (RLS rules) │  │
                    │  └──────────────┘  │
                    └────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ EXTERNAL SERVICES (APIs / Webhooks)                              │
│  Sirene API · Pappers API · Google Business API · Brevo · GA4   │
└──────────────────────────────────────────────────────────────────┘
```

## Rendering Strategy by Page Type

| Page Type | Rendering | Revalidation | Why |
|---|---|---|---|
| Homepage | SSG | 1 hour | Content changes frequently (featured) |
| Hub pages (/guides, /logiciels) | SSG | 24 hours | List of content, changes with new posts |
| Articles (/guides/[slug]) | SSG | 7 days (on-demand via webhook) | Static content, ISR for updates |
| Software pages (/logiciels/[slug]) | SSG | 24 hours | Data changes (reviews, scores) |
| Comparison pages (/comparatifs/[slug]) | SSG | 24 hours | Data changes |
| Tool pages (/outils/[slug]) | SSR | — | Interactive, minimal server work |
| Local pages (/[ville]/societes-nettoyage) | SSR | — | Dynamic data (listings, counts) |
| Directory profiles (/annuaire/[slug]) | SSR | — | Dynamic data (enrichment, reviews) |
| Directory search (/annuaire) | SSR | — | Search queries |
| API routes (/api/*) | Serverless | — | Dynamic responses |

## Database Access Patterns

### Pattern 1: SSG Articles (MDX-based)

Articles are stored as `.mdx` files in the repository, not in the database.

```
/content/
  /guides/
    choisir-societe-nettoyage.mdx
    grille-salaire-proprete-2025.mdx
    ...
  /reglementation/
    idcc-3043-guide-complet.mdx
    ...
  /logiciels/
    proprely.mdx
    ...
```

Build-time: Next.js reads MDX → compiles to HTML → static page.
Update: Commit new/updated MDX → Vercel rebuilds (or on-demand revalidation).

### Pattern 2: Dynamic Data (Database)

Directory, comparisons, tools data, leads — all in Supabase PostgreSQL.

```typescript
// Example: Directory profile query
const { data: company } = await supabase
  .from('companies')
  .select(`
    *,
    city:cities(name, slug),
    reviews:company_reviews(*)
  `)
  .eq('slug', params.slug)
  .single();
```

### Pattern 3: Tool Calculations (Client-side)

Calculators run entirely client-side (React state), no server needed.

```typescript
// Example: Price calculator
const [surface, setSurface] = useState(100);
const [frequency, setFrequency] = useState('daily');
const price = calculateCleaningPrice(surface, frequency); // Pure function
```

### Pattern 4: Lead Capture (API Route)

```
Client form → POST /api/leads → Supabase insert → Brevo API (email) → Response 200
```

## Auth Strategy

### MVP: Minimal Auth

For MVP, full auth (login/register) is **not required**. The only authenticated actions are:

1. **Admin access** — Direct Supabase dashboard or simple admin middleware
2. **Profile claims** — Form submission (no auth required, manual verification)

### Post-MVP Auth (When Needed)

| Feature | Auth Method | When |
|---|---|---|
| User accounts | Supabase Auth (email + OAuth: Google, LinkedIn) | Tool save, profile management |
| Saved calculations | Supabase Auth + DB | When users want history |
| Premium content | Supabase Auth + Stripe | Paid reports/tools |
| Review submission | Supabase Auth (prevent spam) | User reviews on directory |

## File Structure

```
cleanp/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (nav, footer, providers)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles + Tailwind
│   │
│   ├── guides/
│   │   ├── page.tsx              # Guides hub
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Individual guide (MDX renderer)
│   │   └── categorie/
│   │       └── [slug]/
│   │           └── page.tsx      # Category filter
│   │
│   ├── reglementation/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── logiciels/
│   │   ├── page.tsx              # Software hub
│   │   └── [slug]/
│   │       └── page.tsx          # Software detail
│   │
│   ├── comparatifs/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── outils/
│   │   ├── page.tsx              # Tools hub
│   │   └── [slug]/
│   │       └── page.tsx          # Individual tool
│   │
│   ├── etudes/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── annuaire/
│   │   ├── page.tsx              # Directory search + listing
│   │   └── [slug]/
│   │       └── page.tsx          # Company profile
│   │
│   ├── [ville]/
│   │   └── societes-nettoyage/
│   │       └── page.tsx          # Local city page
│   │
│   ├── villes/
│   │   └── page.tsx              # City index
│   │
│   ├── newsletter/
│   │   └── page.tsx
│   │
│   ├── a-propos/
│   │   └── page.tsx
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   ├── search/
│   │   │   └── route.ts          # Search API
│   │   ├── leads/
│   │   │   └── route.ts          # Lead capture
│   │   ├── tools/
│   │   │   └── [slug]/
│   │   │       └── route.ts      # Tool calculation API (if needed)
│   │   └── revalidate/
│   │       └── route.ts          # On-demand ISR webhook
│   │
│   ├── mentions-legales/
│   │   └── page.tsx
│   ├── politique-confidentialite/
│   │   └── page.tsx
│   └── plan-du-site/
│       └── page.tsx
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── header.tsx            # Navigation header
│   │   ├── footer.tsx            # Footer
│   │   ├── mobile-menu.tsx       # Mobile hamburger menu
│   │   └── breadcrumbs.tsx       # Breadcrumb navigation + schema
│   ├── content/
│   │   ├── mdx-renderer.tsx      # MDX content renderer
│   │   ├── toc.tsx               # Table of contents (sticky)
│   │   ├── related-articles.tsx  # Related content cards
│   │   ├── author-bio.tsx        # Author profile display
│   │   ├── cta-box.tsx           # Contextual CTA component
│   │   ├── newsletter-form.tsx   # Email signup form
│   │   └── share-buttons.tsx     # Social sharing
│   ├── directory/
│   │   ├── company-card.tsx      # Directory listing card
│   │   ├── company-detail.tsx    # Full profile display
│   │   ├── search-filters.tsx    # Directory search + filters
│   │   └── claim-form.tsx        # Profile claim form
│   ├── comparison/
│   │   ├── comparison-table.tsx  # Software comparison grid
│   │   ├── criteria-bar.tsx      # Scoring visualization
│   │   └── software-card.tsx     # Software review card
│   ├── tools/
│   │   ├── price-calculator.tsx  # T1: Cleaning price calc
│   │   ├── profitability-calc.tsx# T2: Contract margin calc
│   │   └── quote-generator.tsx   # T3: Quote generator
│   ├── local/
│   │   ├── city-hero.tsx         # City page header with stats
│   │   ├── company-map.tsx       # Interactive map (Leaflet)
│   │   ├── nearby-cities.tsx     # Nearby city links
│   │   └── quote-cta.tsx         # Quote request CTA
│   └── seo/
│       ├── schema-org.tsx        # Schema.org JSON-LD renderer
│       ├── meta-tags.tsx         # Dynamic meta tags
│       └── sitemap-link.tsx      # Sitemap reference
│
├── content/                      # MDX content files
│   ├── guides/
│   ├── reglementation/
│   ├── logiciels/
│   ├── comparatifs/
│   └── etudes/
│
├── lib/                          # Utilities and config
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client (RLS)
│   │   └── admin.ts              # Admin client (bypass RLS)
│   ├── utils/
│   │   ├── seo.ts                # SEO helpers (canonical, etc.)
│   │   ├── schema.ts             # Schema.org generators
│   │   ├── slugify.ts            # URL slug generation
│   │   ├── format.ts             # Number, date, currency formatting
│   │   └── geo.ts                # Geo calculations (distance, etc.)
│   ├── data/
│   │   ├── cities.ts             # Static city data (pilot 10)
│   │   ├── criteria.ts           # Comparison criteria definitions
│   │   └── navigation.ts         # Navigation config
│   └── constants.ts              # App constants
│
├── types/                        # TypeScript types
│   ├── database.ts               # Supabase DB types (generated)
│   ├── content.ts                # MDX frontmatter types
│   ├── directory.ts              # Company/Directory types
│   └── comparison.ts             # Software comparison types
│
├── public/                       # Static assets
│   ├── images/
│   │   ├── logo.svg
│   │   ├── og-default.jpg        # Default OpenGraph image
│   │   ├── authors/              # Author photos
│   │   └── software/             # Software logos
│   ├── fonts/                    # If self-hosting fonts
│   └── favicon.ico
│
├── supabase/
│   └── migrations/               # SQL migrations
│       ├── 001_initial_schema.sql
│       ├── 002_seed_cities.sql
│       └── 003_seed_companies.sql
│
├── scripts/                      # Utility scripts
│   ├── seed-cities.ts            # City data seeding
│   ├── seed-companies.ts         # Company data seeding
│   └── generate-sitemap.ts       # Sitemap generation
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local.example
```

## Performance Targets

| Metric | Target | How |
|---|---|---|
| **TTFB** | < 1.5s | Edge rendering, optimized DB queries |
| **LCP** | < 2.5s | next/image optimization, font preloading, critical CSS |
| **FID/INP** | < 200ms | Minimal client JS, code splitting |
| **CLS** | < 0.1 | next/image sizes, font-display: swap, no layout shifts |
| **FCP** | < 1.8s | Static HTML, critical CSS inline |
| **Page size** | < 500KB (initial) | Code splitting, lazy loading, image optimization |

## Security

| Concern | Implementation |
|---|---|
| **SQL Injection** | Supabase parameterized queries (no raw SQL in app) |
| **XSS** | React auto-escaping, DOMPurify for any HTML rendering |
| **CSRF** | Next.js built-in CSRF protection on API routes |
| **Rate limiting** | Vercel Edge Config or Upstash Redis for API routes |
| **RGPD** | Cookie consent banner, data deletion endpoint, privacy policy |
| **HTTPS** | Vercel automatic SSL |
| **CSP** | Content-Security-Policy headers via Next.js headers config |

## Environments

| Environment | URL | Purpose |
|---|---|---|
| **Production** | https://[domain].fr | Live site |
| **Staging** | https://staging.[domain].fr | Pre-production testing |
| **Preview** | https://[branch]--[project].vercel.app | Per-PR preview |

**Environment variables:**

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Analytics
NEXT_PUBLIC_GA4_ID=

# Email (Brevo)
BREVO_API_KEY=

# APIs (V2)
SIRENE_API_KEY=
PAPPERS_API_KEY=

# Internal
REVALIDATE_TOKEN=          # Secret for on-demand ISR
ADMIN_EMAIL=               # For notifications
```

## Deployment Pipeline

```
Developer pushes to GitHub
  → Vercel builds (npm run build)
    → TypeScript compilation
    → MDX compilation
    → Static generation (SSG pages)
    → Deploy to edge
      → Smoke tests (manual V1, automated V2)
        → Live
```

**Rollback:** Instant via Vercel dashboard (previous deployment) or Git revert + push.

## Testing Strategy

| Type | Tool | Scope | When |
|---|---|---|---|
| Unit tests | Vitest | Utility functions, calculations | Pre-commit |
| Component tests | Testing Library | React components in isolation | Pre-commit |
| E2E tests | Playwright | Critical user flows | Pre-deploy |
| SEO tests | Manual + Screaming Frog | Structured data, meta tags, broken links | Weekly |
| Performance tests | Lighthouse CI | Core Web Vitals | Every deploy |
| Accessibility | axe-core | WCAG 2.1 AA compliance | Pre-commit |
