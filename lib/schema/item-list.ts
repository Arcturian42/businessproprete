import { canonicalUrl } from '@/lib/seo/canonical';

export type ItemListEntry = {
  name: string;
  /** Path relative to site root. */
  path: string;
};

/**
 * ItemList schema — used on comparison/ranking pages, and on tool /
 * directory listings to expose ordering signals to AI engines.
 */
export function itemListSchema({
  name,
  description,
  items,
}: {
  name: string;
  description?: string;
  items: ItemListEntry[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.path),
    })),
  };
}
