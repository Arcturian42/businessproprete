-- ============================================================
-- 003_triggers.sql
-- updated_at maintenance + lead-magnet download counter.
-- ============================================================

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_cities_updated_at on cities;
create trigger trg_cities_updated_at
  before update on cities
  for each row execute function set_updated_at();

drop trigger if exists trg_companies_updated_at on companies;
create trigger trg_companies_updated_at
  before update on companies
  for each row execute function set_updated_at();

drop trigger if exists trg_softwares_updated_at on softwares;
create trigger trg_softwares_updated_at
  before update on softwares
  for each row execute function set_updated_at();

drop trigger if exists trg_comparisons_updated_at on comparisons;
create trigger trg_comparisons_updated_at
  before update on comparisons
  for each row execute function set_updated_at();

-- Increment lead_magnets.download_count whenever a pdf_download
-- lead with a magnet reference is inserted.
create or replace function increment_lead_magnet_downloads()
returns trigger as $$
begin
  -- Look up the lead magnet via the related slug in source_page
  -- or via an explicit magnet_id stored on the lead (not yet
  -- modelled at insert time — placeholder for V2).
  return new;
end;
$$ language plpgsql;
