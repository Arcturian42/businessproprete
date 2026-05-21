-- ============================================================
-- 002_enable_rls.sql
-- Row Level Security policies for the MVP.
-- Per /docs/09 §RLS Policies + the security boundary noted in
-- the approved plan: public SELECT on active content rows;
-- public INSERT on capture tables; service_role for the rest.
-- ============================================================

alter table cities                       enable row level security;
alter table companies                    enable row level security;
alter table company_reviews              enable row level security;
alter table company_claims               enable row level security;
alter table softwares                    enable row level security;
alter table comparisons                  enable row level security;
alter table comparison_software_scores   enable row level security;
alter table leads                        enable row level security;
alter table lead_magnets                 enable row level security;
alter table subscribers                  enable row level security;
alter table newsletter_sends             enable row level security;
alter table city_companies               enable row level security;
alter table tool_results                 enable row level security;

-- ------------------------------------------------------------
-- Public SELECT (only what's visible to anon)
-- ------------------------------------------------------------
create policy "Public can read active cities"
  on cities for select using (is_active = true);

create policy "Public can read active companies"
  on companies for select
  using (status = 'active' and deleted_at is null and score_visibility >= 20);

create policy "Public can read reviews"
  on company_reviews for select using (true);

create policy "Public can read active softwares"
  on softwares for select using (is_active = true);

create policy "Public can read published comparisons"
  on comparisons for select
  using (published_at is not null and published_at <= now());

create policy "Public can read comparison scores"
  on comparison_software_scores for select using (true);

create policy "Public can read active lead magnets"
  on lead_magnets for select using (is_active = true);

create policy "Public can read city↔company joins"
  on city_companies for select using (true);

-- ------------------------------------------------------------
-- Public INSERT on capture tables
-- ------------------------------------------------------------
create policy "Public can submit leads"
  on leads for insert with check (true);

create policy "Public can subscribe to the newsletter"
  on subscribers for insert with check (true);

create policy "Public can submit tool results"
  on tool_results for insert with check (true);

create policy "Public can submit company claims"
  on company_claims for insert with check (true);

create policy "Public can submit company reviews"
  on company_reviews for insert with check (true);

-- ------------------------------------------------------------
-- Service-role catch-all for editorial / admin operations.
-- Supabase's service_role bypasses RLS automatically; the
-- explicit policies below also allow elevated authenticated
-- roles if ever introduced.
-- ------------------------------------------------------------
create policy "Service role full access on companies"
  on companies for all using (auth.role() = 'service_role');

create policy "Service role full access on softwares"
  on softwares for all using (auth.role() = 'service_role');

create policy "Service role full access on comparisons"
  on comparisons for all using (auth.role() = 'service_role');

create policy "Service role full access on leads"
  on leads for all using (auth.role() = 'service_role');

create policy "Service role full access on subscribers"
  on subscribers for all using (auth.role() = 'service_role');

create policy "Service role full access on newsletter_sends"
  on newsletter_sends for all using (auth.role() = 'service_role');

create policy "Service role full access on tool_results"
  on tool_results for all using (auth.role() = 'service_role');

create policy "Service role full access on company_claims"
  on company_claims for all using (auth.role() = 'service_role');

create policy "Service role full access on lead_magnets"
  on lead_magnets for all using (auth.role() = 'service_role');
