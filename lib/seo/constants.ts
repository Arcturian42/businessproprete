export const SITE_NAME = 'Propreté Business';
export const SITE_TAGLINE = 'Le média des professionnels de la propreté';
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://propretebusiness.fr';
export const SITE_DESCRIPTION =
  'Le média de référence du nettoyage professionnel en France : guides, données, comparatifs logiciels et outils gratuits pour les dirigeants d’entreprises de propreté B2B.';
export const SITE_LOCALE = 'fr_FR';
export const SITE_COUNTRY = 'FR';
export const CONTACT_EMAIL = 'contact@propretebusiness.fr';

/** Related sites in the Propreté ecosystem (used for contextual cross-links and Schema relations). */
export const PARENT_PROJECTS = {
  proprely: {
    name: 'Proprely',
    url: 'https://proprely.fr',
    role: 'SaaS de gestion pour entreprises de nettoyage',
  },
  reseauProprete: {
    name: 'Réseau Propreté',
    url: 'https://reseauproprete.fr',
    role: 'Annuaire et mise en relation B2B nettoyage',
  },
} as const;
