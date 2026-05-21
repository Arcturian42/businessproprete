-- ============================================================
-- 001_initial_schema.sql
-- Propreté Business — MVP schema
-- Source of truth: /docs/09-database-schema.md
-- ============================================================

-- PostGIS for radius queries on cities/companies. pgvector NOT
-- enabled in MVP (documented in /docs/14 V2 prep).
create extension if not exists postgis;
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

-- ------------------------------------------------------------
-- cities
-- ------------------------------------------------------------
create table if not exists cities (
  id                       uuid primary key default gen_random_uuid(),
  name                     text not null,
  slug                     text not null unique,
  slug_normalized          text not null unique,
  department_code          text not null,
  department_name          text not null,
  region                   text not null,
  population               integer,
  office_surface           bigint,
  cleaning_company_count   integer,
  lat                      decimal(10, 8),
  lng                      decimal(11, 8),
  is_active                boolean default true,
  is_pilot                 boolean default false,
  created_at               timestamptz default now(),
  updated_at               timestamptz default now()
);
create index if not exists idx_cities_slug         on cities(slug);
create index if not exists idx_cities_department   on cities(department_code);
create index if not exists idx_cities_region       on cities(region);
create index if not exists idx_cities_pilot        on cities(is_pilot) where is_pilot = true;

-- ------------------------------------------------------------
-- companies (directory)
-- ------------------------------------------------------------
create table if not exists companies (
  id                       uuid primary key default gen_random_uuid(),
  name                     text not null,
  slug                     text not null,
  siret                    text unique,
  siren                    text,
  naf_code                 text,
  naf_label                text,
  address                  text,
  postal_code              text,
  city_id                  uuid references cities(id) on delete set null,
  phone                    text,
  email                    text,
  website                  text,
  employee_count           integer,
  revenue_range            text,
  description              text,
  specialties              text[] default '{}',
  service_area             text[] default '{}',
  lat                      decimal(10, 8),
  lng                      decimal(11, 8),
  score_visibility         integer default 0 check (score_visibility between 0 and 100),
  is_verified              boolean default false,
  is_premium               boolean default false,
  status                   text   default 'active' check (status in ('active','pending','suspended','deleted')),
  enriched_data            jsonb  default '{}'::jsonb,
  metadata                 jsonb  default '{}'::jsonb,
  created_at               timestamptz default now(),
  updated_at               timestamptz default now(),
  deleted_at               timestamptz
);
create index if not exists idx_companies_slug        on companies(slug);
create index if not exists idx_companies_city        on companies(city_id);
create index if not exists idx_companies_siret       on companies(siret);
create index if not exists idx_companies_naf         on companies(naf_code);
create index if not exists idx_companies_status      on companies(status);
create index if not exists idx_companies_score       on companies(score_visibility desc);
create index if not exists idx_companies_specialties on companies using gin (specialties);
create index if not exists idx_companies_search
  on companies using gin (to_tsvector('french', name || ' ' || coalesce(description, '')));

-- ------------------------------------------------------------
-- company_reviews
-- ------------------------------------------------------------
create table if not exists company_reviews (
  id            uuid primary key default gen_random_uuid(),
  company_id    uuid not null references companies(id) on delete cascade,
  rating        integer not null check (rating between 1 and 5),
  review_text   text,
  author_name   text,
  author_email  text,
  is_verified   boolean default false,
  created_at    timestamptz default now()
);
create index if not exists idx_reviews_company on company_reviews(company_id);

-- ------------------------------------------------------------
-- company_claims (profile ownership claims)
-- ------------------------------------------------------------
create table if not exists company_claims (
  id                   uuid primary key default gen_random_uuid(),
  company_id           uuid not null references companies(id) on delete cascade,
  claimant_name        text not null,
  claimant_email       text not null,
  claimant_phone       text,
  proof_document_url   text,
  status               text default 'pending' check (status in ('pending','approved','rejected')),
  admin_notes          text,
  created_at           timestamptz default now(),
  processed_at         timestamptz
);
create index if not exists idx_claims_company on company_claims(company_id);
create index if not exists idx_claims_status  on company_claims(status);

-- ------------------------------------------------------------
-- softwares
-- ------------------------------------------------------------
create table if not exists softwares (
  id                     uuid primary key default gen_random_uuid(),
  name                   text not null,
  slug                   text not null unique,
  website                text,
  logo_url               text,
  description            text,
  description_short      text,
  pricing_start          decimal(10, 2),
  pricing_model          text,
  has_free_trial         boolean default false,
  has_free_plan          boolean default false,
  features               jsonb default '{}'::jsonb,
  pros                   text[] default '{}',
  cons                   text[] default '{}',
  overall_score          decimal(3, 1) check (overall_score between 0 and 10),
  is_featured            boolean default false,
  is_active              boolean default true,
  created_at             timestamptz default now(),
  updated_at             timestamptz default now()
);
create index if not exists idx_softwares_slug   on softwares(slug);
create index if not exists idx_softwares_active on softwares(is_active) where is_active = true;

-- ------------------------------------------------------------
-- comparisons
-- ------------------------------------------------------------
create table if not exists comparisons (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique,
  title              text not null,
  content            text,
  verdict            text,
  winner_id          uuid references softwares(id) on delete set null,
  comparison_type    text default 'head_to_head' check (comparison_type in ('head_to_head','ranking','category')),
  seo_title          text,
  seo_description    text,
  published_at       timestamptz,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);
create index if not exists idx_comparisons_slug on comparisons(slug);

-- ------------------------------------------------------------
-- comparison_software_scores (per-criterion scoring)
-- ------------------------------------------------------------
create table if not exists comparison_software_scores (
  id              uuid primary key default gen_random_uuid(),
  comparison_id   uuid not null references comparisons(id) on delete cascade,
  software_id     uuid not null references softwares(id) on delete cascade,
  criterion_key   text not null,
  score           integer check (score between 0 and 10),
  pros            text[] default '{}',
  cons            text[] default '{}',
  notes           text,
  created_at      timestamptz default now(),
  unique (comparison_id, software_id, criterion_key)
);
create index if not exists idx_css_comparison on comparison_software_scores(comparison_id);
create index if not exists idx_css_software   on comparison_software_scores(software_id);

-- ------------------------------------------------------------
-- leads (unified capture — replaces prompt's contact_requests)
-- ------------------------------------------------------------
create table if not exists leads (
  id                 uuid primary key default gen_random_uuid(),
  lead_type          text not null check (lead_type in
    ('tool_use','pdf_download','quote_request','newsletter','profile_claim','demo_request','contact')),
  source_page        text,
  source_url         text,
  email              text not null,
  company_name       text,
  phone              text,
  company_size       text check (company_size in ('1-9','10-49','50-249','250+')),
  message            text,
  score              integer default 0 check (score between 0 and 100),
  status             text default 'new' check (status in
    ('new','nurturing','qualified','sent_proprely','sent_rp','converted','lost')),
  sent_to_proprely   boolean default false,
  sent_to_rp         boolean default false,
  utm_source         text,
  utm_medium         text,
  utm_campaign       text,
  user_agent         text,
  ip_address         text,
  created_at         timestamptz default now()
);
create index if not exists idx_leads_type    on leads(lead_type);
create index if not exists idx_leads_status  on leads(status);
create index if not exists idx_leads_email   on leads(email);
create index if not exists idx_leads_score   on leads(score desc);
create index if not exists idx_leads_created on leads(created_at desc);

-- ------------------------------------------------------------
-- lead_magnets
-- ------------------------------------------------------------
create table if not exists lead_magnets (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  title             text not null,
  description       text,
  content_type      text check (content_type in ('pdf','tool','checklist','template','guide')),
  content_url       text,
  file_url          text,
  file_size_bytes   integer,
  download_count    integer default 0,
  is_active         boolean default true,
  created_at        timestamptz default now()
);
create index if not exists idx_lm_slug on lead_magnets(slug);

-- ------------------------------------------------------------
-- subscribers (newsletter)
-- ------------------------------------------------------------
create table if not exists subscribers (
  id                       uuid primary key default gen_random_uuid(),
  email                    text not null unique,
  first_name               text,
  company_name             text,
  company_size             text check (company_size in ('1-9','10-49','50-249','250+')),
  source                   text,
  lead_magnet_id           uuid references lead_magnets(id) on delete set null,
  tags                     text[] default '{}',
  emails_sent              integer default 0,
  emails_opened            integer default 0,
  emails_clicked           integer default 0,
  last_engagement_at       timestamptz,
  is_active                boolean default true,
  unsubscribed_at          timestamptz,
  unsubscribe_reason       text,
  created_at               timestamptz default now()
);
create index if not exists idx_subscribers_email  on subscribers(email);
create index if not exists idx_subscribers_active on subscribers(is_active) where is_active = true;
create index if not exists idx_subscribers_tags   on subscribers using gin (tags);

-- ------------------------------------------------------------
-- newsletter_sends
-- ------------------------------------------------------------
create table if not exists newsletter_sends (
  id                  uuid primary key default gen_random_uuid(),
  subject             text not null,
  content_html        text not null,
  content_text        text,
  sent_at             timestamptz,
  recipient_count     integer default 0,
  open_count          integer default 0,
  click_count         integer default 0,
  bounce_count        integer default 0,
  unsubscribe_count   integer default 0,
  created_at          timestamptz default now()
);
create index if not exists idx_ns_sent on newsletter_sends(sent_at desc);

-- ------------------------------------------------------------
-- city_companies (many-to-many with distance)
-- ------------------------------------------------------------
create table if not exists city_companies (
  city_id      uuid not null references cities(id) on delete cascade,
  company_id   uuid not null references companies(id) on delete cascade,
  distance_km  decimal(6, 2),
  is_primary   boolean default false,
  primary key (city_id, company_id)
);
create index if not exists idx_cc_city     on city_companies(city_id);
create index if not exists idx_cc_company  on city_companies(company_id);
create index if not exists idx_cc_distance on city_companies(distance_km);

-- ------------------------------------------------------------
-- tool_results (anonymous calculator analytics)
-- Extra table beyond /docs/09 — justified in /.claude/plans §5.
-- ------------------------------------------------------------
create table if not exists tool_results (
  id            uuid primary key default gen_random_uuid(),
  tool_slug     text not null,
  inputs        jsonb not null,
  outputs       jsonb not null,
  session_id    text,
  lead_id       uuid references leads(id) on delete set null,
  source_page   text,
  user_agent    text,
  ip_hash       text,
  created_at    timestamptz default now()
);
create index if not exists idx_tool_results_slug    on tool_results(tool_slug);
create index if not exists idx_tool_results_lead    on tool_results(lead_id);
create index if not exists idx_tool_results_created on tool_results(created_at desc);
