import type { MetadataRoute } from 'next';

import { PILOT_CITIES } from '@/lib/data/cities';
import { canonicalUrl } from '@/lib/seo/canonical';

/**
 * Dynamic XML sitemap.
 * Hub & static routes today; will gain article/profile entries
 * once MDX (Sprint 4) and Supabase seeds (Sprint 6) are wired.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    { path: '/', changeFrequency: 'daily', priority: 1.0 },
    { path: '/guides', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/reglementation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/logiciels', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/comparatifs', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/outils', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/annuaire', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/observatoire', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/ressources', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/villes', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/newsletter', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/a-propos', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/plan-du-site', changeFrequency: 'monthly', priority: 0.3 },
    { path: '/mentions-legales', changeFrequency: 'yearly', priority: 0.2 },
    { path: '/politique-confidentialite', changeFrequency: 'yearly', priority: 0.2 },
    { path: '/cookies', changeFrequency: 'yearly', priority: 0.2 },
  ];

  const cityRoutes = PILOT_CITIES.map((city) => ({
    url: canonicalUrl(`/${city.slug}/societes-nettoyage`),
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes.map((entry) => ({
      url: canonicalUrl(entry.path),
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
    ...cityRoutes,
  ];
}
