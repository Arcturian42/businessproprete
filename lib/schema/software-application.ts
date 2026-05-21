import { canonicalUrl } from '@/lib/seo/canonical';

export type SoftwareApplicationInput = {
  name: string;
  /** Path of the review page. */
  path: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  /** Logo path or absolute URL. */
  logo?: string;
  /** Vendor website. */
  vendorUrl?: string;
  offers?: {
    price: number | 'free';
    priceCurrency?: string;
    availability?: 'InStock' | 'PreOrder' | 'OutOfStock';
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
};

/**
 * SoftwareApplication schema for /logiciels/[slug] pages.
 * AI engines use this to surface software in answers to "best software for X" queries.
 */
export function softwareApplicationSchema(input: SoftwareApplicationInput) {
  const offers = input.offers
    ? {
        '@type': 'Offer',
        price: input.offers.price === 'free' ? '0' : String(input.offers.price),
        priceCurrency: input.offers.priceCurrency ?? 'EUR',
        availability: `https://schema.org/${input.offers.availability ?? 'InStock'}`,
      }
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: input.name,
    url: canonicalUrl(input.path),
    description: input.description,
    applicationCategory: input.applicationCategory ?? 'BusinessApplication',
    operatingSystem: input.operatingSystem ?? 'Web',
    image: input.logo,
    sameAs: input.vendorUrl ? [input.vendorUrl] : undefined,
    offers,
    aggregateRating: input.aggregateRating
      ? {
          '@type': 'AggregateRating',
          ratingValue: input.aggregateRating.ratingValue,
          reviewCount: input.aggregateRating.reviewCount,
          bestRating: input.aggregateRating.bestRating ?? 10,
          worstRating: input.aggregateRating.worstRating ?? 0,
        }
      : undefined,
  };
}
