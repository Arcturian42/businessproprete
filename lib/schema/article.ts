import { canonicalUrl } from '@/lib/seo/canonical';
import { SITE_NAME, SITE_URL } from '@/lib/seo/constants';

export type ArticleSchemaInput = {
  headline: string;
  description: string;
  /** Path relative to site root, e.g. /guides/grille-salaire-proprete-2025 */
  path: string;
  datePublished: string;
  dateModified?: string;
  /** Absolute or root-relative URL of the cover image / OG image. */
  image?: string;
  author?: { name: string };
  keywords?: string[];
};

export function articleSchema(input: ArticleSchemaInput) {
  const url = canonicalUrl(input.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    image: input.image
      ? input.image.startsWith('http')
        ? input.image
        : `${SITE_URL}${input.image}`
      : `${SITE_URL}/images/og-default.jpg`,
    author: input.author
      ? { '@type': 'Person', name: input.author.name }
      : { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.svg`,
      },
    },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'fr-FR',
    keywords: input.keywords?.join(', '),
  };
}
