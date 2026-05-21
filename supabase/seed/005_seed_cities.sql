-- ============================================================
-- 005_seed_cities.sql
-- 10 pilot cities — INSEE figures hardcoded.
-- Mirrors lib/data/cities.ts (TS-side single source of truth).
-- ============================================================

insert into cities
  (name, slug, slug_normalized, department_code, department_name, region,
   population, office_surface, cleaning_company_count, lat, lng, is_pilot)
values
  ('Paris',      'paris',      'paris',      '75', 'Paris',              'Île-de-France',                  2103000, 53000000, 2400, 48.8566,  2.3522, true),
  ('Lyon',       'lyon',       'lyon',       '69', 'Rhône',              'Auvergne-Rhône-Alpes',            522000,  6400000,  520,  45.7640,  4.8357, true),
  ('Marseille',  'marseille',  'marseille',  '13', 'Bouches-du-Rhône',   'Provence-Alpes-Côte d''Azur',     873000,  3900000,  610,  43.2965,  5.3698, true),
  ('Bordeaux',   'bordeaux',   'bordeaux',   '33', 'Gironde',            'Nouvelle-Aquitaine',              261000,  2100000,  240,  44.8378, -0.5792, true),
  ('Nantes',     'nantes',     'nantes',     '44', 'Loire-Atlantique',   'Pays de la Loire',                320000,  2500000,  220,  47.2184, -1.5536, true),
  ('Lille',      'lille',      'lille',      '59', 'Nord',               'Hauts-de-France',                 236000,  3200000,  380,  50.6292,  3.0573, true),
  ('Toulouse',   'toulouse',   'toulouse',   '31', 'Haute-Garonne',      'Occitanie',                       504000,  4100000,  360,  43.6047,  1.4442, true),
  ('Strasbourg', 'strasbourg', 'strasbourg', '67', 'Bas-Rhin',           'Grand Est',                       291000,  1700000,  190,  48.5734,  7.7521, true),
  ('Nice',       'nice',       'nice',       '06', 'Alpes-Maritimes',    'Provence-Alpes-Côte d''Azur',     348000,  1400000,  240,  43.7102,  7.2620, true),
  ('Rennes',     'rennes',     'rennes',     '35', 'Ille-et-Vilaine',    'Bretagne',                        222000,  1500000,  170,  48.1173, -1.6778, true)
on conflict (slug) do update set
  population = excluded.population,
  office_surface = excluded.office_surface,
  cleaning_company_count = excluded.cleaning_company_count,
  lat = excluded.lat,
  lng = excluded.lng,
  is_pilot = excluded.is_pilot,
  updated_at = now();
