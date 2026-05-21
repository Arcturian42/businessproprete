import type { MetadataRoute } from 'next';

import { listGuides } from '@/lib/content/loader';
import { PILOT_CITIES } from '@/lib/data/cities';
import { canonicalUrl } from '@/lib/seo/canonical';

/**
 * Dynamic XML sitemap.
 * Aggregates static routes + MDX guides + 10 pilot city pages.
 * Directory profile and software/comparison entries will plug in
 * once Supabase is seeded with real records (Sprint 6+).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    { path: '/outils/calculateur-prix-nettoyage', changeFrequency: 'monthly', priority: 0.85 },
    { path: '/outils/calculateur-rentabilite-contrat', changeFrequency: 'monthly', priority: 0.85 },
    { path: '/outils/generateur-devis-nettoyage', changeFrequency: 'monthly', priority: 0.85 },
    { path: '/outils/recevoir-10-prospects-b2b', changeFrequency: 'monthly', priority: 0.85 },
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

  const guides = await listGuides('guides');
  const guideRoutes = guides.map((guide) => ({
    url: canonicalUrl(guide.path),
    lastModified: new Date(guide.meta.dateModified ?? guide.meta.datePublished),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

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
    ...guideRoutes,
    ...cityRoutes,
  ];
}
