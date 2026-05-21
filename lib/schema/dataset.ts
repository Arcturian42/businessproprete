import { canonicalUrl } from '@/lib/seo/canonical';
import { SITE_NAME } from '@/lib/seo/constants';

export type DatasetInput = {
  name: string;
  description: string;
  /** Path of the study/observatoire page. */
  path: string;
  datePublished: string;
  dateModified?: string;
  /** Optional CSV / JSON downloadable distribution. */
  distribution?: {
    encodingFormat: 'CSV' | 'JSON' | 'PDF';
    contentUrl: string;
  };
  /** Spatial coverage — e.g. "France". */
  spatialCoverage?: string;
  /** Temporal coverage — e.g. "2024-01-01/2024-12-31". */
  temporalCoverage?: string;
  /** License URL — defaults to CC-BY-4.0. */
  license?: string;
  keywords?: string[];
};

/**
 * Dataset schema for /observatoire/[slug] study pages.
 * AI engines prioritise Dataset for data-citation queries.
 */
export function datasetSchema(input: DatasetInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.path),
    creator: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: 'fr-FR',
    spatialCoverage: input.spatialCoverage ?? 'France',
    temporalCoverage: input.temporalCoverage,
    keywords: input.keywords?.join(', '),
    license: input.license ?? 'https://creativecommons.org/licenses/by/4.0/',
    distribution: input.distribution
      ? {
          '@type': 'DataDownload',
          encodingFormat: input.distribution.encodingFormat,
          contentUrl: input.distribution.contentUrl,
        }
      : undefined,
  };
}
