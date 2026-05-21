# Database Schema

## Overview

Supabase PostgreSQL with PostGIS extension. Schema designed for MVP with V2 automation hooks built in.

**Key principles:**
- All tables have `created_at` and `updated_at` timestamps
- Soft deletes where applicable (`deleted_at`)
- UUID primary keys for security (no sequential IDs exposed)
- JSONB fields for flexible attributes (V2 enrichment)
- Row Level Security (RLS) enabled on all tables
- Full-text search vectors pre-computed

## Entity Relationship Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     cities      │     │    companies    │     │  company_reviews│
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (uuid)       │◄────┤ id (uuid)       │────►│ id (uuid)       │
│ name            │     │ city_id         │     │ company_id      │
│ slug            │     │ name            │     │ rating          │
│ slug_normalized │     │ slug            │     │ review_text     │
│ department_code │     │ siret           │     │ author_name     │
│ department_name │     │ siren           │     │ created_at      │
│ region          │     │ naf_code        │     └─────────────────┘
│ population      │     │ naf_label       │
│ office_surface  │     │ address         │     ┌─────────────────┐
│ cleaning_count  │     │ postal_code     │     │  company_claims │
│ lat             │     │ city_id         │────►├─────────────────┤
│ lng             │     │ phone           │     │ id (uuid)       │
│ is_active       │     │ email           │     │ company_id      │
│ is_pilot        │     │ website         │     │ claimant_name   │
│ created_at      │     │ employee_count  │     │ claimant_email  │
└─────────────────┘     │ revenue_range   │     │ status          │
                        │ description     │     │ created_at      │
┌─────────────────┐     │ specialties     │     └─────────────────┘
│  comparisons    │     │ service_area    │
├─────────────────┤     │ lat             │     ┌─────────────────┐
│ id (uuid)       │     │ lng             │     │     leads       │
│ software_a_id   │────►│ score_visibility│     ├─────────────────┤
│ software_b_id   │────►│ is_verified     │     │ id (uuid)       │
│ slug            │     │ is_premium      │     │ lead_type       │
│ title           │     │ status          │     │ source_page     │
│ content         │     │ enriched_data   │◄────│ source_url      │
│ verdict         │     │ metadata        │     │ email           │
│ winner_id       │     │ created_at      │     │ company_name    │
│ published_at    │     │ updated_at      │     │ phone           │
│ created_at      │     │ deleted_at      │     │ company_size    │
└─────────────────┘     └─────────────────┘     │ message         │
                                                │ score           │
┌─────────────────┐     ┌─────────────────┐     │ status          │
│   softwares     │     │  comparisons    │     │ sent_to_proprely│
├─────────────────┤     │   (junction)    │     │ sent_to_rp      │
│ id (uuid)       │◄────├─────────────────┤     │ created_at      │
│ name            │     │ comparison_id   │     └─────────────────┘
│ slug            │     │ software_id     │
│ website         │     │ score           │
│ logo_url        │     │ pros            │
│ description     │     │ cons            │
│ pricing_start   │     └─────────────────┘
│ pricing_model   │
│ has_free_trial  │     ┌─────────────────┐
│ has_free_plan   │     │  lead_magnets   │
│ features        │     ├─────────────────┤
│ pros            │     │ id (uuid)       │
│ cons            │     │ slug            │
│ overall_score   │     │ title           │
│ is_active       │     │ description     │
│ created_at      │     │ content_url     │
│ updated_at      │     │ file_url        │
└─────────────────┘     │ emails_sent     │
                        │ emails_opened   │
┌─────────────────┐     │ created_at      │
│  city_companies │     └─────────────────┘
├─────────────────┤     
│ city_id         │     ┌─────────────────┐
│ company_id      │     │  subscribers    │
│ distance_km     │     ├─────────────────┤
│ is_primary      │     │ id (uuid)       │
└─────────────────┘     │ email           │
                        │ first_name      │
┌─────────────────┐     │ company_name    │
│  newsletter_sends     │ company_size    │
├─────────────────┤     │ source          │
│ id (uuid)       │     │ lead_magnet_id  │
│ subject         │     │ tags            │
│ content_html    │     │ is_active       │
│ sent_at         │     │ unsubscribed_at │
│ open_count      │     │ created_at      │
│ click_count     │     └─────────────────┘
│ created_at      │
└─────────────────┘
```

## Table Definitions

### cities

Pilot cities for MVP. V2: expand to all 350+ French cities >20k inhabitants.

```sql
CREATE TABLE cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  slug_normalized text NOT NULL UNIQUE, -- lowercase, no accents, hyphens
  department_code text NOT NULL,
  department_name text NOT NULL,
  region text NOT NULL,
  population integer,
  office_surface bigint, -- estimated office surface in m²
  cleaning_company_count integer, -- from Sirene
  lat decimal(10,8),
  lng decimal(11,8),
  is_active boolean DEFAULT true,
  is_pilot boolean DEFAULT false, -- TRUE for MVP 10 cities
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_cities_slug ON cities(slug);
CREATE INDEX idx_cities_department ON cities(department_code);
CREATE INDEX idx_cities_region ON cities(region);
CREATE INDEX idx_cities_pilot ON cities(is_pilot) WHERE is_pilot = true;
```

**MVP seed:** 10 pilot cities (Paris, Lyon, Marseille, Bordeaux, Nantes, Lille, Toulouse, Strasbourg, Nice, Rennes)

### companies

Directory profiles. MVP: 200 manually imported. V2: auto-import from Sirene API.

```sql
CREATE TABLE companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL,
  siret text UNIQUE, -- 14 digits
  siren text, -- 9 digits
  naf_code text, -- e.g. "8121Z"
  naf_label text, -- e.g. "Nettoyage courant des bâtiments"
  address text,
  postal_code text,
  city_id uuid REFERENCES cities(id),
  phone text,
  email text,
  website text,
  employee_count integer, -- estimated from Sirene range
  revenue_range text, -- e.g. "500K-1M"
  description text, -- enriched description (AI or manual)
  specialties text[], -- e.g. {"bureaux", "industriel", "vitres"}
  service_area text[], -- city names served
  lat decimal(10,8),
  lng decimal(11,8),
  score_visibility integer DEFAULT 0 CHECK (score_visibility >= 0 AND score_visibility <= 100),
  is_verified boolean DEFAULT false, -- manually verified
  is_premium boolean DEFAULT false, -- paid enhanced profile
  status text DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended', 'deleted')),
  
  -- V2 enrichment fields (nullable at MVP)
  enriched_data jsonb DEFAULT '{}', -- flexible storage for V2 enrichment
  metadata jsonb DEFAULT '{}', -- source info, import batch, etc.
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz -- soft delete
);

-- Indexes
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_city ON companies(city_id);
CREATE INDEX idx_companies_siret ON companies(siret);
CREATE INDEX idx_companies_naf ON companies(naf_code);
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_companies_score ON companies(score_visibility DESC);
CREATE INDEX idx_companies_specialties ON companies USING GIN(specialties);
CREATE INDEX idx_companies_search ON companies USING gin(to_tsvector('french', name || ' ' || COALESCE(description, '')));
```

### company_reviews

User reviews on directory profiles. MVP: basic. V2: verified purchases only.

```sql
CREATE TABLE company_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  author_name text,
  author_email text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_reviews_company ON company_reviews(company_id);
```

### company_claims

Profile ownership claims. Manual verification in MVP.

```sql
CREATE TABLE company_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id),
  claimant_name text NOT NULL,
  claimant_email text NOT NULL,
  claimant_phone text,
  proof_document_url text, -- uploaded doc (KBIS extract)
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz
);

CREATE INDEX idx_claims_company ON company_claims(company_id);
CREATE INDEX idx_claims_status ON company_claims(status);
```

### softwares

Software products for comparison engine.

```sql
CREATE TABLE softwares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  website text,
  logo_url text,
  description text,
  description_short text, -- 1-2 sentences for cards
  pricing_start decimal(10,2), -- monthly price in EUR
  pricing_model text, -- "per_user", "flat", "custom"
  has_free_trial boolean DEFAULT false,
  has_free_plan boolean DEFAULT false,
  features jsonb DEFAULT '{}', -- structured feature list
  pros text[],
  cons text[],
  overall_score decimal(3,1) CHECK (overall_score >= 0 AND overall_score <= 10),
  is_featured boolean DEFAULT false, -- highlighted on hub
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_softwares_slug ON softwares(slug);
CREATE INDEX idx_softwares_active ON softwares(is_active) WHERE is_active = true;
```

**MVP seed:** Proprely, Progiclean, 2BePragma, Organilog, Klipso

### comparisons

Software comparison articles.

```sql
CREATE TABLE comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  content text, -- main comparison text (can reference MDX)
  verdict text, -- BLUF verdict
  winner_id uuid REFERENCES softwares(id),
  comparison_type text DEFAULT 'head_to_head' CHECK (comparison_type IN ('head_to_head', 'ranking', 'category')),
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_comparisons_slug ON comparisons(slug);
```

### comparison_software_scores

Junction table with per-criterion scores.

```sql
CREATE TABLE comparison_software_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comparison_id uuid NOT NULL REFERENCES comparisons(id) ON DELETE CASCADE,
  software_id uuid NOT NULL REFERENCES softwares(id) ON DELETE CASCADE,
  criterion_key text NOT NULL, -- e.g. "planning", "agent_management"
  score integer CHECK (score >= 0 AND score <= 10),
  pros text[],
  cons text[],
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(comparison_id, software_id, criterion_key)
);

CREATE INDEX idx_css_comparison ON comparison_software_scores(comparison_id);
CREATE INDEX idx_css_software ON comparison_software_scores(software_id);
```

### leads

Captured leads from all sources.

```sql
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_type text NOT NULL CHECK (lead_type IN ('tool_use', 'pdf_download', 'quote_request', 'newsletter', 'profile_claim', 'demo_request', 'contact')),
  source_page text, -- page where lead was captured
  source_url text, -- full URL
  email text NOT NULL,
  company_name text,
  phone text,
  company_size text, -- "1-9", "10-49", "50-249", "250+"
  message text,
  
  -- Scoring
  score integer DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  
  -- Routing
  status text DEFAULT 'new' CHECK (status IN ('new', 'nurturing', 'qualified', 'sent_proprely', 'sent_rp', 'converted', 'lost')),
  sent_to_proprely boolean DEFAULT false,
  sent_to_rp boolean DEFAULT false,
  
  -- Metadata
  utm_source text,
  utm_medium text,
  utm_campaign text,
  user_agent text,
  ip_address text,
  
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_leads_type ON leads(lead_type);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_score ON leads(score DESC);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
```

### lead_magnets

Gated content / lead magnet library.

```sql
CREATE TABLE lead_magnets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  content_type text CHECK (content_type IN ('pdf', 'tool', 'checklist', 'template', 'guide')),
  content_url text, -- URL to content (if hosted)
  file_url text, -- URL to file (PDF, etc.)
  file_size_bytes integer,
  download_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_lm_slug ON lead_magnets(slug);
```

### subscribers

Newsletter subscribers + lead magnet downloaders.

```sql
CREATE TABLE subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  first_name text,
  company_name text,
  company_size text,
  source text, -- where they subscribed (page/slug)
  lead_magnet_id uuid REFERENCES lead_magnets(id),
  tags text[] DEFAULT '{}', -- e.g. {"reglementation", "logiciels"}
  
  -- Engagement tracking
  emails_sent integer DEFAULT 0,
  emails_opened integer DEFAULT 0,
  emails_clicked integer DEFAULT 0,
  last_engagement_at timestamptz,
  
  is_active boolean DEFAULT true,
  unsubscribed_at timestamptz,
  unsubscribe_reason text,
  
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_active ON subscribers(is_active) WHERE is_active = true;
CREATE INDEX idx_subscribers_tags ON subscribers USING GIN(tags);
```

### newsletter_sends

Email campaign tracking.

```sql
CREATE TABLE newsletter_sends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  content_html text NOT NULL,
  content_text text,
  sent_at timestamptz,
  recipient_count integer DEFAULT 0,
  open_count integer DEFAULT 0,
  click_count integer DEFAULT 0,
  bounce_count integer DEFAULT 0,
  unsubscribe_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_ns_sent ON newsletter_sends(sent_at DESC);
```

### city_companies (Junction)

Links companies to cities they serve (many-to-many with distance).

```sql
CREATE TABLE city_companies (
  city_id uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  distance_km decimal(6,2), -- distance from city center to company
  is_primary boolean DEFAULT false, -- company's main city
  PRIMARY KEY (city_id, company_id)
);

CREATE INDEX idx_cc_city ON city_companies(city_id);
CREATE INDEX idx_cc_company ON city_companies(company_id);
CREATE INDEX idx_cc_distance ON city_companies(distance_km);
```

## Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE softwares ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparison_software_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_sends ENABLE ROW LEVEL SECURITY;

-- Public read policies (no auth needed for viewing)
CREATE POLICY "Public can read active companies" ON companies
  FOR SELECT USING (status = 'active' AND deleted_at IS NULL);

CREATE POLICY "Public can read reviews" ON company_reviews
  FOR SELECT USING (true);

CREATE POLICY "Public can read active softwares" ON softwares
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read comparisons" ON comparisons
  FOR SELECT USING (published_at IS NOT NULL AND published_at <= now());

CREATE POLICY "Public can read comparison scores" ON comparison_software_scores
  FOR SELECT USING (true);

-- Admin write policies (service role only)
CREATE POLICY "Admin full access companies" ON companies
  FOR ALL USING (auth.role() = 'service_role');

-- Leads: public can insert, admin can read all
CREATE POLICY "Public can create leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can read own leads" ON leads
  FOR SELECT USING (false); -- No public read

-- Subscribers: public can insert, admin can read
CREATE POLICY "Public can subscribe" ON subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can update own subscription" ON subscribers
  FOR UPDATE USING (email = auth.email());
```

## Triggers

```sql
-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_softwares_updated_at BEFORE UPDATE ON softwares
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comparisons_updated_at BEFORE UPDATE ON comparisons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-increment lead magnet download count
CREATE OR REPLACE FUNCTION increment_lead_magnet_downloads()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE lead_magnets SET download_count = download_count + 1
  WHERE id = NEW.lead_magnet_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER after_lead_capture_on_magnet
  AFTER INSERT ON leads
  FOR EACH ROW
  WHEN (NEW.lead_type = 'pdf_download')
  EXECUTE FUNCTION increment_lead_magnet_downloads();
```

## Full-Text Search

```sql
-- Function for searching companies
CREATE OR REPLACE FUNCTION search_companies(search_query text, city_filter uuid DEFAULT NULL)
RETURNS SETOF companies AS $$
BEGIN
  RETURN QUERY
  SELECT c.*
  FROM companies c
  WHERE 
    (search_query IS NULL OR to_tsvector('french', c.name || ' ' || COALESCE(c.description, '')) @@ plainto_tsquery('french', search_query))
    AND (city_filter IS NULL OR c.city_id = city_filter)
    AND c.status = 'active'
    AND c.deleted_at IS NULL
  ORDER BY c.score_visibility DESC, c.name ASC;
END;
$$ LANGUAGE plpgsql;
```

## Migration Order

Run migrations in this order:

1. `001_initial_schema.sql` — All CREATE TABLE statements
2. `002_enable_rls.sql` — RLS policies
3. `003_triggers.sql` — Triggers
4. `004_search_functions.sql` — Full-text search
5. `005_seed_cities.sql` — 10 pilot cities
6. `006_seed_softwares.sql` — 5 software products
7. `007_seed_companies.sql` — 200 initial companies (manual)
8. `008_seed_comparisons.sql` — 3 initial comparisons
9. `009_seed_lead_magnets.sql` — Initial lead magnets

## V2 Tables (Future — Do Not Create Yet)

Documented here so the schema doesn't need migration when V2 starts:

```sql
-- V2: Automated content generation tracking
-- content_generation_jobs (
--   id, status, content_type, prompt, output, score, reviewed_by, published_id
-- )

-- V2: Enrichment tracking
-- enrichment_jobs (
--   id, company_id, source, data_type, raw_data, processed_data, status
-- )

-- V2: SEO monitoring
-- seo_rankings (
--   id, url, keyword, position, search_volume, tracked_at
-- )

-- V2: GEO monitoring
-- geo_citations (
--   id, query, engine, cited_url, citation_text, position, tracked_at
-- )

-- V2: Content refresh tracking
-- content_refresh_queue (
--   id, content_type, content_id, last_refresh, refresh_due, priority
-- )
```
