# Claude Code — Execution Plan

## Role

You are the lead developer implementing CleanP (proprety-business / clean-p), a B2B media-data platform for the professional cleaning industry in France. You have read all the documentation files in `/docs`. Your job is to build the MVP step by step.

## What You've Read

You have read and understood:
- `00-project-overview.md` — Project identity, stats, vocabulary
- `01-vision-positioning.md` — Vision, positioning, success criteria
- `02-icp-audience.md` — Target personas, search intents, user flows
- `03-business-ecosystem.md` — Relations with Proprely & Réseau Propreté, monetization
- `04-product-modules-mvp.md` — Modules, MVP features, pages required
- `05-site-architecture.md` — Sitemap, URL structure, navigation, templates
- `06-seo-strategy.md` — Topic clusters, keywords, local SEO, netlinking
- `07-geo-content-strategy.md` — GEO optimization, content templates, anti-slop rules
- `08-technical-architecture.md` — Stack, rendering strategy, file structure
- `09-database-schema.md` — Complete SQL schema, tables, indexes, RLS
- `10-directory-data-strategy.md` — Data sources, import process, RGPD
- `11-lead-magnets-conversion.md` — Funnels, CTAs, lead magnets, tracking
- `12-frontend-ux-guidelines.md` — Design system, colors, typography, components
- `13-seo-technical-impl.md` — Metadata, schema.org, sitemap, technical SEO
- `14-automation-v2-prep.md` — V2 automation prep (do NOT implement now)
- `15-roadmap-90-days.md` — 12-week execution plan with weekly tasks

## CRITICAL RULES

1. **MVP ONLY** — Do NOT build any V2 automation features. No AI content generation, no n8n, no cronjobs, no auto-scraping.
2. **LEAN** — Build only what is needed for the MVP scope defined in `04-product-modules-mvp.md`.
3. **SEO-FIRST** — Every page must be server-rendered, have proper meta tags, and schema.org structured data.
4. **FRENCH ONLY** — All content, URLs, UI text is in French.
5. **NO AUTH WALL** — No login required for any public page. Auth is post-MVP.
6. **QUALITY** — No shortcuts on content quality. Each article must be genuinely useful.

## YOUR TASK — Execute in This Exact Order

### STEP 0: Setup & Validation (Before Coding)

1. Summarize your understanding of the project in 5 bullet points
2. Propose the final tech stack (confirm or challenge the recommended stack)
3. Propose the repo structure based on `08-technical-architecture.md`
4. Identify any questions or blockers before starting

### STEP 1: Project Initialization

```bash
# 1. Initialize Next.js 14+ with App Router
echo "my-app" | npx shadcn@latest init --yes --template next --base-color slate

# 2. Install shadcn components
npx shadcn add button card input table badge select tabs accordion dialog sheet separator skeleton toast tooltip

# 3. Install dependencies
npm install @supabase/supabase-js @supabase/ssr @next/mdx @mdx-js/loader @mdx-js/react next-mdx-remote remark-gfm rehype-slug rehype-autolink-headings react-hook-form zod framer-motion lucide-react
npm install -D @types/node @types/react @types/react-dom typescript tailwindcss postcss autoprefixer

# 4. Setup Supabase client (lib/supabase/client.ts, lib/supabase/server.ts)
# 5. Setup MDX configuration (next.config.js with MDX)
# 6. Configure Tailwind with design tokens from 12-frontend-ux-guidelines.md
# 7. Add Google Fonts (Inter, JetBrains Mono) to layout
```

### STEP 2: Database Setup

1. Create a Supabase project
2. Run migrations in order from `09-database-schema.md`:
   - `001_initial_schema.sql` — All CREATE TABLE
   - `002_enable_rls.sql` — RLS policies
   - `003_triggers.sql` — Triggers
   - `004_search_functions.sql` — Full-text search
3. Seed data:
   - `005_seed_cities.sql` — 10 pilot cities
   - `006_seed_softwares.sql` — 5 software products
4. Verify: You can query cities and softwares from the app

### STEP 3: Core Layout & Navigation

Build the shell of the site:

1. **Root layout** (`app/layout.tsx`):
   - HTML lang="fr"
   - Inter + JetBrains Mono fonts
   - Global styles (Tailwind + custom)
   - Supabase provider
   - Organization schema on homepage
   - WebSite schema on homepage

2. **Header** (`components/layout/header.tsx`):
   - Logo (placeholder text "CleanP" for now)
   - Navigation: Guides, Logiciels, Outils, Annuaire, Études, Villes
   - Mobile hamburger menu (Sheet component)
   - Sticky behavior (hidden on scroll down, shown on scroll up)

3. **Footer** (`components/layout/footer.tsx`):
   - 4-column layout per `05-site-architecture.md`
   - Copyright line with Proprely.fr + ReseauProprete.fr links

4. **Breadcrumbs** (`components/layout/breadcrumbs.tsx`):
   - Visible HTML breadcrumb
   - Schema.org BreadcrumbList JSON-LD
   - Exclude on homepage

### STEP 4: Homepage

Build the homepage (`app/page.tsx`):

1. Hero section: H1 + tagline + CTA newsletter
2. Featured guides section: 3 latest guides
3. Featured tools section: 3 tools with icons
4. Local search: Quick city search dropdown
5. Newsletter band: Email capture
6. Trust signals: Key stats (21 Md€, 15 500 entreprises, 600K emplois)
7. Schema: Organization + WebSite

### STEP 5: MDX Content System

Set up the editorial engine:

1. **MDX configuration**:
   - `next.config.js` with `@next/mdx`
   - Remark plugins: `remark-gfm`
   - Rehype plugins: `rehype-slug`, `rehype-autolink-headings`

2. **Content directory**: `/content/guides/`
   - Create 3 pillar articles as `.mdx` files:
     - `choisir-societe-nettoyage.mdx` — "Comment choisir une société de nettoyage"
     - `grille-salaire-proprete-2025.mdx` — "Grille salariale propreté 2025"
     - `digitaliser-entreprise-nettoyage.mdx` — "Digitaliser son entreprise de nettoyage"

3. **MDX Renderer** (`components/content/mdx-renderer.tsx`):
   - Custom components: h1, h2, h3, p, ul, ol, table, blockquote
   - Data highlight box component
   - CTA box component (inline)
   - FAQ accordion component
   - Auto-generated table of contents

4. **Frontmatter schema**:
   ```yaml
   ---
   title: "Titre de l'article"
   description: "Meta description"
   datePublished: "2025-01-15"
   dateModified: "2025-03-20"
   author: "Nom de l'auteur"
   tags: ["tag1", "tag2"]
   category: "guides"
   readingTime: 12
   ---
   ```

5. **Guide page** (`app/guides/[slug]/page.tsx`):
   - SSG with `generateStaticParams`
   - Full metadata (title, description, OG, Twitter, canonical)
   - Article schema.org
   - TOC sidebar (desktop) / collapsible (mobile)
   - Author bio
   - Related articles
   - Newsletter CTA at bottom
   - FAQPage schema if FAQ section exists

6. **Guides hub** (`app/guides/page.tsx`):
   - List all guides with cards
   - Category filtering
   - Pagination

### STEP 6: Software Comparison Engine

1. **Software detail pages** (`app/logiciels/[slug]/page.tsx`):
   - SSG with `generateStaticParams`
   - Software data from Supabase
   - SoftwareApplication schema
   - Review component (basic star rating)
   - CTA: "Tester [Software]"

2. **Comparison pages** (`app/comparatifs/[slug]/page.tsx`):
   - Comparison grid with all criteria
   - Sortable by criterion
   - ItemList schema
   - Verdict BLUF at top
   - CTA per software row

3. **Logiciels hub** (`app/logiciels/page.tsx`):
   - Grid of all software cards
   - Filter by category
   - Featured/promoted software

### STEP 7: Free Tools

Build 3 interactive tools (client-side React):

1. **Price Calculator** (`components/tools/price-calculator.tsx`):
   - Inputs: locaux type, surface m², fréquence, ville
   - Output: estimated monthly cost with breakdown
   - CTA: email capture for detailed result
   - Schema: SoftwareApplication + HowTo

2. **Profitability Calculator** (`components/tools/profitability-calc.tsx`):
   - Inputs: revenue, hours, agent cost, charges, expenses
   - Output: margin %, cost per hour, profitability verdict
   - CTA: email capture to save

3. **Quote Generator** (`components/tools/quote-generator.tsx`):
   - Inputs: company info, client info, line items
   - Output: HTML preview + PDF download (client-side)
   - CTA: soft Proprely mention

### STEP 8: Directory (Mini)

1. **Directory hub** (`app/annuaire/page.tsx`):
   - Search box (full-text search)
   - Filters: city, specialty
   - Grid of company cards
   - SSR with pagination

2. **Company profile** (`app/annuaire/[slug]/page.tsx`):
   - SSR (dynamic)
   - Full profile display per template in `05-site-architecture.md`
   - LocalBusiness schema
   - Score visibility badge
   - CTA: "Demander un devis" → R.P.
   - CTA: "Réclamer cette fiche"

3. **Seed 50 companies** using the script from `10-directory-data-strategy.md`

### STEP 9: Local Pages (10 Pilot Cities)

1. **Local page template** (`app/[ville]/societes-nettoyage/page.tsx`):
   - SSR (dynamic)
   - City stats (population, company count)
   - Featured companies from DB
   - Map placeholder (Leaflet in V2, static map for MVP)
   - Local pricing guide
   - FAQ section (city-specific)
   - Quote CTA → R.P.
   - Nearby cities links
   - LocalBusiness schema for each company
   - FAQPage schema

2. **City index** (`app/villes/page.tsx`):
   - List of all 10 pilot cities with links
   - Grid layout

3. **Seed company-city associations** in `city_companies` table

### STEP 10: Lead Capture & Conversion

1. **Lead capture form component** (`components/content/lead-capture-form.tsx`):
   - Email + company name + optional fields
   - Contextual CTA text (prop-based)
   - Validation with Zod
   - Submission to `/api/leads`

2. **API route** (`app/api/leads/route.ts`):
   - POST: Validate input, insert to `leads` table, return 200
   - No auth required
   - Rate limiting: 5 requests/IP/hour

3. **Newsletter form** (`components/content/newsletter-form.tsx`):
   - Email only
   - Double opt-in via Brevo
   - Inline in articles and dedicated page

4. **CTA placement** per rules in `11-lead-magnets-conversion.md`

### STEP 11: SEO Technical Implementation

1. **Dynamic sitemap** (`app/sitemap.ts`):
   - Static pages
   - Dynamic: articles (from /content), software (from DB), companies (from DB), cities (from DB)
   - Proper lastModified, changeFrequency, priority

2. **robots.txt** (static or dynamic)

3. **Schema.org on every page type**:
   - Articles: Article + BreadcrumbList + FAQPage
   - Software: SoftwareApplication + BreadcrumbList + Review
   - Comparisons: ItemList + BreadcrumbList + FAQPage
   - Local: LocalBusiness (xN) + FAQPage + BreadcrumbList
   - Directory: LocalBusiness + BreadcrumbList
   - Homepage: Organization + WebSite

4. **Metadata on every page**:
   - Title (< 60 chars)
   - Description (< 160 chars)
   - OG tags
   - Twitter cards
   - Canonical URL

5. **URL normalization** (middleware.ts):
   - Remove trailing slashes
   - Lowercase URLs
   - 301 redirects

### STEP 12: Content Production

Write real, high-quality French content:

1. **3 pillar guides** (1,500+ words each):
   - Follow content templates from `07-geo-content-strategy.md`
   - BLUF format
   - Data points with sources
   - FAQ sections (5+ Q/A each)
   - Expert tone, no fluff

2. **5 software reviews**:
   - Research real features, pricing, pros/cons
   - Be fair and independent (even for Proprely)
   - Include real screenshots/logos

3. **3 comparison pages**:
   - Real criteria, real scores
   - Transparent methodology

4. **Local page content** (10 cities):
   - Unique intro per city (not template spam)
   - Real INSEE data
   - Real company listings from DB

### STEP 13: Analytics & Tracking

1. **GA4 setup**:
   - Page views
   - Custom events: lead_magnet_download, tool_completion, quote_request, demo_click, newsletter_subscribe

2. **GSC verification**

3. **Vercel Analytics** (built-in)

### STEP 14: QA & Launch

1. **SEO audit**:
   - All pages indexed? (check /sitemap.xml)
   - Schema valid? (test with validator.schema.org)
   - No broken links
   - Meta tags present on all pages
   - Canonical URLs correct

2. **Performance audit**:
   - Lighthouse score > 90 on all page types
   - LCP < 2.5s
   - CLS < 0.1
   - Mobile responsive

3. **Content audit**:
   - No thin content
   - No duplicate content
   - All articles have BLUF
   - All articles have FAQ
   - French quality (no awkward phrasing)

4. **Launch checklist**:
   - [ ] Domain configured on Vercel
   - [ ] SSL active
   - [ ] GSC submitted
   - [ ] Analytics tracking
   - [ ] All pages reachable
   - [ ] 404 page works
   - [ ] robots.txt correct
   - [ ] sitemap.xml valid

## After Launch — Do NOT Build These (V2 Only)

- ❌ AI content generation
- ❌ Automated data enrichment
- ❌ n8n workflows
- ❌ Cronjobs
- ❌ Programmatic local pages beyond 10 pilots
- ❌ User authentication system
- ❌ Advanced admin dashboard
- ❌ Payment/subscription system
- ❌ Forum/community
- ❌ Real-time features

## If Blocked

If you encounter a blocker:
1. Check the relevant `/docs` file for the answer
2. If not documented, make a reasonable decision and document it
3. If technical blocker (library conflict, API change), propose an alternative
4. Never skip a step — if blocked, state the blocker and ask for direction

## Success Criteria

The MVP is complete when:
- [ ] Site is live on the configured domain
- [ ] 3+ high-quality guides published
- [ ] 5 software reviews published
- [ ] 3 comparison pages published
- [ ] 3 interactive tools working
- [ ] 50+ company profiles in directory
- [ ] 10 local city pages published
- [ ] Lead capture forms on all key pages
- [ ] Newsletter signup working
- [ ] All pages server-rendered with proper schema.org
- [ ] Sitemap submitted to GSC
- [ ] Analytics tracking active
- [ ] Lighthouse score > 90 on all page types

## Final Output

After completing all steps, provide:
1. A summary of what was built
2. The live site URL
3. Any known issues or technical debt
4. Recommended next steps (post-MVP priorities)
