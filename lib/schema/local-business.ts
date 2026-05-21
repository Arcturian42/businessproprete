import { canonicalUrl } from '@/lib/seo/canonical';

export type LocalBusinessInput = {
  name: string;
  /** Path of the directory profile page. */
  path: string;
  description?: string;
  telephone?: string;
  email?: string;
  url?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    postalCode?: string;
    addressRegion?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  /** SIRET identifier (14 digits). */
  identifier?: string;
  /** NAF code (e.g. "8121Z"). */
  isicV4?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  priceRange?: '€' | '€€' | '€€€';
};

/**
 * LocalBusiness schema for directory profiles.
 * Per docs/13-seo-technical-impl.md §Schema.LocalBusiness.
 */
export function localBusinessSchema(input: LocalBusinessInput) {
  const url = canonicalUrl(input.path);

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': url,
    name: input.name,
    description: input.description,
    url,
    telephone: input.telephone,
    email: input.email,
    sameAs: input.url ? [input.url] : undefined,
    address: input.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: input.address.streetAddress,
          addressLocality: input.address.addressLocality,
          postalCode: input.address.postalCode,
          addressRegion: input.address.addressRegion,
          addressCountry: input.address.addressCountry ?? 'FR',
        }
      : undefined,
    geo: input.geo
      ? {
          '@type': 'GeoCoordinates',
          latitude: input.geo.latitude,
          longitude: input.geo.longitude,
        }
      : undefined,
    identifier: input.identifier,
    isicV4: input.isicV4,
    aggregateRating: input.aggregateRating
      ? {
          '@type': 'AggregateRating',
          ratingValue: input.aggregateRating.ratingValue,
          reviewCount: input.aggregateRating.reviewCount,
        }
      : undefined,
    priceRange: input.priceRange,
  };
}
