-- ============================================================
-- 006_seed_softwares.sql
-- 5 software products — placeholder data, refine before publish.
-- Pricing and feature claims TO BE VERIFIED by the editorial team.
-- ============================================================

insert into softwares
  (name, slug, website, description_short, pricing_start, pricing_model,
   has_free_trial, has_free_plan, overall_score, is_featured, is_active)
values
  ('Proprely',  'proprely',  'https://proprely.fr',
   'Logiciel SaaS de gestion pour entreprises de nettoyage : planning, agents, devis, qualité.',
   49.00, 'per_user', true, false, 8.5, true, true),
  ('Progiclean', 'progiclean', 'https://progiclean.com',
   'ERP métier propreté historique : facturation, paie, planning.',
   159.00, 'flat', false, false, 7.8, false, true),
  ('2BePragma',  '2bepragma',  'https://2bepragma.com',
   'Logiciel de gestion d''entreprise de propreté avec module mobile agents.',
   89.00, 'flat', true, false, 7.5, false, true),
  ('Organilog',  'organilog',  'https://organilog.com',
   'Application terrain pour suivre les prestations de nettoyage en temps réel.',
   29.00, 'per_user', true, false, 7.2, false, true),
  ('Klipso',     'klipso',     'https://klipso.com',
   'Solution polyvalente de gestion d''interventions, utilisée par des entreprises de propreté.',
   45.00, 'per_user', true, false, 6.8, false, true)
on conflict (slug) do update set
  description_short = excluded.description_short,
  pricing_start = excluded.pricing_start,
  pricing_model = excluded.pricing_model,
  has_free_trial = excluded.has_free_trial,
  has_free_plan = excluded.has_free_plan,
  overall_score = excluded.overall_score,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  updated_at = now();
