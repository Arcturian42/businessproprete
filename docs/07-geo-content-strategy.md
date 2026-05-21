# GEO Strategy & Content Guidelines

## What is GEO (Generative Engine Optimization)

GEO is the practice of optimizing content so that AI engines (ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews) cite your website as a source in their responses. It is distinct from traditional SEO because:

- **AI engines don't "rank" pages** — they extract and synthesize information
- **Citations depend on authority signals** + content structure + data richness
- **The format matters as much as the content** — structured, quotable text wins
- **Freshness is critical** — 79% of AI bots prioritize content from the last 2 years

## Why GEO for CleanP

The French professional cleaning sector is **virtually absent from AI responses**. A query like:
- "Quel logiciel choisir pour gérer une entreprise de nettoyage ?"
- "Quel est le salaire d'un agent de nettoyage en France en 2025 ?"
- "Comment choisir une société de nettoyage à Lyon ?"

...currently returns **no citation of any French specialized B2B media**. This is a **first-mover opportunity of 3-5 years**.

## GEO Data Points (2025 Research)

| Metric | Value | Source |
|---|---|---|
| AI Overview impact on position 1 CTR | -2.6% CTR | Multiple studies |
| Searches ending without click | 60% | SparkToro 2024 |
| AI visitors vs organic qualification | 4.4x more qualified | Botify 2025 |
| GEO market CAGR | 34% | Industry analysis |
| Content with H1-H2-H3 cited vs flat | 2.8x more likely | GEO framework study |
| Expert content citation boost | +40% probability | GEO framework study |
| Multi-platform presence citation share | 48% from community | Perplexity analysis |

## The 5 GEO Pillars for CleanP

### Pillar 1: Freshness

AI engines heavily weight recent content.

**Rules:**
- Update all regulatory content immediately when regulations change
- Refresh salary grids every January
- Mark all pages with `datePublished` AND `dateModified` schema
- Update software comparisons quarterly
- Archive outdated pages with 301 redirects to updated versions

**Implementation:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "datePublished": "2025-01-15T08:00:00+01:00",
  "dateModified": "2025-03-20T14:30:00+01:00"
}
```

### Pillar 2: Semantic Structure

AI engines parse heading hierarchies to understand and extract information.

**Rules:**
- Strict H1 → H2 → H3 hierarchy on every page (no skipping levels)
- H1 = main topic (contains primary keyword)
- H2 = major sections (contain secondary keywords)
- H3 = subsections (contain long-tail variants)
- Every H2 should be self-contained quotable (can stand alone as an answer)
- Use numbered lists for processes, steps, rankings
- Use tables for comparisons, data, pricing

**Bad vs Good Structure:**

```
BAD (flat):
H1: Grille salaire propreté
<p> lots of text...</p>
<p> more text...</p>

GOOD (structured):
H1: Grille salariale propreté 2025 : le guide complet avec les nouveaux salaires
H2: Quelle est la grille salariale minimale en 2025 ?
  H3: Salaire agent d'entretien débutant
  H3: Salaire agent d'entretien confirmé
  H3: Salaire chef d'équipe
H2: Quelles sont les majorations applicables ?
  H3: Majoration heures de nuit (+20%)
  H3: Majoration heures du dimanche (+30%)
H2: Comment calculer le coût réel d'un agent ?
H2: FAQ — Questions fréquentes sur les salaires de la propreté
```

### Pillar 3: Data & Expertise

AI engines prioritize content with verifiable data and expert signals.

**Rules for data-rich content:**
- Every claim backed by a number: "Le salaire minimum est de **11,83 €/heure**" not "Le salaire est environ 12 euros"
- Always cite sources: "Selon l'accord de branche du 15 novembre 2024..."
- Include original data: surveys, scraped statistics, proprietary benchmarks
- Use precise ranges: "Entre 25 € et 35 €/heure pour le nettoyage de bureaux en province"
- Include comparison tables with exact figures

**Expertise signals:**
- Author bylines with credentials ("Expert en droit du travail pour la propreté")
- Reviewed-by lines for regulatory content ("Vérifié par [Name], [Title]")
- Methodology sections for studies and comparisons
- Disclaimer when content is opinion vs fact

### Pillar 4: Multi-Platform Presence

48% of AI citations come from community platforms, not just websites.

**Distribution strategy:**

| Platform | Content Type | Frequency | GEO Impact |
|---|---|---|---|
| **LinkedIn** | Data points, key stats, short insights | 3-4 posts/week | High — professional authority |
| **YouTube** | Tutorial videos, software demos, expert interviews | 1-2 videos/month | High — Perplexity cites YouTube heavily |
| **Reddit** | r/entreprise, r/france, industry communities | 2-3 comments/posts/week | Medium — community credibility |
| **Quora FR** | Answering cleaning industry questions | 2-3 answers/week | Medium — question-answer format matches AI |
| **Twitter/X** | Quick stats, news reactions, thread summaries | Daily | Low-Medium — visibility signal |

**Important:** All social content must link back to the authoritative CleanP article (not just the homepage). This reinforces the page's authority.

### Pillar 5: Structured Data

Schema.org markup is how AI engines "understand" page content unambiguously.

**Required schemas by page type:**

| Page Type | Required Schemas | GEO Benefit |
|---|---|---|
| Article/Guide | `Article`, `BreadcrumbList`, `FAQPage` | Content extraction, citation |
| Comparison | `ItemList`, `Review`, `BreadcrumbList` | List extraction, ranking |
| Tool | `SoftwareApplication`, `FAQPage`, `HowTo` | Tool recommendation |
| Local | `LocalBusiness` (xN), `Dataset`, `FAQPage` | Local recommendation |
| Directory profile | `LocalBusiness`, `Review`, `BreadcrumbList` | Business citation |
| Study/Data | `Dataset`, `Article`, `BreadcrumbList` | Data citation |
| Homepage | `Organization`, `WebSite`, `BreadcrumbList` | Brand authority |

## BLUF Writing Format (Bottom Line Up Front)

Every piece of content must follow the BLUF format for GEO optimization:

**Rule:** The first 50 words must contain a direct, complete answer to the query.

**Example:**

```
Query: "Quel est le salaire d'un agent de nettoyage en France en 2025 ?"

BLUF Answer (first 50 words):
"En 2025, le salaire minimum d'un agent de nettoyage en France est de
11,83 € brut/heure pour un débutant, selon la convention collective IDCC 3043.
Un agent confirmé (échelon 3) gagne 12,45 €/heure minimum, auxquels s'ajoutent
les majorations pour heures de nuit (+20%), dimanche (+30%) et jours fériés (+50%)."
```

Then the article expands with context, details, sources, FAQ.

## Content Quality Guidelines (Anti AI-Slop)

### The 10 Rules of CleanP Content

| # | Rule | Why |
|---|---|---|
| 1 | **Every claim needs a source** | Builds trust, enables AI citation verification |
| 2 | **Every article has original data** | Surveys, scraped data, proprietary benchmarks — not just rehashed info |
| 3 | **Expert review for regulatory content** | Regulatory articles must be reviewed by a qualified professional |
| 4 | **No generic advice** | "Faites un planning" is useless. "Voici un modèle Excel avec formules" is valuable. |
| 5 | **Specific over general** | "28 €/heure à Lyon" > "entre 20 et 40 €/heure en France" |
| 6 | **Updated or dead** | Every article shows its last update date. Outdated content is worse than no content. |
| 7 | **Visual every 300 words** | Table, chart, highlight box, or image — breaks text, aids comprehension |
| 8 | **Actionable takeaways** | Every section ends with "Ce que vous devez retenir" or "Action à prendre" |
| 9 | **French only** | No English terms unless necessary (SaaS, SEO). Then explain in French. |
| 10 | **Voice: expert advisor, not salesman** | We inform and compare. We don't push. The value speaks. |

### Content Scoring Rubric (Editorial QA)

Before publication, every article is scored (0-100):

| Criterion | Points | Check |
|---|---|---|
| Length > 1,500 words | 10 | Word count |
| BLUF present in first 50 words | 10 | Manual review |
| H1-H2-H3 hierarchy correct | 10 | Automated check |
| 3+ data points with sources | 15 | Manual review |
| 1+ expert quote or citation | 10 | Manual review |
| FAQ section with 5+ Q/A | 10 | Automated check |
| FAQPage schema present | 5 | Automated check |
| Related internal links (3+) | 10 | Automated check |
| CTA present | 5 | Automated check |
| No duplicate content (>50% unique) | 10 | Automated check (vector similarity) |
| dateModified schema | 5 | Automated check |

**Score interpretation:**
- 90-100: Excellent — publish immediately
- 70-89: Good — minor revisions then publish
- 50-69: Needs work — significant revisions required
- <50: Reject — rewrite

## Content Templates by Type

### Template: Regulatory Guide

```markdown
# H1: [Topic] : guide complet [year]

## Réponse rapide (BLUF — 50 words)
[Direct answer with key numbers]

## Table des matières
[Auto-generated TOC]

## Contexte
[Why this matters, who it affects]

## [H2: Main section 1]
### [H3: Subsection]
[Content with data, sources, citations]

## [H2: Main section 2]
### [H3: Subsection]

## [H2: Ce que vous devez retenir]
[Actionable summary]

## FAQ
Q: [Question 1]?
A: [Answer 1]
Q: [Question 2]?
A: [Answer 2]
(... 5-8 Q/A pairs)

## Sources
1. [Source with URL]
2. [Source with URL]

---
CTA: [Contextual lead magnet]
Related articles: [3 links]
```

### Template: Software Comparison

```markdown
# H1: [Software A] vs [Software B] : comparatif [year]

## Verdict rapide (BLUF — 50 words)
[Direct recommendation with key differentiator]

## Tableau comparatif
| Critère | [A] | [B] | Meilleur |
|---------|-----|-----|----------|
| Planning | 4/5 | 5/5 | B |
| ... | ... | ... | ... |

## [H2: [Software A] en détail]
[150-200 words + pros/cons]

## [H2: [Software B] en détail]
[150-200 words + pros/cons]

## [H2: Notre recommandation]
[Context-dependent recommendation]

## FAQ
Q: [Question 1]?
A: [Answer 1]
(... 5-8 Q/A)

---
CTA: [Test Software A] [Test Software B]
```

### Template: Data Study

```markdown
# H1: [Study title] : [year]

## Points clés (BLUF)
[3-5 key findings with numbers]

## Méthodologie
[How data was collected, sample size, limitations]

## [H2: Finding 1]
[Data + chart + interpretation]

## [H2: Finding 2]

## [H2: Implications]
[What this means for industry professionals]

## Données complètes
[Downloadable table/CSV]

## FAQ

---
CTA: [Download full report PDF]
```

## AI Citation Monitoring (Manual V1, Automated V2)

### V1: Manual Tracking

Monthly, query these AI engines with 10 test questions:

1. "Quel est le meilleur logiciel pour gérer une entreprise de nettoyage en France ?"
2. "Quel est le salaire minimum d'un agent de nettoyage en 2025 ?"
3. "Comment choisir une société de nettoyage à Lyon ?"
4. "Quelle est la convention collective du nettoyage ?"
5. "Combien coûte le nettoyage de bureaux au m² ?"
6. "Quels sont les logiciels de planning pour le nettoyage ?"
7. "Comment calculer la rentabilité d'un contrat de nettoyage ?"
8. "Quelles sont les obligations de l'employeur dans le nettoyage ?"
9. "Quelle entreprise de nettoyage choisir à Paris ?"
10. "Quel est le prix moyen du nettoyage industriel en France ?"

**Track:** Is CleanP cited? At what position? What excerpt is used? What can be improved?

### V2: Automated Monitoring

(See `14-automation-v2-prep.md`)

## E-E-A-T Signals

| Signal | Implementation |
|---|---|
| **Experience** | "Our team surveyed 150 cleaning companies" — first-party data |
| **Expertise** | Author bios with credentials, reviewed-by lines |
| **Authoritativeness** | Backlinks from industry sites, citation by AI engines |
| **Trust** | HTTPS, RGPD compliance, source citations, update dates, correction policy |

**Author bio template:**
```
[Name] — [Title]
[2-3 lines: experience in the cleaning industry, specific expertise]
Articles: [count] · Spécialité: [topic]
```
