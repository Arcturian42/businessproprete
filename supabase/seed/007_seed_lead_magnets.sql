-- ============================================================
-- 007_seed_lead_magnets.sql
-- Initial gated content entries.
-- file_url left null — populate once PDFs uploaded to Supabase
-- Storage by the editorial team.
-- ============================================================

insert into lead_magnets
  (slug, title, description, content_type, content_url, is_active)
values
  ('grille-salaire-proprete-2025-pdf',
   'Grille salariale propreté 2025 — guide PDF',
   'Tous les salaires minimaux par échelon (IDCC 3043) en 2025, majorations et coût complet d''un agent.',
   'pdf',
   '/reglementation/grille-salaire-proprete-2025',
   true),
  ('checklist-audit-digitalisation',
   'Check-list audit digitalisation (20 points)',
   'Auto-évaluation de la maturité digitale de votre entreprise de nettoyage.',
   'checklist',
   '/guides/digitaliser-entreprise-nettoyage',
   true),
  ('modeles-planning-excel-nettoyage',
   'Modèles de planning Excel pour entreprises de nettoyage',
   '3 templates : planning hebdomadaire, rotation mensuelle, planning de congés.',
   'template',
   '/guides/gerer-agents-proprete',
   true)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  content_type = excluded.content_type,
  content_url = excluded.content_url,
  is_active = excluded.is_active;
