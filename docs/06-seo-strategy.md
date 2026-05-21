# SEO Strategy — Classic Search Engine Optimization

## Strategic SEO Pillars

CleanP's SEO strategy rests on 4 pillars: **Thematic Authority** (topic clusters), **Programmatic Local SEO**, **Comparison/Commercial Content**, and **Technical Excellence**.

## Pillar 1: Thematic Authority (Topic Clusters / Silos)

### Architecture

The site is organized into 5 thematic silos. Each silo has a pillar page (Level 1), sub-topic pages (Level 2), and supporting articles (Level 3).

```
SILO 1: CHOIX PRESTATAIRE          SILO 2: REGLEMENTATION
├── /guides/choisir-societe-nettoyage  ├── /reglementation/idcc-3043-guide
│   ├── /guides/criteres-selection     │   ├── /reglementation/grille-salaire-2025
│   ├── /guides/verifier-qualifications│   ├── /reglementation/majorations-nuit
│   ├── /guides/comparer-devis-nettoyage│  ├── /reglementation/temps-deplacement
│   └── /guides/checklist-recrutement  │   └── /reglementation/obligations-employeur
                                       │
SILO 3: DIGITALISATION & LOGICIELS   SILO 4: MANAGEMENT & PRODUCTIVITE
├── /guides/digitaliser-entreprise     ├── /guides/management-nettoyage
│   ├── /logiciels/meilleur-2025       │   ├── /guides/planning-agents
│   ├── /comparatifs/[x-vs-y]          │   ├── /guides/controle-qualite
│   ├── /logiciels/[nom]               │   ├── /guides/rentabilite-contrat
│   └── /guides/choisir-erp-nettoyage  │   └── /guides/formation-agents
                                       │
                    SILO 5: SPECIALITES
                    ├── /guides/nettoyage-bureaux
                    ├── /guides/nettoyage-industriel
                    ├── /guides/nettoyage-hopital
                    ├── /guides/nettoyage-fine-chantier
                    └── /guides/nettoyage-ecologique
```

### Silo 1: Choix Prestataire

| Page | Target Keyword | Level |
|---|---|---|
| `/guides/choisir-societe-nettoyage` | "comment choisir société de nettoyage" | Pillar (L1) |
| `/guides/criteres-selection-prestataire` | "critères sélection entreprise propreté" | L2 |
| `/guides/verifier-qualifications-nettoyage` | "vérifier qualifications société nettoyage" | L2 |
| `/guides/comparer-devis-nettoyage` | "comparer devis nettoyage" | L2 |
| `/guides/checklist-recrutement-prestataire` | "checklist recrutement prestataire nettoyage" | L3 |

### Silo 2: Réglementation

| Page | Target Keyword | Level |
|---|---|---|
| `/reglementation/idcc-3043-guide-complet` | "convention collective propreté" | Pillar (L1) |
| `/reglementation/grille-salaire-proprete-2025` | "grille salariale propreté 2025" | L2 |
| `/reglementation/majorations-nuit-week-end` | "majorations nuit nettoyage" | L2 |
| `/reglementation/temps-deplacement-inter-sites` | "temps déplacement inter sites" | L2 |
| `/reglementation/obligations-employeur-securite` | "obligations employeur nettoyage" | L2 |

### Silo 3: Digitalisation & Logiciels

| Page | Target Keyword | Level |
|---|---|---|
| `/guides/digitaliser-entreprise-nettoyage` | "digitaliser entreprise nettoyage" | Pillar (L1) |
| `/logiciels/meilleur-logiciel-nettoyage-2025` | "meilleur logiciel nettoyage" | Pillar (L1) |
| `/logiciels/proprely` | "proprely logiciel nettoyage" | L2 |
| `/logiciels/progiclean` | "progiclean avis" | L2 |
| `/comparatifs/proprely-vs-excel` | "proprely vs excel" | L2 |
| `/comparatifs/logiciels-planning-nettoyage` | "logiciel planning nettoyage" | L2 |

### Silo 4: Management & Productivité

| Page | Target Keyword | Level |
|---|---|---|
| `/guides/management-nettoyage-professionnel` | "management entreprise nettoyage" | Pillar (L1) |
| `/guides/planning-agents-nettoyage` | "planning agents de nettoyage" | L2 |
| `/guides/controle-qualite-nettoyage` | "contrôle qualité nettoyage" | L2 |
| `/guides/rentabilite-contrat-nettoyage` | "rentabilité contrat nettoyage" | L2 |

### Silo 5: Spécialités

| Page | Target Keyword | Level |
|---|---|---|
| `/guides/nettoyage-bureaux` | "nettoyage de bureaux" | Pillar (L1) |
| `/guides/nettoyage-industriel` | "nettoyage industriel" | L2 |
| `/guides/nettoyage-hopital` | "nettoyage hôpital normes" | L2 |
| `/guides/nettoyage-fin-chantier` | "nettoyage fin de chantier" | L2 |
| `/guides/nettoyage-ecologique` | "nettoyage écologique professionnel" | L2 |

## Pillar 2: Programmatic Local SEO

### Strategy

Local pages are the highest-volume opportunity. The strategy is template-based at MVP, then programmatic at scale in V2.

### Template Variables per City

| Variable | Source | Example |
|---|---|---|
| `{city_name}` | Manual (pilot) / DB (V2) | Lyon |
| `{city_population}` | INSEE | 515 695 |
| `{metro_population}` | INSEE | 1 664 657 |
| `{office_surface_sqm}` | Estimation ORT / CBRE | 2 340 000 |
| `{cleaning_company_count}` | Sirene API (NAF 8121Z in radius) | 127 |
| `{avg_cleaning_rate}` | CleanP benchmark data | 28 €/heure |
| `{department}` | INSEE | Rhône (69D) |
| `{region}` | INSEE | Auvergne-Rhône-Alpes |
| `{nearby_cities}` | Geographic calculation | Villeurbanne, Bron, Saint-Priest |

### Local Page Content Structure

Each local page contains:

1. **H1**: `Sociétés de nettoyage à {city} : annuaire, tarifs et guide`
2. **Intro**: 150-200 words about the local cleaning market (unique per city)
3. **Market data**: Number of companies, office stock, estimated market size
4. **Map**: Interactive map with directory listings in 30km radius
5. **Top listings**: 5-10 featured company cards with LocalBusiness schema
6. **Pricing guide**: Average rates for the city/region
7. **How to choose**: City-specific advice (transport, specific industries, regulations)
8. **FAQ**: 5-8 city-specific FAQs (FAQPage schema)
9. **Quote CTA**: Form or link to Réseau Propreté
10. **Nearby cities**: Links to cities within 50km radius

### Local Page Internal Linking

```
Local Page → 5-10 Directory Profiles (relevant companies)
Local Page → Nearby City Pages (within 50km)
Local Page → /villes (index)
Local Page → Quote form (R.P.)
Directory Profile → Its City Page (canonical local reference)
/villes → All Local Pages (hub)
```

## Pillar 3: Comparison & Commercial Content

### Comparison Page Types

| Type | Example | SEO Value | Conversion Value |
|---|---|---|---|
| **Best of** | "Meilleur logiciel nettoyage 2025" | Very high (high intent) | Very high (Proprely CTA) |
| **Head-to-head** | "Proprely vs Progiclean" | High (specific) | High (fair comparison) |
| **Category** | "Logiciels planning nettoyage" | Medium | Medium |
| **Alternative** | "Alternatives à Excel pour le nettoyage" | Medium-High | High (Proprely positioned) |

### Comparison Page Structure

1. **H1**: Clear, keyword-optimized title
2. **BLUF**: Direct verdict in first 50 words
3. **Comparison table**: 10+ criteria, all softwares side-by-side
4. **Individual reviews**: 150-200 words per software
5. **Scoring methodology**: How scores are calculated (transparency)
6. **FAQ**: 5-8 common questions (FAQPage schema)
7. **CTA**: "Tester [Software]" buttons for each vendor

### Comparison Criteria Grid (Software)

| Criterion | Weight | Description |
|---|---|---|
| Planning & scheduling | 20% | Can it handle complex multi-site scheduling? |
| Agent management | 15% | Clock-in/out, GPS tracking, HR management |
| Quote & invoicing | 15% | Quote generation, invoicing, payment tracking |
| Client portal | 10% | Client access to reports, quality scores |
| Quality control | 10% | Checklists, photos, scoring, incidents |
| Mobile app | 10% | iOS/Android app quality for agents |
| Integrations | 5% | APIs, accounting software, payroll |
| Ease of use | 5% | UX, onboarding, learning curve |
| Support | 5% | French support, response time, documentation |
| Price | 5% | Value for money, transparency |

## Pillar 4: Technical SEO Foundation

See `13-seo-technical-impl.md` for full implementation details. Key points:

- Every page server-rendered (SSR/SSG) — no client-side rendering for content
- Dynamic XML sitemap — updated on every publish
- robots.txt — optimized crawl budget
- Schema.org on every page type
- Core Web Vitals: Good on all metrics
- Canonical URLs — no duplicate content
- hreflang not needed (French only)

## Keyword Research Methodology

### Sources

1. **Ahrefs Keywords Explorer** — Primary tool for volume, difficulty, SERP analysis
2. **Google Search Console** — Once live, for query analysis and opportunity detection
3. **AlsoAsked.com** — "People Also Ask" questions for FAQ content
4. **AnswerThePublic** — Question-based keyword discovery
5. **Google Suggest** — Manual + automated scraping for long-tail

### Priority Matrix

Keywords are scored on two axes: **Business Value** (conversion potential) and **Ranking Feasibility** (competition vs our authority).

| Score | Business Value | Feasibility | Action |
|---|---|---|---|
| A | High | High | Immediate target — create content now |
| B | High | Medium | Target with pillar page + link building |
| C | Medium | High | Quick win — create supporting content |
| D | Medium | Medium | Planned for Phase 2 |
| E | Low | Any | Deprioritize |

### MVP Keyword Targets (Priority A)

| Keyword | Avg. Monthly Volume | Difficulty | Intent | Target Page |
|---|---|---|---|---|
| grille salariale propreté 2025 | 2,400 | Low | Informational | Regulatory guide |
| convention collective nettoyage | 1,900 | Low | Informational | Regulatory pillar |
| meilleur logiciel nettoyage | 880 | Medium | Commercial | Comparison page |
| société de nettoyage Lyon | 720 | Medium | Transactional | Local page |
| devis nettoyage bureaux | 590 | Medium | Transactional | Calculator tool |
| planning agents de nettoyage | 480 | Low | Informational | Management guide |
| logiciel planning nettoyage | 390 | Medium | Commercial | Software review |
| nettoyage de bureaux tarif | 360 | Low | Transactional | Calculator + guide |
| comment choisir société nettoyage | 320 | Low | Informational | Guide pillar |
| proprely logiciel | 260 | Low | Commercial | Software review page |

## Netlinking Strategy

### Tier 1: Content-Worthy Link Magnets (Create to Earn Links)

| Content Type | Link Potential | MVP Plan |
|---|---|---|
| **Market study** (État du marché 2025) | Very high — journalists, analysts, suppliers | Yes — M1 |
| **Salary grid tool** | High — HR sites, job boards, unions | Yes — M3 |
| **Software comparison** | Medium-High — vendor backlinks, affiliates | Yes — M2 |
| **Interactive salary map** | High — regional media, local business sites | Post-MVP |
| **Regulatory update alerts** | Medium — professional associations | Yes — newsletter |
| **Infographic** (sector stats) | Medium — social shares, embeds | Yes — M6 |

### Tier 2: Active Outreach

| Target | Method | Expected Result |
|---|---|---|
| Cleaning industry suppliers | Offer exclusive data access | 5-10 links |
| Business schools (facility management) | Offer student research data | 2-3 .edu links |
| French business media (Les Echos, BFM) | Press release for market study | 1-2 high-DR links |
| Industry associations (FNTP, UNTP) | Partnership / data sharing | 2-3 authoritative links |
| Software vendors we review | Notify of review + badge | 5 nofollow badges |
| Local business directories | Submit local pages | 10-20 citations |

### Tier 3: Digital PR

| Tactic | Frequency | Expected Result |
|---|---|---|
| Press release for annual market study | Annual | 5-10 press mentions |
| Data journalism pitch | Quarterly | 2-3 journalist pickups |
| Expert commentary offer | Monthly | Ongoing quote opportunities |
| Guest post on industry sites | Monthly | 1 link/month |

## Content Refresh Strategy

| Content Type | Refresh Frequency | Signal to Refresh |
|---|---|---|
| Salary grids | Annually (January) | Regulatory update |
| Software comparisons | Quarterly | New features, new pricing, new entrant |
| Market studies | Annually | New data available |
| Regulatory guides | On regulatory change | Legal update alert |
| Local pages | Semi-annually | New companies, price changes |
| General guides | Annually | Drop in rankings, outdated info |

Refresh process: Update content → Update `dateModified` schema → Notify sitemap → Track ranking recovery.

## Anti-Thin Content Rules

1. **Minimum 1,000 words** for any guide article (except tool pages)
2. **Minimum 3 data points** per article (statistics, prices, percentages)
3. **Minimum 1 expert citation** or quote per article
4. **FAQ section mandatory** on every pillar page (5+ questions)
5. **No auto-generated pages without human review** (V2 exception: AI-assisted with scoring)
6. **Duplicate content check** — Every page must have >50% unique content vs any other page
7. **No orphan pages** — Every page linked from at least 3 other internal pages
8. **Exit intent** — Every page must have a clear next step (CTA, related content, tool)
