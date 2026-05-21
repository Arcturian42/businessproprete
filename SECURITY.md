# Sécurité — analyse des advisories `npm audit`

Mise à jour : 2025.

## Synthèse

`npm audit` signale 6 vulnérabilités sur les dépendances directes ou
transitives (5 hautes + 1 modérée). Toutes sont **acceptées en MVP**
car le modèle de menace de Propreté Business les rend **non
exploitables** dans notre code. Cette page documente l'analyse pour
chaque advisory, à revisiter en V2.

Un commentaire pointant ici se trouve dans
`components/content/mdx-renderer.tsx`.

## Advisory par advisory

### 1. `next-mdx-remote` — GHSA-g4xw-jxrg-5f6m (high)

**Résumé :** « Arbitrary code execution in React server-side rendering
of untrusted MDX content ».

**Pourquoi non exploitable :** **aucun MDX uploadé par l'utilisateur**
n'existe dans l'application. Tout le contenu MDX vit dans `/content/`
et est ajouté par git commit signé par l'équipe éditoriale. Aucune
route ne reçoit de payload MDX d'un visiteur.

**Pourquoi on ne migre pas tout de suite :** la v6.0.0 casse notre
intégration des composants custom (`BlufBox`, `FaqBlock`, `CtaBox`)
lors de la sérialisation RSC. Tentative effectuée et rollback
documenté dans le commit qui ajoute ce fichier. Re-évaluer dès que
v6 stabilise l'API de `components`.

### 2. Next.js — GHSA-ffhc-5mcf-pf4q (high)

**Résumé :** XSS dans les applications App Router utilisant des
nonces CSP.

**Pourquoi non exploitable :** nous n'utilisons **pas** de CSP nonces.
Voir `next.config.mjs` — la `Content-Security-Policy` est absente
volontairement en MVP (sera ajoutée en V1.1 avec un nonce statique
ou via le middleware).

### 3. Next.js — GHSA-vfv6-92ff-j949 (high)

**Résumé :** Cache poisoning via collisions dans le cache RSC.

**Pourquoi non exploitable au moment d'écrire :** l'attaque nécessite
des chemins de cache spécifiques que notre architecture statique
(ISR avec revalidate explicite, pas de paramètres dynamiques avec
collisions probables) n'expose pas. Revisiter quand on activera
plus de chemins dynamiques côté annuaire.

### 4. Next.js — GHSA-gx5p-jg67-6x7h (high)

**Résumé :** XSS dans les scripts `beforeInteractive` exposés à des
entrées non-fiables.

**Pourquoi non exploitable :** nos seuls scripts `beforeInteractive`
sont les JSON-LD Organization + WebSite dans `app/layout.tsx`. Le
contenu est **100 % constant** (constantes `SITE_NAME`, `SITE_URL`,
`SITE_DESCRIPTION`). Aucune entrée utilisateur n'arrive jamais dans
ces scripts.

### 5. Next.js — GHSA-h64f-5h5j-jqjh (high)

**Résumé :** Déni de service via l'API d'optimisation d'images
(`next/image`).

**Pourquoi non exploitable :** `next.config.mjs` laisse
`images.remotePatterns: []` (aucun domaine distant autorisé).
`next/image` n'optimise que des images locales du dossier `/public/`,
toutes contrôlées par l'équipe. Aucune URL externe d'image n'est
acceptée.

### 6. Next.js — GHSA-c4j6-fc7j-m34r (high)

**Résumé :** SSRF côté serveur via upgrades WebSocket.

**Pourquoi non exploitable :** nous n'utilisons **pas** de
WebSockets. Aucune route API n'effectue d'upgrade.

### 7. Next.js — GHSA-wfc6-r584-vfw7 (high)

**Résumé :** Cache poisoning dans les réponses RSC.

**Pourquoi non exploitable :** voir advisory #3 (même famille).

### 8. Next.js — GHSA-36qx-fr4f-26g5 (high)

**Résumé :** Bypass middleware/proxy dans **Pages Router** avec i18n.

**Pourquoi non exploitable :** nous utilisons **uniquement App
Router**. Aucun fichier dans `pages/`, aucun fichier `i18n.config.*`.

### 9. PostCSS — GHSA-qx2v-qp2m-jg93 (moderate)

**Résumé :** XSS via balise `</style>` non échappée dans la sortie de
stringify CSS.

**Pourquoi non exploitable :** PostCSS ne traite que notre Tailwind
CSS au build (process npm interne). Aucune CSS générée à partir
d'entrée utilisateur. La sortie sert uniquement à la compilation des
fichiers statiques.

## Plan de remédiation V2

Lorsque V2 démarre, planifier dans cet ordre :

1. **Next.js 14 → 15** stable (quand 15 sera GA) : ferme la quasi-
   totalité des advisories Next sans imposer React 19. Tester sur
   une branche dédiée.
2. **next-mdx-remote 5 → 6** : nécessite de revoir
   `components/content/mdx-renderer.tsx` pour le nouveau contrat
   de sérialisation des composants.
3. Activer la **Content-Security-Policy** stricte avec nonces dans
   le middleware (couvre advisories #2 et #3 même si on reste en
   versions actuelles).

## Comment vérifier

```bash
npm audit                   # voir l'état courant
npm audit --omit=dev        # filtrer les advisories prod uniquement
```

À chaque commit qui touche les dépendances, relire ce fichier et le
mettre à jour si une advisory devient applicable à notre code.
