import type { Metadata } from 'next';

import { SITE_NAME, SITE_URL } from './constants';

export type BuildMetadataInput = {
  /** Page title — `${title} | ${SITE_NAME}` is auto-applied by root layout. */
  title: string;
  description: string;
  /** Path relative to site root, e.g. /guides/grille-salaire-proprete-2025 */
  path: string;
  /** OG image (path or absolute URL). Defaults to /images/og-default.jpg. */
  ogImage?: string;
  /** Type of OG: article / website / profile. */
  ogType?: 'website' | 'article' | 'profile';
  /** ISO date for article schema. */
  publishedTime?: string;
  /** ISO date for article schema. */
  modifiedTime?: string;
  /** Free-form keywords. */
  keywords?: string[];
  /** noindex if true. */
  noindex?: boolean;
};

/**
 * Page-level metadata builder. Apply per route segment via
 * `export const metadata = buildPageMetadata(...)` or
 * `export async function generateMetadata() { return buildPageMetadata(...) }`.
 */
export function buildPageMetadata(input: BuildMetadataInput): Metadata {
  const canonical = input.path === '/' ? '/' : input.path;
  const imagePath = input.ogImage ?? '/images/og-default.jpg';
  const absoluteImage = imagePath.startsWith('http')
    ? imagePath
    : `${SITE_URL}${imagePath}`;

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical },
    robots: input.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: input.ogType ?? 'website',
      url: `${SITE_URL}${canonical}`,
      title: input.title,
      description: input.description,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      images: [{ url: absoluteImage }],
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [absoluteImage],
    },
  };
}
