# Business Ecosystem & Monetization

## Ecosystem Architecture

CleanP does not operate in isolation. It is the **top-of-funnel authority layer** of a three-site ecosystem designed to capture, educate, and convert professionals in the French cleaning industry.

```
┌─────────────────────────────────────────────────────────────────┐
│                         CleanP (MEDIA)                          │
│                    ┌────────────────────┐                       │
│                    │  TOP OF FUNNEL     │                       │
│                    │  - Editorial       │                       │
│                    │  - Data/Studies    │                       │
│                    │  - Tools (free)    │                       │
│                    │  - Directory       │                       │
│                    │  - Comparisons     │                       │
│                    └─────────┬──────────┘                       │
│                              │                                  │
│              ┌───────────────┼───────────────┐                  │
│              ▼               ▼               ▼                  │
│    ┌─────────────────┐ ┌──────────┐ ┌──────────────────────┐   │
│    │ Software Leads  │ │  Tools   │ │   Service Leads      │   │
│    │ (comparison)    │ │  leads   │ │   (directory/local)  │   │
│    └────────┬────────┘ └────┬─────┘ └──────────┬───────────┘   │
│             │               │                    │               │
│             ▼               ▼                    ▼               │
│    ┌─────────────────┐    ┌──────────┐   ┌──────────────────────┐│
│    │  PROPRELY.FR    │    │ PROPRELY │   │ RESEAUPROPRETE.FR    ││
│    │  SaaS Product   │    │ (nurture)│   │ Directory/Network    ││
│    │  - Demo requests│    │          │   │ - Quote requests     ││
│    │  - Free trials  │    │          │   │ - Provider matching  ││
│    │  - Paid subs    │    │          │   │ - Network members    ││
│    └─────────────────┘    └──────────┘   └──────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

## Role of Each Site

### CleanP (This Project)

| Aspect | Detail |
|---|---|
| **Role** | Traffic capture + authority building + education |
| **Content** | Guides, comparisons, data studies, free tools, directory, local pages |
| **Monetization** | Indirect — lead generation for Proprely and Réseau Propreté |
| **Primary KPIs** | Organic traffic, leads generated, authority metrics (DR, backlinks), AI citations |
| **Secondary KPIs** | Newsletter subscribers, tool usage, time on site, return visits |
| **Tone** | Independent media. Can mention and recommend Proprely when relevant. |

### Proprely.fr

| Aspect | Detail |
|---|---|
| **Role** | SaaS conversion — bottom of funnel for software-intent traffic |
| **Receives from CleanP** | Software comparison clicks, calculator users, guide readers (via email nurture) |
| **Gives to CleanP** | Product updates (for content), testimonials, case studies, data (anonymized) |
| **Linking rules** | CleanP → Proprely: contextual, max 1 per article, varied anchors. Proprely → CleanP: blog references. |

### ReseauProprete.fr

| Aspect | Detail |
|---|---|
| **Role** | Service matching — middle/bottom funnel for local service-intent traffic |
| **Receives from CleanP** | Directory profile views, local page quote requests, service searches |
| **Gives to CleanP** | Directory data (enriched profiles), local market info, network events |
| **Linking rules** | CleanP → R.P.: local pages always link to R.P. quote form. R.P. → CleanP: guide references. |

## Inter-Site Linking Strategy

### Rules (Strict — to avoid SEO footprint)

| Rule | Specification |
|---|---|
| **Contextual only** | Links between sites only appear within article body content, never in footer/sidebar/global nav |
| **Max 1 CleanP→Proprely per article** | Only articles with clear software intent contain a Proprely link |
| **Always local pages → R.P.** | Every local city page links naturally to R.P. quote form |
| **Varied anchors** | "Proprely", "notre logiciel", "cette solution", "découvrir" — never exact-match spam |
| **Rel attributes** | No special rel (follow links) — these are legitimate editorial links between related sites |
| **Disclosure** | When CleanP recommends Proprely, a note appears: "Proprely est un logiciel de notre groupe" or similar |
| **Reciprocal links** | Never systematic. Proprely→CleanP links happen naturally in blog posts, not as a required exchange. |
| **Nofollow on directory CTA** | The "Obtenir un devis" buttons on local pages linking to R.P. can be nofollow if volume is high |

### Link Frequency by Content Type

| CleanP Content Type | Links to Proprely | Links to R.P. | Frequency |
|---|---|---|---|
| Software comparison pages | Yes (featured fairly) | No | 100% of comp pages |
| Digitization guides | Yes (1 contextual link) | No | ~40% of relevant guides |
| Local/city pages | No | Yes (quote form) | 100% of local pages |
| Regulatory guides | No | No | 0% |
| Management guides | No | No | 0% |
| Tool pages | Soft CTA in email | No | ~20% via email |
| Directory profiles | Maybe ("see also") | Yes (claim profile) | 100% link to R.P. |

## Monetization Model

### Phase 1: MVP (Months 1-6) — Indirect Only

| Revenue Stream | Mechanism | Est. Revenue |
|---|---|---|
| **Proprely demo leads** | CleanP captures email/tool use → nurture → demo request at Proprely | Value as marketing cost savings |
| **R.P. quote leads** | Local page visitors request quotes → matched via R.P. | Value as commission or lead fee |
| **Newsletter list** | Subscriber base for future monetization | Asset building |

### Phase 2: Growth (Months 6-12) — Direct Revenue

| Revenue Stream | Mechanism | Est. Revenue |
|---|---|---|
| **Sponsored content** | Software vendors pay for featured reviews (labeled "Sponsored") | EUR 500-2,000/article |
| **Directory premium listings** | Companies pay for enhanced profiles (photos, priority, badge) | EUR 20-50/month |
| **Affiliate SaaS** | Commission on software subscriptions referred | EUR 50-200/signup |
| **Market reports** | Paid industry reports (e.g., "État du marché 2025") | EUR 200-500/report |

### Phase 3: Scale (Year 2+)

| Revenue Stream | Mechanism | Est. Revenue |
|---|---|---|
| **Premium tools** | Advanced calculators, APIs, data exports | Subscription EUR 29-99/month |
| **Events/webinars** | Online events sponsored by industry players | EUR 2,000-5,000/event |
| **Data licensing** | Anonymized market data sold to analysts, insurers, suppliers | Custom pricing |
| **Job board** | Job postings for the cleaning industry | EUR 100-300/posting |

## Lead Scoring Model

Each lead captured by CleanP is scored (1-100) based on:

| Signal | Points | Detection |
|---|---|---|
| Visited software comparison page | +20 | Page category |
| Used calculator/tool | +25 | Tool completion event |
| Downloaded PDF guide | +15 | Form submission |
| Company size declared (10+ employees) | +20 | Form field |
| Searched for software-specific terms | +15 | UTM/ referrer |
| Multiple page views (3+) | +10 | Session depth |
| Returned within 7 days | +15 | Return visitor |

**Scoring tiers:**
- **90-100**: Hot lead — immediate sales outreach from Proprely
- **60-89**: Warm lead — email nurture sequence (5 emails)
- **30-59**: Cold lead — newsletter subscription only
- **0-29**: Anonymous — retargeting pixel

## Conversion Tracking Plan

| Conversion Event | Tool | Label | Value |
|---|---|---|---|
| Demo request (Proprely) | GA4 + pixel | `conversion_demo_proprely` | EUR 50 |
| Quote request (R.P.) | GA4 + pixel | `conversion_quote_rp` | EUR 30 |
| Tool completion + email | GA4 | `lead_tool_user` | EUR 10 |
| PDF download | GA4 | `lead_pdf_download` | EUR 5 |
| Newsletter signup | GA4 | `lead_newsletter` | EUR 2 |
| Directory profile claim | GA4 | `lead_claim_profile` | EUR 20 |
| Page scroll 75% + time >2min | GA4 | `engagement_high` | — |

## Key Business Assumptions to Validate

1. **Assumption**: Cleaning company owners search online for industry info.
   **Validation**: Check search volume data (Ahrefs) — if vol > 1,000/mo on key terms, validated.

2. **Assumption**: Free tools drive qualified signups.
   **Validation**: If tool→email conversion rate > 5%, validated.

3. **Assumption**: Software comparison pages convert to Proprely demos.
   **Validation**: If comparison page → demo CTR > 2%, validated.

4. **Assumption**: Local pages generate quote requests for R.P.
   **Validation**: If local page → quote form CTR > 3%, validated.

5. **Assumption**: GEO/AI citations drive qualified traffic.
   **Validation**: Manual tracking — if 10+ AI citations by M6, validated.
