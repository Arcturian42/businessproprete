# Propreté Business

Le média de référence du nettoyage professionnel en France.
Plateforme média-data B2B : guides, comparatifs logiciels, outils gratuits, mini-annuaire et pages locales.

## Sources de vérité

- **`/docs/`** — 17 fichiers de spécification : produit, SEO, GEO, schéma DB, roadmap.
- **`design.md`** — Direction artistique, design system, tokens, composants.
- **`/.claude/plans/`** — Plan d'implémentation MVP approuvé par l'utilisateur.

En cas de conflit, `design.md` prime sur `docs/12-frontend-ux-guidelines.md`.

## Stack

- **Next.js 14** App Router + TypeScript strict
- **Tailwind CSS 3** + tokens design.md
- **shadcn/ui** (Radix primitives)
- **Supabase** Postgres + PostGIS + RLS
- **MDX** pour le contenu éditorial (`/content/`)
- **react-hook-form** + Zod pour les formulaires
- **Brevo** pour la newsletter (env-gated)
- **Vercel** pour le déploiement (ISR)

## Démarrage local

```bash
npm install
cp .env.local.example .env.local
# Remplir les variables Supabase au minimum
npm run dev
```

## Scripts

- `npm run dev` — Serveur de développement
- `npm run build` — Build production
- `npm run start` — Lancement production
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`

## Marque & domaine

- **Marque publique** : Propreté Business
- **Tagline** : « Le média des professionnels de la propreté »
- **Domaine canonique** : `propretebusiness.fr`

## Écosystème

- [Proprely](https://proprely.fr) — SaaS de gestion pour entreprises de nettoyage
- [Réseau Propreté](https://reseauproprete.fr) — Annuaire et mise en relation B2B
