import { canonicalUrl } from '@/lib/seo/canonical';

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.href),
    })),
  };
}
