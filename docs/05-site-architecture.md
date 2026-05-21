# Site Architecture, Routing & URL Structure

## URL Strategy

All URLs are in French, lowercase, hyphen-separated (kebab-case). No accents in URLs (normalized). No trailing slashes (configured in Next.js).

| Rule | Example |
|---|---|
| French keywords | `/guides/grille-salaire-proprete-2025` not `/guide/salary-grid` |
| Hyphen separation | `/societe-nettoyage-lyon` |
| No accents | `/reglementation` not `/reglementation` (already normalized) |
| No trailing slash | `/guides` not `/guides/` |
| No query params for content pages | `/logiciels/proprely` not `/logiciel?id=proprely` |
| Year in URLs for annual content | `/grille-salaire-proprete-2025`, updated yearly with redirect |
| City names in local URLs | `/lyon/societes-nettoyage` |

## Complete Sitemap (MVP)

### Level 0: Homepage

```
/                          — Homepage (authority hub, featured content)
```

### Level 1: Hub Pages

```
/guides                    — Editorial guides hub
/reglementation           — Regulatory content hub
/logiciels                — Software comparison hub
/outils                   — Free tools hub
/annuaire                 — Directory landing page
/etudes                   — Data studies hub
/villes                   — Local pages index (list of covered cities)
/newsletter               — Newsletter subscription
/a-propos                 — About page
/contact                  — Contact page
```

### Level 2: Content Pages

```
/guides/[slug]            — Individual guide article (20 MVP)
  Ex: /guides/comment-choisir-societe-nettoyage-bureaux
  Ex: /guides/convention-collective-proprete-complete
  Ex: /guides/digitaliser-entreprise-nettoyage
  Ex: /guides/planning-agents-nettoyage-modeles
  Ex: /guides/recrutement-agents-entretien-guide

/reglementation/[slug]    — Regulatory article (5 MVP)
  Ex: /reglementation/idcc-3043-guide-complet
  Ex: /reglementation/majorations-nuit-week-end-nettoyage
  Ex: /reglementation/temps-deplacement-inter-sites
  Ex: /reglementation/obligations-employeur-securite
  Ex: /reglementation/attestation-Formation-Agents

/logiciels/[slug]         — Software detail page (5 MVP)
  Ex: /logiciels/proprely
  Ex: /logiciels/progiclean
  Ex: /logiciels/2bepragma
  Ex: /logiciels/organilog
  Ex: /logiciels/klipso

/comparatifs/[slug]       — Comparison page (3 MVP)
  Ex: /comparatifs/meilleur-logiciel-nettoyage-2025
  Ex: /comparatifs/proprely-vs-excel
  Ex: /comparatifs/logiciels-planning-nettoyage

/outils/[slug]            — Tool page (3 MVP)
  Ex: /outils/calculateur-prix-nettoyage
  Ex: /outils/calculateur-rentabilite-contrat
  Ex: /outils/generateur-devis-nettoyage

/etudes/[slug]            — Study page (2 MVP)
  Ex: /etudes/etat-marche-nettoyage-france-2025
  Ex: /etudes/barometre-digitalisation-proprete-2025
```

### Level 2: Local Pages (Programmatic)

```
/[ville]/societes-nettoyage    — Local city page (10 pilot)
  Ex: /paris/societes-nettoyage
  Ex: /lyon/societes-nettoyage
  Ex: /marseille/societes-nettoyage
  Ex: /bordeaux/societes-nettoyage
  Ex: /nantes/societes-nettoyage
  Ex: /lille/societes-nettoyage
  Ex: /toulouse/societes-nettoyage
  Ex: /strasbourg/societes-nettoyage
  Ex: /nice/societes-nettoyage
  Ex: /rennes/societes-nettoyage
```

**URL pattern for local pages**: `/{city-slug}/societes-nettoyage`
- City slug = normalized city name (lowercase, hyphens, no accents)
- Paris → `paris`, Saint-Étienne → `saint-etienne`

### Level 2: Directory Profiles

```
/annuaire/[slug]          — Company profile (200 MVP)
  Ex: /annuaire/cleanpro-lyon-693821456
  Ex: /annuaire/pro-net-paris-789123456
```

**URL pattern for profiles**: `/annuaire/{company-slug}-{siret-last-9}`
- Company slug = normalized company name
- SIRET suffix prevents collisions and signals uniqueness
- Example: "CleanPro Lyon" (SIRET 123 456 789 00012) → `/annuaire/cleanpro-lyon-45678900012`

### Level 3: Category/Filter Pages

```
/guides/categorie/[slug]  — Guides by category
  Ex: /guides/categorie/management
  Ex: /guides/categorie/reglementation
  Ex: /guides/categorie/logiciels

/annuaire/ville/[slug]    — Directory by city (alias of local page)
  Ex: /annuaire/ville/lyon

/annuaire/departement/[slug]  — Directory by department
  Ex: /annuaire/departement/rhone
```

### Static Pages

```
/mentions-legales         — Legal notice
/politique-confidentialite — Privacy policy
/cookies                  — Cookie policy
/plan-du-site             — HTML sitemap for users
```

## Navigation Structure

### Header Navigation (Desktop)

```
[LOGO]  Guides  Logiciels  Outils  Annuaire  Études  Villes     [Newsletter] [Rechercher]
         ▼         ▼         ▼        ▼         ▼       ▼
      ┌─────┐  ┌──────┐  ┌─────┐  ┌──────┐  ┌─────┐  ┌──────────┐
      │Réglementation│Comparatifs│Calculateur│Rechercher│État du marché│Paris      │
      │Management    │Top 2025   │de prix    │par ville │Baromètres   │Lyon       │
      │Logiciels     │Par critère│de rentab. │par dépt. │Méthodologie │Marseille  │
      │Recrutement   │           │générateur │spécialité│             │Bordeaux   │
      │Productivité  │           │de devis   │         │             │...        │
      └─────┘  └──────┘  └─────┘  └──────┘  └─────┘  └──────────┘
```

### Header Navigation (Mobile)

Hamburger menu with same categories, collapsed. Search icon opens overlay.

### Footer Navigation

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│   CONTENU    │   LOGICIELS  │    OUTILS    │   LÉGAL      │
│ Guides       │ Comparatifs  │ Calculateur  │ Mentions     │
│ Réglementation│ Classement  │  de prix     │ légales      │
│ Études       │ Avis logiciels│ Calculateur │ Confidentialité│
│ Newsletter   │              │ rentabilité  │ Cookies      │
│              │              │ Générateur   │ Plan du site │
│              │              │ de devis     │              │
├──────────────┴──────────────┴──────────────┴──────────────┤
│  © 2025 CleanP / Propreté Business — Média B2B nettoyage pro  │
│  Proprely.fr · ReseauProprete.fr                            │
└─────────────────────────────────────────────────────────────┘
```

### Breadcrumb Navigation

Every content page (below hub level) displays breadcrumbs:

```
Accueil > Guides > Réglementation > Grille salariale propreté 2025
Accueil > Logiciels > Proprely
Accueil > Lyon > Sociétés de nettoyage
```

Implementation: Schema.org BreadcrumbList + visible HTML breadcrumb.

## Internal Linking Rules

### Global Rules

| Rule | Specification |
|---|---|
| **Breadcrumb** | Every page > Level 1 has visible breadcrumbs with schema |
| **Related content** | Every article links to 3 related articles (same category or tags) |
| **Hub links** | Every article links back to its parent hub page |
| **Contextual links** | Minimum 3 internal contextual links per 1000 words |
| **Orphan prevention** | Every page must be reachable within 3 clicks from homepage |
| **Local interlinking** | Local pages link to nearby cities (radius 50km) |
| **Directory↔Local** | Directory profiles link to their city page; city pages link to relevant profiles |

### Link Distribution by Page Type

| Page Type | Links To | Receives From |
|---|---|---|
| Homepage | Hub pages, featured articles/tools, newsletter | — |
| Hub page | Child content pages, related hubs | Homepage, nav, breadcrumbs |
| Article | Related articles, hub page, 1 tool, newsletter | Hub, related articles, homepage |
| Software detail | Comparison pages, vendor CTA | Comparison pages, hub, search |
| Comparison | Software details, Proprely (contextual) | Hub, articles, search |
| Tool page | Related guide, newsletter | Hub, articles, search |
| Local page | 5-10 directory profiles, nearby cities, R.P. CTA | Directory, /villes, search |
| Directory profile | City page, claim CTA, quote CTA | Local pages, directory hub, search |

## Page Type Templates

### Template: Article (Guide)

```
┌─────────────────────────────────────────────────────────────┐
│ Breadcrumb: Accueil > Guides > Réglementation               │
├─────────────────────────────────────────────────────────────┤
│ Category badge: REGLEMENTATION                              │
│ H1: Grille salariale propreté 2025 : le guide complet       │
│ Meta: Publié le 15 janv. 2025 · Mis à jour le 20 mars 2025 │
│ Auteur: [Name] · [Photo] · Expert [domaine]                │
│ Temps de lecture: 12 min                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Table of Contents — sticky sidebar on desktop]            │
│                                                             │
│  ## Introduction                                            │
│  [BLUF — direct answer in first 50 words]                  │
│                                                             │
│  ## [H2 Section]                                            │
│  ### [H3 Subsection]                                        │
│  [Content with data, citations, expert quotes]             │
│                                                             │
│  > [Highlight box: key stat or key takeaway]                │
│                                                             │
│  [Data table if relevant]                                   │
│                                                             │
│  ## FAQ                                                     │
│  [5-10 Q/A pairs with FAQPage schema]                      │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  CTA BOX:                                               │ │
│ │  "Téléchargez la grille en PDF + calculateur heures"   │ │
│ │  [Email input] [Télécharger]                            │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ## Articles connexes                                       │
│ [3 cards with related articles]                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Newsletter: "Recevez chaque semaine l'essentiel de la      │
│ propreté B2B" [Email] [S'abonner]                          │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                      │
└─────────────────────────────────────────────────────────────┘
```

### Template: Local Page

```
┌─────────────────────────────────────────────────────────────┐
│ Breadcrumb: Accueil > Lyon                                  │
├─────────────────────────────────────────────────────────────┤
│ H1: Sociétés de nettoyage à Lyon : annuaire et guide       │
│ Sous-titre: 127 entreprises · 2,3M m² de bureaux ·        │
│             Métropole de 1,6M habitants                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Carte: Lyon + localisation des entreprises répertoriées]  │
│                                                             │
│  ## Le marché du nettoyage à Lyon                          │
│  [Données INSEE spécifiques à l'agglomération]             │
│                                                             │
│  ## Top entreprises de nettoyage à Lyon                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ [Fiche 1]│ │ [Fiche 2]│ │ [Fiche 3]│ │ [Fiche 4]│      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                             │
│  ## Tarifs du nettoyage à Lyon                             │
│  [Tableau prix moyens par type de prestation]              │
│                                                             │
│  ## Guide : choisir un prestataire à Lyon                  │
│  [Conseils spécifiques au contexte local]                  │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  CTA: "Obtenez 3 devis de nettoyage à Lyon gratuitement"│ │
│ │  [Type de prestation] [Surface] [Email] [Demander]      │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  Villes voisines: Villeurbanne · Bron · Saint-Priest ...   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                      │
└─────────────────────────────────────────────────────────────┘
```

### Template: Directory Profile

```
┌─────────────────────────────────────────────────────────────┐
│ Breadcrumb: Accueil > Annuaire > CleanPro Lyon              │
├─────────────────────────────────────────────────────────────┤
│ H1: CleanPro Lyon — Entreprise de nettoyage                 │
│ SIRET: 123 456 789 00012 · NAF: 8121Z · Créée en 2018      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Score visibilité: 72/100] [Badge: Vérifié]               │
│                                                             │
│  ## Informations                                            │
│  📍 45 rue de la République, 69002 Lyon                    │
│  📞 04 72 XX XX XX                                         │
│  🌐 www.cleanpro-lyon.fr                                    │
│  📧 contact@cleanpro-lyon.fr                                │
│  👥 Effectif: 15-20 salariés                                │
│                                                             │
│  ## Spécialités                                             │
│  Nettoyage de bureaux · Nettoyage industriel · Vitres       │
│                                                             │
│  ## Zone d'intervention                                     │
│  [Carte avec périmètre coloré]                              │
│  Lyon, Villeurbanne, Bron, Saint-Priest, Vénissieux        │
│                                                             │
│  ## Présentation                                            │
│  [Description enrichie par IA — 150-200 mots]              │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Demander un  │  │ Revendiquer  │  │ Voir plus    │      │
│  │ devis        │  │ cette fiche  │  │ d'entreprises│      │
│  │ (R.P.)       │  │              │  │ à Lyon       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Footer                                                      │
└─────────────────────────────────────────────────────────────┘
```

## Redirects & URL Evolution

| Scenario | Rule |
|---|---|
| Content update (new year) | `/grille-salaire-2024` → 301 → `/grille-salaire-2025` |
| Slug change | Old slug → 301 → new slug (tracked in DB) |
| City name change | Keep canonical slug, update display name |
| Profile merge (duplicate SIRET) | Lower-quality profile → 301 → canonical profile |
| Pilot city expansion | `/lyon/societes-nettoyage` (pilot) becomes template for all cities |
