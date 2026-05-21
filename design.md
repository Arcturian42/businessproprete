# Propreté Business — Direction Artistique, Design System & Charte Graphique

## 1. Brand Positioning Visuel

### Personnalité de marque

Propreté Business est un média-data B2B français. Visuellement, il doit communiquer : **autorité, clarté, utilité, modernité**. Ce n'est ni un blog amateur, ni un SaaS aux couleurs criardes, ni un site institutionnel figé. C'est une plateforme professionnelle vivante, pensée pour des décideurs qui manquent d'information structurée dans leur secteur.

La personnalité visuelle s'articule autour de trois pôles :

- **Le média éditorial** — lisibilité, hiérarchie claire, contenu scanable, confiance par la qualité de la présentation.
- **La plateforme data** — chiffres visibles, données bien traitées, tableaux professionnels, sensation d'expertise chiffrée.
- **Le guide pratique** — orientation action, outils faciles à trouver, CTAs utiles pas intrusifs.

### Perception souhaitée

Le visiteur doit percevoir Propreté Business comme :

> "La référence sérieuse et moderne sur le secteur de la propreté. Pas du marketing creux, pas du contenu IA cheap. De la donnée, du conseil et des outils faits par des gens qui connaissent le métier."

### Émotions à transmettre

| Émotion | Comment |
|---|---|
| **Confiance** | Palette sobre, typographie structurée, sources citées, badges de vérification |
| **Clarté** | Espacement généreux, hiérarchie typographique nette, sections bien délimitées |
| **Efficacité** | Navigation rapide, outils en évidence, réponses directes, pas de friction |
| **Professionnalisme** | Ton visuel B2B corporate, cartes soignées, alignements précis |
| **Accessibilité** | Pas d'effets superflus, contenu lisible par tous, PME-friendly |

### Références stylistiques possibles

- **Les Echos / Le Monde (version numérique)** — densité d'info, typographie éditoriale, sobriété
- **BPI France (guides)** — clarté B2B, composants simples, orientation action
- **Stripe / Linear (composants)** — cartes propres, micro-interactions, structure modulaire
- **Statista / INSEE (data)** — présentation des chiffres lisible, tableaux crédibles
- **Gusto / Wave (outils)** — UX de calculateurs simples, formulaires clairs

### Ce qu'il faut éviter absolument

- ❌ **Le site SaaS IA générique** — gradients bleus-violets, blobs flous, illustrations 3D cheap, effets néon
- ❌ **Le blog amateur** — thème WordPress basique, pas de design system, CTA pop-up intrusifs, bannières moches
- ❌ **Le site trop institutionnel** — gris terne, serif classique, absence de modernité, images corporate bancaires
- ❌ **Le site startup décalé** — couleurs flashy, emoji partout, ton trop décontracté, animations lourdes
- ❌ **Le site "écologique"** — vert dominant, feuilles, nature, ton prêcheur écolo
- ❌ **Le site médical** — bleu clair stérile, blanc immaculé, photos de labos
- ❌ **L'AI slop visuel** — images générées par IA reconnaissables, illustrations sans sens, mélange incohérent de styles

---

## 2. Design Principles

### 12 principes fondamentaux

| # | Principe | Description |
|---|---|---|
| 1 | **Lisibilité avant effet visuel** | Le contenu est roi. Chaque pixel doit servir à lire, comprendre ou agir. Pas d'embellissement gratuit. |
| 2 | **Crédibilité avant originalité** | Un média B2B sérieux ne surprend pas par le style. Il convainc par la qualité. Le design soutient la crédibilité. |
| 3 | **Hiérarchie d'information claire** | H1 > H2 > H3 > body > caption. Jamais d'ambiguïté sur ce qui est important. |
| 4 | **Densité d'information maîtrisée** | Ni trop vide (perte d'intérêt), ni trop dense (perte de lisibilité). Équilibre editorial. |
| 5 | **Composants modulaires réutilisables** | Chaque élément UI est un composant React cohérent. Pas de style inline, pas de duplication. |
| 6 | **Mobile-first mais desktop-first en contenu** | Le design fonctionne parfaitement sur mobile, mais l'expérience complète se déploie sur desktop (TOC, sidebars, tableaux). |
| 7 | **CTAs visibles mais non agressifs** | Le guide d'action est clair sans être intrusif. Pas de popup, pas de bannières flashy, pas de manipulation dark pattern. |
| 8 | **Le blanc est une couleur** | Les espaces vides structurent le contenu. Pas de remplissage compulsif. Le blanc/cream offre de l'air. |
| 9 | **Les données sont des héros** | Les chiffres, tableaux, statistiques sont mis en valeur visuellement. Ils ne sont pas noyés dans du texte. |
| 10 | **La fraîcheur par le vert, pas la nature** | Le vert est un signal (validation, propreté, succès), pas un thème. Il ne domine jamais. |
| 11 | **La cohérence page à page** | Même structure, mêmes espacements, mêmes composants. Le visiteur ne doit jamais se demander où il est. |
| 12 | **Performance visuelle = Performance SEO** | Pas d'images lourdes, pas d'animations qui ralentissent le LCP. Le design est léger, le rendu est rapide. |

---

## 3. Palette de Couleurs

### Couleurs principales

| Nom | Hex | Usage recommandé | Usage interdit | Exemple UI |
|---|---|---|---|---|
| **Brand Blue** | `#1A56DB` | CTA primaires, liens, badges principaux, header accents | Ne pas utiliser pour le texte de corps | Bouton principal, liens cliquables |
| **Brand Blue Dark** | `#1E429F` | Hover sur CTAs, header logo, emphase forte | Ne pas utiliser comme background large | Hover bouton, texte de marque |
| **Deep Navy** | `#0B1628` | Header background, hero backgrounds sombres, sections premium | Ne pas utiliser pour le texte de corps (trop sombre) | Header, footer dark variant |
| **Secondary Blue** | `#3B82F6` | Icônes, badges secondaires, éléments interactifs secondaires | Ne pas remplacer le Brand Blue pour les CTA primaires | Icônes de section, bordures actives |
| **Accent Green** | `#059669` | Validation, succès, badges "vérifié", accents propreté, ton positif | Ne jamais utiliser comme couleur dominante de page | Badge vérifié, bordure succès, check icon |
| **Soft Green** | `#D1FAE5` | Background subtil pour les blocs de réussite, badges légers | Ne pas utiliser comme couleur de texte | Background badge "vérifié" |

### Couleurs de fond

| Nom | Hex | Usage |
|---|---|---|
| **Background Primary** | `#FFFFFF` | Fond de page par défaut |
| **Background Off-White** | `#F8FAFC` | Fonds alternés de sections (zebra), cards légères |
| **Background Cream** | `#F1F5F9` | Fonds de sections encadrées, blocs de contenu isolés |
| **Surface Dark** | `#0F172A` | Hero sections sombres, CTAs premium, footer |

### Couleurs de texte

| Nom | Hex | Usage |
|---|---|---|
| **Text Primary** | `#0F172A` | Titres H1-H3, texte principal, labels |
| **Text Secondary** | `#334155` | Corps de texte, descriptions, paragraphes |
| **Text Muted** | `#64748B` | Captions, dates, auteurs, sources, meta info |
| **Text On Dark** | `#F8FAFC` | Texte sur fond sombre (navy) |
| **Text On Brand** | `#FFFFFF` | Texte sur bouton Brand Blue |

### Couleurs fonctionnelles

| Nom | Hex | Usage |
|---|---|---|
| **Success** | `#059669` | Validation, succès, profil vérifié, action réussie |
| **Success Light** | `#D1FAE5` | Background de notification succès |
| **Warning** | `#D97706` | Attention modérée, alerte non bloquante |
| **Warning Light** | `#FEF3C7` | Background warning |
| **Error** | `#DC2626` | Erreurs, champs invalides, alertes bloquantes |
| **Error Light** | `#FEE2E2` | Background erreur |
| **Info** | `#1A56DB` | Information, conseil, hint |
| **Info Light** | `#DBEAFE` | Background info |

### Couleurs de bordure

| Nom | Hex | Usage |
|---|---|---|
| **Border Light** | `#E2E8F0` | Bordures de cards, inputs au repos, séparateurs |
| **Border Medium** | `#CBD5E1` | Bordures d'inputs focus, hover de cards |
| **Border Dark** | `#94A3B8` | Bordures de tableaux, éléments désactivés |

### Règles d'utilisation

- **Le Brand Blue (#1A56DB)** est la seule couleur de CTA primaire. Un seul CTA primaire visible à la fois par section.
- **Le vert (#059669)** n'apparaît jamais en zone de plus de 64×64 px. C'est un accent, pas un thème.
- **Le Deep Navy (#0B1628)** peut être utilisé pour le header et des sections hero sombres, mais jamais comme fond de page de base.
- **Pas de gradients** sauf overlay sombre sur des photos hero (`linear-gradient(to bottom, rgba(11,22,40,0.7), rgba(11,22,40,0.4))`).
- **Pas de transparents bizarres** — les overlays utilisent des noirs/navy opaques.
- **Contraste minimum** — toute combinaison texte/fond doit passer WCAG AA (ratio 4.5:1 minimum).

---

## 4. Typographie

### Police principale : Inter

Inter est la font par défaut de shadcn/ui et Tailwind. C'est une sans-serif moderne, conçue pour les écrans, excellente en lisibilité à toutes les tailles. Parfait pour un média B2B.

- **Charge via** : `next/font/google`
- **Fallback** : `system-ui, -apple-system, sans-serif`

### Police monospace : JetBrains Mono

Utilisée uniquement pour les données chiffrées, les codes, les résultats de calculateurs.

- **Charge via** : `next/font/google`
- **Usage** : prix, statistiques, grilles de scores, SIRET

### Échelle typographique

| Élément | Desktop | Mobile | Font | Weight | Line-Height | Letter-Spacing | Couleur |
|---|---|---|---|---|---|---|---|
| **H1** | 40px / 2.5rem | 28px / 1.75rem | Inter | 700 | 1.15 | -0.02em | `#0F172A` |
| **H1 Hero (dark)** | 48px / 3rem | 32px / 2rem | Inter | 700 | 1.1 | -0.02em | `#F8FAFC` |
| **H2** | 32px / 2rem | 24px / 1.5rem | Inter | 600 | 1.2 | -0.01em | `#0F172A` |
| **H3** | 24px / 1.5rem | 20px / 1.25rem | Inter | 600 | 1.3 | — | `#0F172A` |
| **H4** | 18px / 1.125rem | 16px / 1rem | Inter | 600 | 1.35 | — | `#334155` |
| **Body Large** | 18px / 1.125rem | 16px / 1rem | Inter | 400 | 1.7 | — | `#334155` |
| **Body** | 16px / 1rem | 16px / 1rem | Inter | 400 | 1.7 | — | `#334155` |
| **Body Small** | 14px / 0.875rem | 14px / 0.875rem | Inter | 400 | 1.6 | — | `#334155` |
| **Caption** | 12px / 0.75rem | 12px / 0.75rem | Inter | 500 | 1.4 | 0.01em | `#64748B` |
| **Label** | 12px / 0.75rem | 12px / 0.75rem | Inter | 600 | 1.4 | 0.02em | `#64748B` |
| **Button** | 14px / 0.875rem | 14px / 0.875rem | Inter | 600 | 1 | — | variable |
| **Button Large** | 16px / 1rem | 16px / 1rem | Inter | 600 | 1 | — | variable |
| **Data Large** | 48px / 3rem | 36px / 2.25rem | JetBrains Mono | 700 | 1.1 | -0.02em | `#0F172A` |
| **Data Medium** | 32px / 2rem | 24px / 1.5rem | JetBrains Mono | 600 | 1.15 | -0.01em | `#0F172A` |
| **Data Small** | 16px / 1rem | 16px / 1rem | JetBrains Mono | 600 | 1.3 | — | `#334155` |

### Règles de lisibilité

- **Longueur de ligne** : max 70 caractères pour le texte courant (prose). Utiliser `max-w-prose` (65ch) pour les articles.
- **Paragraphes** : marge inférieure de `1.5rem` (24px) entre paragraphes.
- **Interlignage** : jamais moins de 1.6 pour le texte courant.
- **Gras** : réservé aux titres, labels, et emphases ciblées. Pas de paragraphes entiers en gras.
- **Italique** : réservé aux citations, mentions, noms d'ouvrages.
- **Liens dans le texte** : couleur Brand Blue (#1A56DB), soulignement au hover. Pas de soulignement permanent (sauf footnotes).

---

## 5. Layout System

### Container

```
Max-width : 1280px (xl) pour le contenu, 1536px (2xl) pour les hero full-width
Padding horizontal : 16px mobile, 24px tablet, 32px desktop
Centrage : mx-auto
```

### Grille

- **Système** : Grid CSS / Tailwind grid
- **Desktop** : 12 colonnes, gap 24px
- **Tablet** : 8 colonnes, gap 20px
- **Mobile** : 1 colonne (stack), gap 16px
- **Article layout** : 8 colonnes contenu + 4 colonnes sidebar (desktop uniquement)

### Breakpoints

| Nom | Largeur | Usage principal |
|---|---|---|
| **sm** | 640px | Petit mobile paysage |
| **md** | 768px | Tablet — sidebar disparaît, grille 2 cols |
| **lg** | 1024px | Desktop — layout complet, sidebar visible |
| **xl** | 1280px | Large desktop — max-width atteint |
| **2xl** | 1536px | Extra large — hero full-width |

### Spacing Scale

Basé sur Tailwind (4 = 1rem = 16px). Utilisations préférées :

| Token | Valeur | Usage |
|---|---|---|
| `space-1` | 4px | Gaps internes micro (icon + text) |
| `space-2` | 8px | Petit gap inline |
| `space-3` | 12px | Padding interne compact |
| `space-4` | 16px | Padding standard cards, gap grille mobile |
| `space-6` | 24px | Gap grille desktop, padding sections internes |
| `space-8` | 32px | Padding vertical de sections |
| `space-10` | 40px | Séparation entre blocs importants |
| `space-12` | 48px | Espacement de sections |
| `space-16` | 64px | Grand espacement entre sections majeures |
| `space-20` | 80px | Hero padding, sections premium |

### Sections

Chaque section de page suit le pattern :

```
<section class="py-12 md:py-16 lg:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Contenu -->
  </div>
</section>
```

Alternance de fonds : `bg-white` → `bg-slate-50` → `bg-white` → `bg-slate-50` (zebra). Les sections CTA premium utilisent `bg-slate-900` (dark).

### Cards

```
- Background : #FFFFFF (sur fond alterné) ou #FFFFFF (sur fond blanc avec border)
- Border : 1px solid #E2E8F0
- Border-radius : 12px (rounded-xl)
- Padding : 24px (p-6)
- Shadow : none par défaut, shadow-sm au hover
- Hover : border-color → #CBD5E1, translateY(-2px), transition 200ms
```

---

## 6. UI Components Guidelines

### Header

```
- Hauteur : 64px desktop, 56px mobile
- Fond : #0B1628 (Deep Navy) ou #FFFFFF avec ombre subtile au scroll
- Logo : à gauche, texte "Propreté Business" en Inter 700, 18px, #FFFFFF (dark) / #0F172A (light)
- Navigation : centré ou à droite, liens en Inter 500, 14px, #94A3B8 (dark) / #64748B (light), hover #FFFFFF / #0F172A
- CTA Newsletter : bouton fantôme (outline) à droite
- Mobile : hamburger menu (Sheet shadcn), overlay plein écran
- Sticky : fixed top, z-50, backdrop-blur si fond transparent au scroll
- Transition au scroll : fond opaque avec ombre après 50px de scroll
```

### Footer

```
- Fond : #0F172A (Surface Dark)
- Texte : #94A3B8, titres de colonnes #F8FAFC
- 4 colonnes desktop : Contenu / Logiciels / Outils / Légal
- Bas : copyright "© 2025 Propreté Business — Média B2B du secteur de la propreté"
- Liens vers Proprely.fr et ReseauProprete.fr en texte small
- Padding : py-16 px-4
```

### Hero Section (Homepage)

```
- Fond : #0B1628 avec overlay subtil (optionnel : photo de fond floutée + overlay navy 70%)
- H1 : 48px (desktop), 32px (mobile), Inter 700, #F8FAFC
- Sous-titre : 18px, Inter 400, #94A3B8, max-w-2xl
- CTA primaire : bouton Brand Blue, "Consulter les guides"
- CTA secondaire : bouton outline blanc, "Découvrir les outils"
- Stats bar : 3-4 chiffres clés en dessous (border-top sur la barre), chiffres en JetBrains Mono 700, 32px, #FFFFFF
- Padding : py-20 md:py-24
```

### ArticleCard

```
- Card blanche, border #E2E8F0, rounded-xl
- Image : 16:9, rounded-t-xl uniquement (object-cover)
- Catégorie badge : en haut à gauche, petit pill #DBEAFE fond, #1A56DB texte
- Titre : H4, 2 lignes max (line-clamp-2)
- Extrait : Body Small, #64748B, 2 lignes max
- Métas : caption, #64748B — date + temps de lecture
- Hover : shadow-sm, border #CBD5E1, translateY(-2px)
```

### GuideCard

```
- Variante d'ArticleCard sans image (ou avec icône à gauche)
- Icône : 48×48, fond #F1F5F9, rounded-lg, icône Lucide #1A56DB
- Titre : H4
- Description : Body Small, 2 lignes
- "Lire le guide" : lien Brand Blue avec flèche →
```

### ToolCard

```
- Card avec fond #F8FAFC (légèrement différent du fond)
- Icône grande (64×64) : fond Brand Blue light (#DBEAFE), icône #1A56DB, rounded-xl
- Titre : H3
- Description : body text
- CTA : bouton Brand Blue outline "Utiliser l'outil"
- Padding : p-8
- Hover : fond blanc, shadow-md, translateY(-4px) — plus prononcé que les cards standards
```

### CompanyCard (Annuaire)

```
- Card blanche, border #E2E8F0, rounded-xl
- Badge score en haut à droite : pill coloré selon le score (vert/orange/rouge)
- Nom : H4, #0F172A
- SIRET : Caption, JetBrains Mono, #64748B
- Adresse : Caption, #64748B
- Spécialités : row de petits badges #F1F5F9 fond, #334155 texte
- CTA : "Voir la fiche" lien Brand Blue
```

### CTASection

```
- Fond : #0F172A (dark)
- Padding : py-16
- Titre : H2, #F8FAFC, centré
- Description : Body Large, #94A3B8, centré, max-w-xl
- Bouton : Brand Blue primaire, centré
- Optionnel : un petit élément de confiance en dessous ("Rejoignez 2 400+ professionnels")
```

### FAQBlock

```
- Utilise shadcn Accordion
- Container : max-w-3xl, centré
- Titre de section : H2, centré
- Items : border-bottom #E2E8F0, padding py-4
- Question : Inter 600, 16px, #0F172A
- Réponse : Inter 400, 16px, #334155, padding-bottom pt-2
- Icône + / - : #1A56DB, transition rotate 200ms
```

### ComparisonTable

```
- Table shadcn avec personnalisation
- Header : fond #F1F5F9, texte #0F172A, font-weight 600, 14px
- Lignes : alternance blanc / #F8FAFC
- Cellule gagnante (meilleur score) : bordure gauche #059669 3px, fond #ECFDF5 léger
- Scores : JetBrains Mono, 14px, bold
- Étoiles : icônes Lucide, #F59E0B (filled) / #E2E8F0 (empty)
- Mobile : horizontal scroll avec colonne critères sticky à gauche
```

### Breadcrumbs

```
- Texte : Caption, #64748B
- Séparateur : "/" ou chevron →, #CBD5E1
- Page courante : #0F172A, pas de lien
- Container : sous le header, py-3, border-bottom #F1F5F9 optionnel
```

### TableOfContents

```
- Sidebar sticky (desktop uniquement, lg:block)
- Position : top-24 (sous header sticky)
- Titre : "Sommaire", Label style, #64748B
- Items : Caption size, #64748B, hover #1A56DB
- Item actif : #1A56DB, font-weight 500, border-left 2px #1A56DB
- Scroll spy : highlight l'item correspondant à la section visible
- Smooth scroll au clic
```

### LeadForm / NewsletterForm

```
- Input : h-11 (44px), border #E2E8F0, rounded-lg, focus ring #1A56DB, placeholder #94A3B8
- Label : Label style, #334155
- Bouton submit : Brand Blue, h-11, rounded-lg, px-6
- Erreur : border #DC2626, texte #DC2626, 12px
- Succès : message vert, icône check, fond #ECFDF5
- Checkbox RGPD : texte 12px, #64748B
```

### CalculatorForm

```
- Fieldsets bien délimités avec border #E2E8F0, rounded-xl, p-6
- Labels clairs au-dessus des inputs
- Inputs numériques : JetBrains Mono pour la cohérence data
- Sliders : track #E2E8F0, thumb #1A56DB, active track #1A56DB
- Résultat : fond #0F172A, texte blanc, padding p-8, rounded-xl, chiffre principal en Data Large
- Bouton "Calculer" : Brand Blue
- Bouton "Réinitialiser" : outline, #64748B
```

### DirectoryFilters

```
- Barre de filtres : fond #F8FAFC, border #E2E8F0, rounded-xl, p-4
- Input recherche : large, avec icône loupe #94A3B8 à gauche
- Selects : ville, spécialité, taille — style shadcn Select
- Bouton "Réinitialiser" : outline small
- Compteur de résultats : "127 entreprises trouvées", Caption, #64748B
- Responsive : filtres en accordéon collapsible sur mobile
```

### Badges

| Type | Style |
|---|---|
| **Catégorie** | `#DBEAFE` fond, `#1A56DB` texte, rounded-full, px-2.5 py-0.5, text-xs font-medium |
| **Vérifié** | `#ECFDF5` fond, `#059669` texte, rounded-full, avec icône check 12px |
| **Premium** | `#FEF3C7` fond, `#D97706` texte, rounded-full |
| **Score** | dynamique selon valeur : vert >70, orange 40-70, rouge <40 |
| **Nouveau** | `#FEE2E2` fond, `#DC2626` texte, rounded-full |

### Buttons

| Variante | Fond | Texte | Bordure | Hover | Usage |
|---|---|---|---|---|---|
| **Primary** | `#1A56DB` | `#FFFFFF` | none | `#1E429F` | CTA principal |
| **Secondary** | `#F1F5F9` | `#0F172A` | none | `#E2E8F0` | CTA secondaire |
| **Outline** | transparent | `#1A56DB` | 1px `#1A56DB` | `#DBEAFE` fond | CTA alternatif |
| **Outline Dark** | transparent | `#F8FAFC` | 1px `#F8FAFC` | `rgba(255,255,255,0.1)` | Sur fond sombre |
| **Ghost** | transparent | `#64748B` | none | `#F1F5F9` | Navigation, actions mineures |
| **Danger** | `#DC2626` | `#FFFFFF` | none | `#B91D1D` | Suppression, désactivation |

Tailles : `sm` (h-8, px-3, text-sm), `md` (h-10, px-4, text-sm), `lg` (h-11, px-6, text-base), `xl` (h-12, px-8, text-lg).

Border-radius : rounded-lg (8px) par défaut, rounded-full pour les pills.

### Inputs

```
- Hauteur : h-11 (44px)
- Fond : #FFFFFF
- Bordure : 1px solid #E2E8F0
- Border-radius : rounded-lg (8px)
- Padding : px-4
- Placeholder : #94A3B8
- Focus : ring-2 ring-blue-500 ring-offset-2, border #1A56DB
- Erreur : border #DC2626, focus ring #DC2626
- Disabled : bg #F1F5F9, text #94A3B8
```

### Tabs

```
- Fond barre : #F8FAFC, rounded-lg, p-1
- Tab actif : bg #FFFFFF, shadow-sm, text #0F172A, font-weight 600, rounded-md
- Tab inactif : text #64748B, hover #334155
- Transition : background 150ms
- Mobile : horizontal scroll si nécessaire
```

### Alert Messages

```
- Info : #DBEAFE fond, bordure gauche #1A56DB 4px, icône info #1A56DB
- Success : #D1FAE5 fond, bordure gauche #059669 4px, icône check #059669
- Warning : #FEF3C7 fond, bordure gauche #D97706 4px, icône alert #D97706
- Error : #FEE2E2 fond, bordure gauche #DC2626 4px, icône X #DC2626
- Padding : p-4, rounded-r-lg
```

### Empty States

```
- Icône centrée : 64×64, #CBD5E1
- Titre : H4, #64748B
- Description : body small, #94A3B8
- CTA optionnel : bouton outline
- Exemple : "Aucune entreprise trouvée pour cette recherche"
```

---

## 7. Page-Specific Design Guidance

### Homepage

**Première impression** : Le visiteur doit comprendre en 3 secondes que c'est une référence B2B sur la propreté en France.

**Structure des sections :**

1. **Hero** (fond navy)
   - H1 : "Le média de référence du nettoyage professionnel en France"
   - Sous-titre : "Guides, données, comparatifs et outils pour les dirigeants d'entreprises de propreté"
   - CTA primaire : "Consulter les guides"
   - CTA secondaire : "Découvrir les outils"

2. **Stats Bar** (fond blanc, border-top)
   - 4 chiffres clés en ligne : CA du marché, nombre d'entreprises, emplois, taux de croissance
   - Chiffres en JetBrains Mono 700, 32px
   - Labels en caption, #64748B

3. **Derniers Guides** (fond slate-50)
   - Titre H2 : "Guides pratiques"
   - Sous-titre : "Des ressources concrètes pour votre entreprise"
   - Grid de 3 ArticleCards
   - Lien "Voir tous les guides →"

4. **Outils Gratuits** (fond blanc)
   - Titre H2 : "Outils gratuits"
   - 3 ToolCards en grid
   - Lien "Tous les outils →"

5. **Comparatifs Logiciels** (fond slate-50)
   - Titre H2 : "Comparer les logiciels de propreté"
   - Preview du tableau comparatif (3 logiciels, 5 critères)
   - CTA : "Voir le comparatif complet"

6. **Annuaire Preview** (fond blanc)
   - Titre H2 : "Trouver une entreprise de nettoyage"
   - Barre de recherche large avec ville
   - 4-6 CompanyCards
   - CTA : "Consulter l'annuaire"

7. **CTA Newsletter** (fond navy)
   - Titre H2 blanc : "Ne manquez pas les mises à jour du secteur"
   - Formulaire email inline (input + bouton côte à côte)
   - Mention : "Un email par semaine. Désinscription à tout moment."

### Guides (Articles)

**Objectif** : Lecture fluide, extraction facile, navigation claire.

```
Layout :
┌────────────────────────────────────────────────────┐
│ Breadcrumb                                         │
├──────────────────────┬─────────────────────────────┤
│                      │                             │
│  H1                  │  Sommaire (sticky)          │
│  Meta (date, auteur) │                             │
│                      │  • Section 1                │
│  BLUF box            │  • Section 2                │
│  (encadré bleu)      │  • Section 3                │
│                      │  • FAQ                      │
│  ## Section 1        │                             │
│  Texte...            │  ─────────────────          │
│                      │  CTA Lead Magnet            │
│  > Encadré citation  │  (sticky sidebar)           │
│                      │                             │
│  ## Section 2        │  ─────────────────          │
│  Texte...            │  Guides connexes            │
│                      │                             │
│  | Tableau |         │                             │
│                      │                             │
│  ## FAQ              │                             │
│  (accordion)         │                             │
│                      │                             │
│  ────────────────────┼─────────────────────────────┤
│  CTA final           │                             │
│  Articles connexes   │                             │
└──────────────────────┴─────────────────────────────┘
```

**Éléments spécifiques :**

- **BLUF Box** : fond `#DBEAFE`, border-left `#1A56DB` 4px, padding p-4, texte #0F172A. Contient la réponse directe en 2-3 phrases.
- **Encadrés "À retenir"** : fond `#F0FDF4`, border `#059669`, icône check verte. Padding p-4.
- **Encadrés "Attention"** : fond `#FEF3C7`, border `#D97706`, icône warning. Padding p-4.
- **Encadrés "Données"** : fond `#F8FAFC`, border `#E2E8F0`, chiffres en JetBrains Mono.
- **Tableaux** : style shadcn Table, header `#F1F5F9`, alternance de lignes, bordures `#E2E8F0`.
- **FAQ** : shadcn Accordion, max-w-3xl, questions en font-weight 600.
- **CTA contextuel** : après le 2ème H2, un encadré avec lead magnet (fond `#F8FAFC`, border `#E2E8F0`).

### Logiciels / Comparatifs

**Objectif** : Comparaison neutre et transparente qui oriente vers Proprely subtilement.

- **Ton visuel** : neutre, professionnel, data-driven.
- **Le tableau comparatif** est l'élément central. Il occupe toute la largeur.
- **Software cards** : image/logo 80×80, nom, score global (badge coloré), prix, CTA.
- **CTA Proprely** : contextuel, jamais intrusif. "Tester Proprely gratuitement" dans la ligne Proprely du tableau. Pas de bannière publicitaire.
- **Méthodologie** : section explicative visible, transparente.

### Outils Gratuits

**Objectif** : L'utilisateur calcule, obtient de la valeur, et on capte son email.

- **Page outil** : 2 colonnes (desktop)
  - **Gauche (60%)** : le formulaire de calcul
  - **Droite (40%)** : explication de la méthode, FAQ courte, preuves sociales
- **Formulaire** : fieldsets clairs, labels explicites, inputs numériques avec unités (€, m², h)
- **Résultat** : apparaît avec une animation douce (fade-in 300ms). Chiffre principal en Data Large sur fond navy.
- **Capture email** : le résultat détaillé est envoyé par email. Champ email + consentement RGPD.
- **CTA final** : lien vers article connexe ou comparaison logicielle.

### Annuaire

**Objectif** : Trouver une entreprise de nettoyage. Sérieux, de confiance.

- **Page hub** :
  - Barre de recherche large, centrée (comme Google mais plus petite)
  - Filtres en ligne : ville (select), spécialité (select), taille (select)
  - Compteur : "X entreprises répertoriées"
  - Grid de CompanyCards (3 colonnes desktop, 2 tablet, 1 mobile)
  - Pagination en bas

- **Page ville** (`/lyon/societes-nettoyage`):
  - Hero local : H1 "Entreprises de nettoyage à Lyon", stats locales
  - Carte (placeholder ou Leaflet) avec pins
  - Liste des entreprises
  - Guide local : "Comment choisir un prestataire à Lyon"
  - CTA devis : encadré amber "Obtenir 3 devis gratuits"

- **Fiche entreprise** (`/annuaire/[slug]`):
  - Header : nom, score badge, SIRET
  - 2 colonnes : infos (gauche) + carte + CTA (droite)
  - Données structurées visibles (pas cachées dans des onglets)
  - CTA "Demander un devis" (amber outline, prominent)
  - CTA "Réclamer cette fiche" (ghost button)
  - Entreprises similaires en dessous

### Observatoire / Études

**Objectif** : Présenter des données chiffrées avec autorité.

- **Hero data** : 3-4 gros chiffres en Data Large, centré
- **Sections** : chaque section = un graphique ou un tableau + interprétation
- **Graphiques** : simples, propres, sans effet 3D. Utiliser des bar charts ou line charts basiques.
- **Blocs "À retenir"** : encadrés verts avec icône check, résumé en bullet points
- **Téléchargement** : bouton outline pour télécharger le PDF complet
- **Source des données** : toujours mentionnée, caption style

---

## 8. Imagery and Visual Assets

### Photos

**Usage** : Photos réalistes, pas d'illustrations IA.

**Sujets appropriés :**
- Bureaux propres et modernes (après nettoyage)
- Équipes de nettoyage en uniforme professionnel
- Matériel de nettoyage professionnel (autolaveuses, aspirateurs industriels)
- Détails de surfaces propres (sol brillant, vitre sans trace)
- Espaces professionnels (open space, hall d'entrée, salle de réunion)
- Dirigeants / responsables d'exploitation (portraits professionnels)

**Style photo :**
- Lumière naturelle ou studio propre
- Pas de flash dur
- Couleurs réalistes, pas de filtres Instagram
- Biais vers les bleus et gris (cohérence charte)
- Évitez : sourires forcés, poses corporate excessive, photos de stock évidentes

**Où utiliser :**
- Hero homepage (background flouté + overlay navy)
- Cards d'articles (thumbnail 16:9)
- Fiches entreprises (photo d'accueil si fournie)
- Pages guides (illustration contextuelle)

### Icônes

**Style** : Lucide icons (inclus avec shadcn/ui). Style outline, stroke-width 1.5-2, pas de fill.

**Usage par section :**

| Section | Icônes typiques |
|---|---|
| Guides | `BookOpen`, `FileText`, `CheckCircle`, `AlertTriangle` |
| Logiciels | `Monitor`, `Settings`, `Gauge`, `Smartphone` |
| Outils | `Calculator`, `BarChart3`, `FileSpreadsheet`, `TrendingUp` |
| Annuaire | `Building2`, `MapPin`, `Phone`, `Globe`, `Search` |
| Réglementation | `Scale`, `Shield`, `FileCheck`, `Clock` |
| Navigation | `ChevronRight`, `ChevronDown`, `Menu`, `X`, `Search` |

**Tailles :**
- Navigation : 20px
- Cards : 24px
- Feature sections : 48px (avec fond rond #F1F5F9)
- Tool icons : 64px (avec fond arrondi #DBEAFE)

### Illustrations

**Règle : minimales.** Préférer les icônes + données aux illustrations décoratives.

Si illustration nécessaire :
- Style : flat, simple, 2-3 couleurs max (bleu + vert + gris)
- Pas de gradients
- Pas de 3D
- Pas de personnages cartoon
- Usage : diagrammes explicatifs, schémas de processus, infographies data

### Graphiques et Data Visualization

- **Bar charts** : fond transparent, barres #1A56DB (primaire) et #3B82F6 (secondaire)
- **Line charts** : ligne #1A56DB, area fill #DBEAFE à 30% d'opacité
- **Pie charts** : éviter. Préférer les barres horizontales.
- **Nombres clés** : JetBrains Mono, gros taille, sans décoration

### Backgrounds et Textures

**Autorisés :**
- Blanc pur `#FFFFFF`
- Off-white `#F8FAFC`
- Slate-100 `#F1F5F9`
- Navy `#0B1628` (hero, CTAs)
- Photos avec overlay navy 60-80%

**Interdits :**
- Motifs géométriques répétitifs
- Textures de fond (grain, bruit)
- Gradients colorés (sauf overlay noir/navy sur photos)
- Formes organiques floues ("blobs")
- Mesh gradients
- Glassmorphism sauf usage très ciblé et subtil

---

## 9. Animation and Interaction Rules

### Animations autorisées

| Animation | Durée | Easing | Usage |
|---|---|---|---|
| **Card hover** | 200ms | ease-out | translateY(-2px) + border-color + shadow-sm |
| **Button hover** | 150ms | ease-out | bg-color change + scale(1.02) |
| **Link hover** | 150ms | ease | underline apparition, color change |
| **Accordion toggle** | 200ms | ease-out | height auto, rotate chevron |
| **Modal/Sheet** | 250ms | ease-out | fade + scale(0.95→1) |
| **Page fade-in** | 300ms | ease-in | opacity 0→1 sur le main content |
| **Sticky header** | 200ms | ease | translateY show/hide au scroll |
| **Toast** | 300ms | ease-out | slide-in from bottom-right |
| **Mobile menu** | 250ms | ease-out | slide-in from right |
| **Result reveal** | 300ms | ease-out | fade-in + translateY(10px→0) sur résultat calcul |
| **Scroll spy TOC** | 100ms | linear | border-left highlight change |
| **Skeleton shimmer** | 1.5s | ease-in-out | infinite pulse (loading states) |

### Animations interdites

- ❌ Scroll hijacking (désactiver le scroll natif)
- ❌ Parallax lourd
- ❌ Animations d'entrée complexes sur chaque élément (stagger excessif)
- ❌ Gradients animés
- ❌ Blobs / formes organiques en mouvement
- ❌ Effet de typewriter sur le texte
- ❌ Compteurs animés qui tournent pendant 3 secondes
- ❌ Page transitions complexes (fade suffit)
- ❌ Vidéos de fond autoplay
- ❌ Canvas animations / particles
- ❌ Lottie animations excessives

### Principes d'interaction

1. **L'animation soutient, ne distrait pas.** Si l'utilisateur remarque l'animation, elle est probablement trop forte.
2. **Respecter `prefers-reduced-motion`.** Toutes les animations doivent être désactivables.
3. **Pas d'animation sur le contenu critique.** Les articles, tableaux, et données apparaissent immédiatement.
4. **Feedback instantané.** Un bouton doit réagir en <100ms. Un formulaire en <200ms.
5. **Mobile = moins d'animations.** Sur mobile, diviser les durées par 2 ou supprimer.

---

## 10. SEO/GEO Visual Rules

Le design doit activement soutenir le référencement SEO et l'optimisation GEO (Generative Engine Optimization).

### Soutien au SEO classique

| Aspect Visuel | Implémentation |
|---|---|
| **H1 unique et visible** | H1 en haut de page, jamais caché, jamais dans une image |
| **H2/H3 bien marqués** | Style visuellement distinct du body (taille, weight, couleur). Pas de "heading" qui ressemble à du body text. |
| **Liens internes visibles** | Liens en Brand Blue #1A56DB, soulignement au hover. Pas de liens sans indication visuelle. |
| **Tableaux HTML natifs** | Pas d'images de tableaux. Les tableaux sont `<table>` avec schema.org. |
| **Images optimisées** | `next/image`, WebP, lazy loading, alt text descriptif en français. |
| **Core Web Vitals** | Pas d'animation lourde, pas d'image non optimisée, pas de JS bloquant. |
| **Mobile-friendly** | Tout le contenu accessible sur mobile. Pas de contenu caché derrière des onglets inaccessibles. |

### Soutien au GEO (LLM Optimization)

| Aspect Visuel | Implémentation |
|---|---|
| **BLUF visible** | Encadré bleu clair (#DBEAFE) avec border-left #1A56DB. La réponse directe est la première chose visible après le H1. |
| **FAQ visibles** | Section FAQ accordéon, toujours en bas d'article. Questions en gras, réponses complètes. |
| **Données chiffrées mises en valeur** | Chiffres en JetBrains Mono, encadrés "En chiffres" avec fond distinct. |
| **Tableaux comparatifs lisibles** | Scoring clair, couleur pour indiquer le meilleur, explication visible. |
| **Contenu scannable** | Short paragraphs (3-4 lignes max), bullet points, encadrés, espacement. |
| **Schema.org support visuel** | Breadcrumb visible, pas caché. Meta dates visibles. Auteur visible. |
| **Pas de contenu caché** | Le contenu important ne doit pas être derrière des tabs ou des "voir plus" qui masquent le texte aux crawlers. |

### Règle d'or GEO-Design

> Si un LLM (ChatGPT, Claude) devait résumer cette page en 3 phrases, le design doit faire en sorte que ces 3 phrases soient visuellement extraites : le BLUF, les H2, et les tableaux de données.

---

## 11. Accessibility Rules

### Contrastes

- Texte sur fond clair : ratio minimum 4.5:1 (WCAG AA), 7:1 pour le AAA
- Texte sur fond sombre : ratio minimum 4.5:1
- Texte grand (>18px bold ou >24px normal) : ratio minimum 3:1
- Composants UI : ratio minimum 3:1 par rapport aux couleurs adjacentes

### Taille de texte

- Jamais de texte fonctionnel sous 12px
- Texte de lecture minimum 16px sur mobile
- Inputs et boutons minimum 44×44px (touch target)

### Focus states

```
- Ring : 2px solid #1A56DB
- Ring offset : 2px
- Background : léger changement si nécessaire
- Visible sur : liens, boutons, inputs, tabs, accordéons
```

### Navigation clavier

- Tab order logique (top-to-bottom, left-to-right)
- Skip link vers le contenu principal
- Accordéons : Enter/Space pour toggle, Arrow pour navigation
- Modals : Escape pour fermer, Tab piégé dans le modal
- Pas de piège au clavier (keyboard trap)

### Labels et erreurs

- Tous les inputs ont un `<label>` associé (visuellement ou via aria-label)
- Messages d'erreur : texte descriptif, associé via `aria-describedby`
- Messages de succès : annoncés via `aria-live="polite"`
- Required fields : indicateur visuel (*) + aria-required

### ARIA

- `aria-expanded` sur les accordéons
- `aria-current="page"` sur le lien actif de navigation
- `aria-label` sur les icônes sans texte
- `role="search"` sur le formulaire de recherche
- `aria-live` sur les zones de résultat dynamiques (calculateurs)

### Mobile

- Taille de texte minimum 16px (évite le zoom iOS sur les inputs)
- Touch targets ≥ 44×44px
- Pas de hover-only interactions
- Menu accessible via bouton hamburger (aria-expanded)

---

## 12. Tailwind Design Tokens

Configuration directement utilisable dans `tailwind.config.ts` :

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  // ... extends shadcn config
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1A56DB',
          dark: '#1E429F',
          light: '#DBEAFE',
        },
        navy: {
          DEFAULT: '#0B1628',
          deep: '#0F172A',
        },
        accent: {
          green: '#059669',
          'green-light': '#D1FAE5',
          amber: '#D97706',
          'amber-light': '#FEF3C7',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          alt: '#F1F5F9',
        },
        border: {
          light: '#E2E8F0',
          DEFAULT: '#CBD5E1',
          dark: '#94A3B8',
        },
        text: {
          primary: '#0F172A',
          secondary: '#334155',
          muted: '#64748B',
          ondark: '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero-mobile': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'data-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'data-md': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'pill': '9999px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.05)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'elevated': '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
      },
      maxWidth: {
        'prose': '65ch',
        'article': '780px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      zIndex: {
        'header': '50',
        'modal': '100',
        'toast': '150',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
};

export default config;
```

### Variables CSS globales (globals.css)

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;
    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;
    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;
    --primary: 221 83% 53%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222 47% 11%;
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    --accent: 210 40% 96%;
    --accent-foreground: 222 47% 11%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;
    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 221 83% 53%;
    --radius: 0.5rem;
  }
}
```

---

## 13. shadcn/ui Customization

### Composants à installer

```bash
npx shadcn add button card input badge select tabs accordion dialog sheet separator skeleton toast tooltip table
```

### Customisation par composant

**Button**
- `default` : bg-brand, text-white, hover:bg-brand-dark, rounded-lg, h-10
- `secondary` : bg-slate-100, text-slate-900, hover:bg-slate-200
- `outline` : border-brand, text-brand, hover:bg-blue-50
- `ghost` : text-slate-500, hover:bg-slate-100
- Sizes : `sm` (h-8), `md` (h-10), `lg` (h-11), `xl` (h-12)

**Card**
- border : 1px solid #E2E8F0
- border-radius : 12px (rounded-xl)
- shadow : none (shadow-sm au hover uniquement)
- Padding : p-6

**Input**
- h-11 (44px)
- border #E2E8F0, rounded-lg
- focus : ring-brand, border-brand
- placeholder : #94A3B8

**Badge**
- Variant `category` : bg-blue-100, text-blue-700 (custom)
- Variant `verified` : bg-green-100, text-green-700 (custom)
- Variant `premium` : bg-amber-100, text-amber-700 (custom)
- Default : rounded-full, px-2.5, py-0.5

**Accordion**
- border-bottom #E2E8F0 sur chaque item
- trigger : font-weight 600, text-slate-900
- content : pt-2 pb-4
- chevron : #1A56DB, transition rotate 200ms

**Tabs**
- list : bg-slate-100, rounded-lg, p-1
- trigger active : bg-white, shadow-sm, text-slate-900, font-semibold
- trigger inactive : text-slate-500

**Table**
- header : bg-slate-100, font-semibold, text-sm
- rows : alternance white / slate-50
- cell padding : py-3 px-4
- border : border-slate-200

**Dialog / Sheet**
- overlay : bg-black/50
- content : bg-white, rounded-xl, shadow-elevated
- entrance : fade + scale(0.95→1), 250ms

**Toast**
- position : bottom-right
- success : border-l-4 border-green-500, bg-green-50
- error : border-l-4 border-red-500, bg-red-50
- entrance : slide-in from right, 300ms

---

## 14. Do / Don't

### ✅ DO

- Utiliser le bleu Brand (#1A56DB) comme couleur d'action principale
- Laisser beaucoup d'espace blanc autour du contenu
- Utiliser JetBrains Mono pour tous les chiffres et données
- Rendre les tableaux lisibles sur mobile (scroll horizontal avec colonne sticky)
- Afficher les dates de mise à jour sur les articles
- Utiliser des encadrés colorés pour les informations clés (BLUF, données, alertes)
- Garder la navigation simple et prévisible
- Tester le contraste de chaque combinaison texte/fond
- Optimiser les images (WebP, lazy loading)
- Respecter les touch targets 44×44px sur mobile
- Utiliser des icônes Lucide cohérentes partout
- Fournir des états vides explicites et utiles
- Citer les sources sous les données et statistiques
- Garder les CTAs contextuels et pertinents
- Utiliser des cards avec bordure subtile plutôt que des ombres lourdes
- Préférer le zebra (alternance de fonds) pour séparer les sections

### ❌ DON'T

- **No AI slop** — Ne jamais utiliser d'images générées par IA reconnaissables, d'illustrations sans sens, ou de styles visuels incohérents
- **No cheap template** — Ne pas laisser les styles par défaut de shadcn/ui non personnalisés
- **No flashy gradients** — Pas de gradients colorés, pas de mesh gradients, pas de blobs
- **No random icons** — Chaque icône doit avoir un sens fonctionnel, pas décoratif
- **No overuse of green** — Le vert est un accent, pas un thème. Jamais de section entière en vert
- **No unreadable text blocks** — Pas de paragraphes de 10 lignes sans break. Scannable content
- **No fake startup vibe** — Pas d'emoji dans l'UI, pas de ton trop décontracté, pas de "🚀" ou "💥"
- **No medical aesthetic** — Pas de bleu clair stérile, pas de blanc immaculé partout
- **No ecological theme** — Pas de vert dominant, pas de feuilles, pas de nature
- **No dark mode obligation** — Dark mode optionnel post-MVP, pas prioritaire
- **No popup / modal intrusif** — Pas de newsletter popup, pas de cookie wall agressif
- **No carousel** — Pas de sliders de contenu (sauf images hero optionnel)
- **No auto-play video** — Pas de vidéos en background
- **No infinite scroll** — Pagination explicite pour l'annuaire
- **No content hidden behind tabs** — Le contenu SEO doit être visible par défaut
- **No flashy animations** — Respecter les règles d'animation (section 9)
- **No hardcoded colors** — Toutes les couleurs passent par le design system
- **No different styles page to page** — Cohérence absolue de la charte

---

## 15. Implementation Rules for Claude Code

### Comment appliquer ce design dans le code

1. **Respecter les tokens** — Toutes les couleurs, tailles, espacements doivent utiliser les tokens Tailwind définis dans la section 12. Jamais de couleur hex hardcodée dans les composants (sauf valeurs rgba pour les overlays).

2. **Créer des composants réutilisables** — Chaque élément UI décrit dans la section 6 doit être un composant React indépendant. Pas de duplication de styles.

3. **Ne pas hardcoder les couleurs** — Utiliser `text-brand`, `bg-navy`, `border-border-light`. Ne jamais écrire `text-[#1A56DB]` ou `bg-blue-600` sauf si le token n'existe pas.

4. **Utiliser Tailwind proprement** — Pas de classes conditionnelles chaotiques. Extraire les variantes dans des objets de configuration si nécessaire. Utiliser `cn()` (clsx + tailwind-merge) pour les classes conditionnelles.

5. **Maintenir la cohérence entre toutes les pages** — Même header, même footer, mêmes espacements, mêmes cards. La seule chose qui change entre les pages est le contenu.

6. **Prioriser lisibilité, performance, conversion** — Dans cet ordre. Un contenu illisible ne convertira jamais, même avec les plus beaux boutons.

7. **Ne pas improviser une autre direction artistique** — Ce document est la source de vérité. Si un cas n'est pas couvert, se référer aux principes (section 2) et poser la question plutôt que décider seul.

8. **Documenter les décisions** — Si une adaptation est nécessaire (contrainte technique, composant shadcn qui ne peut pas être customisé comme voulu), documenter la décision et la raison dans un commentaire au-dessus du composant.

9. **Responsive dès le départ** — Chaque composant doit être pensé mobile-first. Tester à 375px, 768px, 1024px, 1280px.

10. **Dark sections** — Les sections sombres (hero navy, CTA sections) utilisent les tokens `text-ondark`. Vérifier le contraste systématiquement.

11. **Pas de style inline** — Tous les styles passent par Tailwind classes ou des objets de style définis. Pas de `style={{ color: 'red' }}`.

12. **shadcn/ui comme fondation** — Utiliser les composants shadcn comme base, les surcharger via les props et les CSS variables. Ne pas réinventer un bouton ou un input from scratch si shadcn le fournit.

13. **Variables CSS pour les couleurs shadcn** — Les couleurs shadcn sont contrôlées par les variables CSS dans `globals.css` (section 12). Modifier ces variables pour impacter tous les composants shadcn d'un coup.

14. **Images** — Toutes les images passent par `next/image` avec des dimensions explicites. Pas d'images sans `width` et `height` (sinon CLS). Utiliser des placeholders pendant le chargement.

15. **Fonts** — Charger Inter et JetBrains Mono via `next/font/google` pour l'optimisation automatique (no layout shift). Déclarer les variables CSS `--font-inter` et `--font-jetbrains-mono`.
