import { SITE_NAME, SITE_URL } from '@/lib/seo/constants';

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'fr-FR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/annuaire?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
