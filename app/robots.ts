import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/seo/constants';

/**
 * Dynamic robots.txt.
 * Default: allow everything except API routes and Next internals.
 * Per docs/13-seo-technical-impl.md §robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/_vercel/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
