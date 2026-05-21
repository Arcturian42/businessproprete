-- ============================================================
-- 004_search_functions.sql
-- Full-text search helper for the directory.
-- ============================================================

create or replace function search_companies(
  search_query  text default null,
  city_filter   uuid default null,
  specialty     text default null,
  page_size     integer default 20,
  page_offset   integer default 0
)
returns setof companies
language plpgsql
stable
as $$
begin
  return query
  select c.*
  from companies c
  where c.status = 'active'
    and c.deleted_at is null
    and c.score_visibility >= 20
    and (
      search_query is null
      or to_tsvector('french', c.name || ' ' || coalesce(c.description, ''))
         @@ websearch_to_tsquery('french', search_query)
    )
    and (city_filter is null or c.city_id = city_filter)
    and (specialty is null or specialty = any (c.specialties))
  order by c.score_visibility desc, c.name asc
  limit page_size
  offset page_offset;
end;
$$;
