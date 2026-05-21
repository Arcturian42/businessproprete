/**
 * Primary navigation config — drives header, footer and mobile menu.
 * Order matches /docs/05-site-architecture.md (header desktop).
 */

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Guides', href: '/guides', description: 'Articles éditoriaux et réglementaires' },
  { label: 'Logiciels', href: '/logiciels', description: 'Avis et comparatifs SaaS propreté' },
  { label: 'Outils', href: '/outils', description: 'Calculateurs et générateurs gratuits' },
  { label: 'Annuaire', href: '/annuaire', description: 'Entreprises de nettoyage en France' },
  { label: 'Observatoire', href: '/observatoire', description: 'Données et études du secteur' },
  { label: 'Ressources', href: '/ressources', description: 'Modèles, PDFs, check-lists' },
];

export const FOOTER_NAV: {
  title: string;
  items: NavItem[];
}[] = [
  {
    title: 'Contenu',
    items: [
      { label: 'Guides', href: '/guides' },
      { label: 'Réglementation', href: '/reglementation' },
      { label: 'Observatoire', href: '/observatoire' },
      { label: 'Newsletter', href: '/newsletter' },
    ],
  },
  {
    title: 'Logiciels',
    items: [
      { label: 'Comparatifs', href: '/comparatifs' },
      { label: 'Avis logiciels', href: '/logiciels' },
    ],
  },
  {
    title: 'Outils',
    items: [
      { label: 'Calculateur de prix', href: '/outils/calculateur-prix-nettoyage' },
      { label: 'Rentabilité contrat', href: '/outils/calculateur-rentabilite-contrat' },
      { label: 'Générateur de devis', href: '/outils/generateur-devis-nettoyage' },
      { label: 'Recevoir 10 prospects', href: '/outils/recevoir-10-prospects-b2b' },
    ],
  },
  {
    title: 'Légal',
    items: [
      { label: 'À propos', href: '/a-propos' },
      { label: 'Contact', href: '/contact' },
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Confidentialité', href: '/politique-confidentialite' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
];
