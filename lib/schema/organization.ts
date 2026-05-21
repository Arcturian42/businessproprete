import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo/constants';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    description: SITE_DESCRIPTION,
    sameAs: [] as string[],
  };
}
