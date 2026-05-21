# Directory & Data Strategy

## Objective

Build a structured directory of professional cleaning companies in France that:
1. Captures local SEO traffic ("société de nettoyage + ville")
2. Provides genuinely useful company profiles (not empty shells)
3. Feeds leads to Réseau Propreté
4. Creates a data moat over time (enriched profiles, reviews, benchmarks)

## Data Model: Company Profile

### Required Fields (MVP)

| Field | Source | Public? | Notes |
|---|---|---|---|
| `name` | Sirene / manual | Yes | Company trade name |
| `siret` | Sirene | Yes | 14-digit identifier — trust signal |
| `siren` | Sirene | Yes | 9-digit root |
| `naf_code` | Sirene | Yes | 8121Z (cleaning), 8122Z (industrial) |
| `naf_label` | Sirene | Yes | Human-readable activity label |
| `address` | Sirene / manual | Yes | Full address |
| `postal_code` | Sirene | Yes | |
| `city` | Sirene → cities table | Yes | Linked to cities table |
| `phone` | Website scraping / manual | Yes | |
| `email` | Website scraping / manual | Yes (if public) | Check RGPD |
| `website` | Website scraping / manual | Yes | |
| `employee_count` | Sirene | Yes | Range (5-9, 10-19, etc.) |
| `description` | AI enrichment / manual | Yes | 150-200 word company description |
| `specialties` | Website scraping / manual | Yes | Array: {"bureaux", "industriel", "vitres"} |
| `score_visibility` | Calculated | Yes | 0-100 algorithmic score |
| `is_verified` | Manual process | Yes (badge) | Owner has claimed profile |

### Optional Fields (V2)

| Field | Source | Notes |
|---|---|---|
| `revenue_range` | Sirene (public companies) / estimation | |
| `service_area` | Scraping / claim form | Cities served |
| `certifications` | Scraping / claim form | ISO, Qualiopi, etc. |
| `years_experience` | Calculated from Sirene creation date | |
| `client_types` | Scraping / claim form | Bureaux, hôpitaux, industriels... |
| `review_count` | Aggregated | From Google, Trustpilot, etc. |
| `average_rating` | Aggregated | Star rating |
| `photos` | Claim form upload | Workplace, team, equipment |
| `social_profiles` | Scraping | LinkedIn, Facebook |
| `enriched_data` | AI analysis | Sentiment, positioning, etc. |

## Data Sources

### Primary: API Sirene (INSEE)

**Free**, official, updated daily. The legal foundation.

```
Endpoint: https://api.insee.fr/entreprises/sirene/V3.11
Auth: Bearer token (free registration at api.insee.fr)
Rate limit: 30 requests/minute
```

**Relevant NAF codes:**

| Code | Label | Priority |
|---|---|---|
| **8121Z** | Nettoyage courant des bâtiments | Primary — 90% of companies |
| **8122Z** | Autres activités de nettoyage des bâtiments et nettoyage industriel | Secondary |
| **8110Z** | Activités combinées de soutien aux bâtiments | Tertiary (facility management) |

**API call pattern:**
```
GET /siret/?q=periode(activitePrincipaleEtablissement:8121Z)
      AND etatAdministratifEtablissement:A
```

**MVP approach:**
1. Manual export of ~200 companies for pilot cities (no API needed)
2. Store raw Sirene data in `companies.metadata` JSONB
3. V2: Automated daily sync via API

### Secondary: Website Scraping (MVP Manual, V2 Automated)

**What to scrape per company website:**

| Element | Method | Storage |
|---|---|---|
| Meta description | `<meta name="description">` | companies.description (fallback) |
| Services listed | H2/H3 + keywords | companies.specialties |
| Contact page | `/contact` page parsing | companies.phone, companies.email |
| Zone d'intervention | Page content keywords | companies.service_area |
| Social links | Footer links | companies.metadata |

**RGPD compliance for scraping:**
- Only scrape **publicly displayed** information
- No private data (personal emails, non-public phone numbers)
- Respect robots.txt
- Rate limit: max 1 request/second per domain
- Store only professional data (B2B context = legitimate interest)

### Tertiary: Pappers API (V2)

```
Endpoint: https://api.pappers.fr/v2
Auth: API key (100 free requests/month, then paid)
Data: Full company info, financials, directors, legal history
```

**V2 use:** Financial health scoring, director identification, enrichment.

## MVP Import Process (Manual / Semi-Automated)

### Step 1: Extract (Sirene)

```bash
# Option A: Manual CSV download from data.gouv.fr
# Download: https://www.data.gouv.fr/fr/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/
# Filter: NAF=8121Z, active, in pilot city postal codes

# Option B: API (for V2 automation)
curl -X GET "https://api.insee.fr/entreprises/sirene/V3.11/siret" \
  -H "Authorization: Bearer $SIRENE_TOKEN" \
  -H "Accept: application/json" \
  -G --data-urlencode "q=periode(activitePrincipaleEtablissement:8121Z) AND etatAdministratifEtablissement:A AND codePostalEtablissement:69001"
```

### Step 2: Transform

```typescript
// Transform Sirene record to company insert
function transformSireneToCompany(sireneRecord: SireneRecord): CompanyInsert {
  return {
    name: sireneRecord.periodesEtablissement[0].enseigne1Etablissement 
       || sireneRecord.uniteLegale.denominationUniteLegale,
    siret: sireneRecord.siret,
    siren: sireneRecord.siren,
    naf_code: sireneRecord.periodesEtablissement[0].activitePrincipaleEtablissement,
    naf_label: getNafLabel(sireneRecord.periodesEtablissement[0].activitePrincipaleEtablissement),
    address: `${sireneRecord.adresseEtablissement.numeroVoieEtablissement} ${sireneRecord.adresseEtablissement.typeVoieEtablissement} ${sireneRecord.adresseEtablissement.libelleVoieEtablissement}`,
    postal_code: sireneRecord.adresseEtablissement.codePostalEtablissement,
    city_id: lookupCityId(sireneRecord.adresseEtablissement.codePostalEtablissement),
    employee_count: parseTrancheEffectifs(sireneRecord.trancheEffectifsEtablissement),
    status: 'active',
    metadata: {
      source: 'sirene_api',
      imported_at: new Date().toISOString(),
      sirene_raw: sireneRecord // full raw data for traceability
    }
  };
}
```

### Step 3: Enrich (MVP: Manual, V2: AI-assisted)

**MVP enrichment (manual per company):**
1. Visit company website
2. Extract: services, zones, phone, email, description
3. Write 2-3 sentence description (or use meta description)
4. Assign specialties based on website content
5. Set `score_visibility` based on: has website (+20), has phone (+20), has description (+20), has email (+10), employee_count known (+10), enriched (+20)

### Step 4: Load

```typescript
// Batch insert to Supabase
const { data, error } = await supabase
  .from('companies')
  .insert(companies)
  .select();
```

## Score Visibility Algorithm

The score is calculated algorithmically and displayed on each profile.

| Criterion | Points | Condition |
|---|---|---|
| Has website | +20 | `website IS NOT NULL` |
| Has phone | +20 | `phone IS NOT NULL` |
| Has enriched description | +20 | `description IS NOT NULL AND length > 50` |
| Has email | +10 | `email IS NOT NULL` |
| Employee count known | +10 | `employee_count IS NOT NULL` |
| Is verified | +10 | `is_verified = true` |
| Has reviews | +10 | `review_count > 0` |
| **Maximum** | **100** | |

**Display:**
- 0-30: Low visibility (gray badge)
- 31-60: Medium visibility (yellow badge)
- 61-80: Good visibility (green badge)
- 81-100: Excellent visibility (dark green badge + "Top visibilité")

## Quality Rules: Anti-Spam, Anti-Empty

### Profile Quality Gates

A profile is **displayed** only if:
1. `name` is present and not generic (not "SARL", not "EURL")
2. `city_id` is linked to an active city
3. `score_visibility >= 20` (minimum data quality)
4. `status = 'active'`
5. `deleted_at IS NULL`

A profile is **featured** (highlighted) only if:
1. `score_visibility >= 60`
2. `description IS NOT NULL`
3. `specialties IS NOT NULL`
4. Either `is_verified = true` OR `score_visibility >= 80`

### Duplicate Detection

```sql
-- Find potential duplicates by SIREN (same company, multiple SIRET)
SELECT siren, COUNT(*) as siret_count
FROM companies
WHERE status = 'active'
GROUP BY siren
HAVING COUNT(*) > 1;

-- Find potential duplicates by name + city
SELECT name, city_id, COUNT(*) as count
FROM companies
WHERE status = 'active'
GROUP BY name, city_id
HAVING COUNT(*) > 1;
```

**Resolution:** Merge lower-quality profile into higher-quality one. 301 redirect from old slug to new.

### Anti-Duplicate Content (Local Pages)

Each local page must have **>50% unique content** vs any other local page. Enforced by:
1. City-specific data (population, office stock, company count)
2. City-specific description (different intro text per city)
3. Unique company listings per city
4. City-specific FAQ questions

## RGPD Compliance

### What We Display Publicly (Legitimate Basis: Legal Obligation / Public Data)

| Data | Legal Basis | Notes |
|---|---|---|
| SIRET, SIREN, NAF | Public legal data (INSEE) | Mandatory public registration |
| Company name, address | Public legal data | From Sirene |
| Website | Publicly displayed by company | Scraped from public site |
| Description | Our editorial content | Written by us or enriched from public sources |

### What Requires Caution

| Data | Action Required |
|---|---|
| Phone number | Only if publicly displayed on company website or directory |
| Email | Professional email only (contact@company.fr), never personal |
| Individual names | Never display unless publicly traded/known |

### Rights of Data Subjects

```
On every company profile:
[Link: "Cette fiche vous concerne ?"]
  → Modal with options:
    - "Mettre à jour les informations" (update request)
    - "Supprimer cette fiche" (deletion request — requires proof of ownership)
    - "Réclamer cette fiche" (claim process)
```

**Deletion process:**
1. User submits request via form (email from company domain required)
2. Manual verification (check domain matches company)
3. Set `status = 'deleted'`, `deleted_at = now()`
4. Page returns 410 Gone
5. Remove from sitemap

## V2: Automated Enrichment Pipeline

When automation is activated (V2), the enrichment workflow will be:

```
Cron: Daily at 02:00
For each company WHERE enriched_at > 7 days ago OR score_visibility < 60:
  1. Scrape website (if exists) → extract services, contacts, description
  2. Search Google Business Profile → extract reviews, rating, photos
  3. AI enrichment → generate description, extract specialties, analyze positioning
  4. Update database → set enriched_data, update score_visibility
  5. Log enrichment_job → track source, confidence, changes
```

**V2 preparation in MVP:**
- `enriched_data` JSONB column exists (empty)
- `metadata` JSONB column stores import source
- Score algorithm is implemented
- Company update API endpoint exists

## Pages: Directory vs. Local

### Directory Profile Page (`/annuaire/[slug]`)

- Full company information
- Score visibility badge
- Map with location
- Reviews (if any)
- CTA: "Demander un devis" (→ R.P.)
- CTA: "Réclamer cette fiche"
- Related companies (same city, similar specialties)

### Local City Page (`/[ville]/societes-nettoyage`)

- City market overview
- 5-10 featured companies (highest score_visibility in radius)
- Map with all companies
- Pricing guide for the city
- "How to choose" city-specific advice
- FAQ (city-specific)
- CTA: "Obtenir des devis à [Ville]" (→ R.P.)
- Nearby cities

### Relationship

```
Local Page ──shows──► Company Cards (preview)
   │                        │
   │                        ▼
   └─────────────link────► Full Profile (/annuaire/[slug])
```
