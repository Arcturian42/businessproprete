# Product Modules & MVP Scope

## Product Vision

CleanP is a **media-data platform** composed of interconnected modules. Each module has a clear SEO/GEO objective, a user value proposition, and a conversion purpose.

## Module Overview

| Module | Name | SEO Role | User Value | Conversion Output | MVP |
|---|---|---|---|---|---|
| M1 | **Editorial Engine** | Topic authority, long-tail capture | Expert guides and articles | Email capture, trust building | Yes |
| M2 | **Comparison Engine** | High-intent software keywords | Independent software rankings | Proprely demo clicks | Yes |
| M3 | **Tool Library** | Branded search, return visits | Free calculators and generators | Email capture, leads | Yes (3 tools) |
| M4 | **Directory** | Local SEO, company names | Find and compare companies | R.P. quote requests, profile claims | Yes (mini) |
| M5 | **Local Pages** | Local SEO at scale | City-specific info + listings | R.P. quote requests | Yes (pilot 10) |
| M6 | **Data/Studies** | Authority, backlinks, AI citations | Market stats and benchmarks | Newsletter, report sales | Yes (2 studies) |
| M7 | **Lead Capture System** | — | Gated content, forms, CTAs | Leads for Proprely & R.P. | Yes |
| M8 | **Newsletter Engine** | Return visits, direct traffic | Weekly curated content | All conversions | Yes |
| M9 | **Admin Dashboard** | — | Content management, analytics | — | No (direct DB) |
| M10 | **Automation Engine** | Scale | Auto-generation, enrichment | Scale all outputs | **V2** |

## MVP Feature Set

### M1 — Editorial Engine (MVP)

| Feature | Spec | Status |
|---|---|---|
| Article display (MDX) | Server-rendered MDX with components | MVP |
| Category pages | /guides, /reglementation, /logiciels, /management | MVP |
| Tag system | Tags for cross-cutting themes | MVP |
| Author profiles | Name, bio, photo, expertise area | MVP |
| Related articles | 3 related articles at end of each post | MVP |
| Table of contents | Auto-generated TOC for long articles | MVP |
| Reading time | Estimated reading time display | MVP |
| Last updated date | Show modification date for regulatory content | MVP |
| Social sharing | Twitter/X + LinkedIn share buttons | MVP |
| Print/PDF | "Télécharger en PDF" button (client-side generation) | Post-MVP |
| Comments | Not in MVP — too much moderation overhead | V2 |

### M2 — Comparison Engine (MVP)

| Feature | Spec | Status |
|---|---|---|
| Comparison grid | Table with 10+ criteria, sortable | MVP |
| Software detail pages | /logiciels/[slug] with full review | MVP |
| Scoring system | Weighted score per criterion (1-5 or 1-10) | MVP |
| User reviews | Basic star rating + text (stored in DB) | MVP |
| "Add to compare" | Select 2-3 softwares for side-by-side | MVP |
| CTA integration | "Tester gratuitement" links to each vendor | MVP |
| Filter/sort | By price, by feature, by rating | MVP |
| Comparison history | Remember user's last comparison | Post-MVP |

**MVP scope: 5 software reviews minimum**

### M3 — Tool Library (MVP)

| Tool | Description | Email Capture | Status |
|---|---|---|---|
| **T1: Prix nettoyage calculator** | Calculate cleaning cost by m², frequency, service type | Yes (to see full breakdown) | MVP |
| **T2: Rentabilité contrat** | Input contract revenue/costs → margin % + recommendation | Yes (to save) | MVP |
| **T3: Générateur de devis** | Simple quote generator with company branding | Yes (to download PDF) | MVP |
| T4: Planning hebdomadaire | Interactive schedule builder | Yes (to export) | Post-MVP |
| T5: Calculateur heures agents | Convert contract specs to agent hours needed | Yes | V2 |
| T6: Checklist qualité | Digital quality control checklist | Yes | V2 |

### M4 — Directory (MVP: Mini-Directory)

| Feature | MVP Spec | V2 Spec |
|---|---|---|
| Number of profiles | 200 (manual import) | 5,000+ (auto-import Sirene) |
| Profile fields | Name, SIRET, address, city, phone, website, NAF code, size | + enriched description, specialties, service area, reviews, score |
| Search | By city + by company name | By specialty, by size, by service area, by rating |
| Filters | City only | Size, specialty, rating, certification |
| Profile detail page | Basic template with LocalBusiness schema | Rich template with data visualization |
| Claim profile | Simple form → manual verification | Automated verification (email domain matching) |
| "Request quote" CTA | Link to Réseau Propreté form | Integrated quote form |

### M5 — Local Pages (MVP: Pilot 10 Cities)

| Feature | MVP Spec | V2 Spec |
|---|---|---|
| Number of pages | 10 pilot cities (Paris, Lyon, Marseille, Bordeaux, Nantes, Lille, Toulouse, Strasbourg, Nice, Rennes) | 350+ cities |
| Content | Template-based with manual enrichment per city | Programmatic generation from data |
| Directory integration | Show 5-10 companies from DB for that city | Auto-populate from radius search |
| Schema | LocalBusiness for each listed company + FAQPage for city guide | + Dataset, Review, BreadcrumbList |
| Quote CTA | Link to R.P. quote form | Integrated form |
| Local data | Population, office stock, number of cleaning companies (from Sirene) | + average prices, market trends |

### M6 — Data/Studies (MVP)

| Study | Content | Format | Status |
|---|---|---|---|
| **État du marché 2025** | Market size, number of companies, employment, trends, regional breakdown | Long-form article + downloadable PDF | MVP |
| **Baromètre digitalisation** | Survey-based: tech adoption rates among cleaning companies | Article + interactive chart | MVP |
| **Rapport salarial régional** | Salary grids by region, position, experience | Data table + article | Post-MVP |

### M7 — Lead Capture System (MVP)

| Feature | Spec | Status |
|---|---|---|
| Email capture forms | Inline in articles, modal on tool completion, sidebar on guides | MVP |
| Form fields | Email + company name + optional phone + company size | MVP |
| Double opt-in | Required for newsletter (RGPD compliance) | MVP |
| CRM integration | Webhook to Proprely CRM or simple dashboard | MVP (webhook) |
| Lead magnet delivery | Auto-email PDF after form submission | MVP |
| Drip sequences | 3-email welcome sequence | MVP |
| Segmentation | By lead magnet type, by page category | MVP (tag-based) |

### M8 — Newsletter Engine (MVP)

| Feature | Spec | Status |
|---|---|---|
| Subscription | Inline forms + dedicated page | MVP |
| Frequency | Weekly (every Tuesday) | MVP |
| Content | 3-4 best articles of the week + 1 tool highlight + 1 data point | MVP |
| Template | Branded HTML email (simple, readable) | MVP |
| Platform | Brevo (ex-Sendinblue) — free up to 300 emails/day | MVP |

## Pages Required for MVP

### Core Pages

| Page | Route | Purpose | Template |
|---|---|---|---|
| Homepage | `/` | Authority signal, navigation hub, featured content | Custom |
| About | `/a-propos` | Trust, editorial team, mission | Static |
| Contact | `/contact` | Partnerships, corrections, general inquiries | Static |
| Newsletter | `/newsletter` | Subscription page with value proposition | Static |
| Legal | `/mentions-legales` | RGPD compliance | Static |
| Privacy | `/politique-confidentialite` | RGPD compliance | Static |
| Cookies | `/cookies` | Cookie consent management | Static |

### Content Hub Pages

| Page | Route | Purpose | Template |
|---|---|---|---|
| Guides hub | `/guides` | All editorial guides, categorized | Hub listing |
| Réglementation | `/reglementation` | Regulatory content hub | Hub listing |
| Logiciels hub | `/logiciels` | Software comparison hub | Hub listing |
| Outils hub | `/outils` | Free tools directory | Hub listing |
| Annuaire hub | `/annuaire` | Directory landing page | Hub listing |
| Études hub | `/etudes` | Data studies and reports | Hub listing |

### Content Pages (MVP Quantity)

| Type | Route Pattern | MVP Count | Template |
|---|---|---|---|
| Guide articles | `/guides/[slug]` | 20 | Article MDX |
| Software reviews | `/logiciels/[slug]` | 5 | Software detail |
| Comparison pages | `/comparatifs/[slug]` | 3 | Comparison grid |
| Tool pages | `/outils/[slug]` | 3 | Interactive tool |
| Study pages | `/etudes/[slug]` | 2 | Study report |
| Local pages | `/[ville]/societes-nettoyage` | 10 | Local template |
| Directory profiles | `/annuaire/[siret-or-slug]` | 200 | Profile template |

**Total MVP pages: ~245**

## User Flows (MVP)

### Primary Flows

```
Flow A: Search → Guide → Email Capture → Newsletter → Proprely
Flow B: Search → Local Page → Quote Request → R.P.
Flow C: Search → Comparison → Proprely Trial
Flow D: Social/Direct → Tool → Email Capture → Nurture → Proprely
Flow E: Search → Study → Newsletter → Long-term nurture
```

## What is NOT in MVP (Explicit Exclusions)

| Feature | Reason | Timeline |
|---|---|---|
| AI content generation | Manual content only for quality control | V2 |
| Automated data enrichment | Manual profile creation and enrichment | V2 |
| User authentication (login/register) | No user-specific content requiring auth in MVP | Post-MVP |
| Comment system | Moderation overhead, low B2B value | V2 |
| Advanced admin dashboard | Direct DB access is sufficient for MVP | V2 |
| Payment/subscription system | No paid content in MVP | Phase 2 (M6+) |
| Multi-language | French only | Never (unless market expands) |
| Mobile app | Responsive web is sufficient | Never (PWA possible) |
| Real-time chat | Low value for B2B content site | Never |
| Forum/community | Requires critical mass, moderation | Phase 2 |

## Technical Constraints for MVP

1. **No JavaScript-required content** — All core content must be server-rendered for SEO
2. **Every page < 3s TTFB** — Target 1.5s on Vercel edge
3. **100% mobile-responsive** — 60%+ of B2B search is mobile
4. **Core Web Vitals: Good** on all 4 metrics for every page type
5. **Schema.org on every page** — Minimum: BreadcrumbList + Article/FAQPage/LocalBusiness
6. **Sitemap updated automatically** — On every content publish/unpublish
7. **robots.txt optimized** — Disallow low-value pages, allow everything else
