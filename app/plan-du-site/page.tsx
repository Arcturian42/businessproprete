import Link from 'next/link';
import type { Metadata } from 'next';

import { PageHeader } from '@/components/layout/page-header';
import { PILOT_CITIES } from '@/lib/data/cities';
import { FOOTER_NAV, PRIMARY_NAV } from '@/lib/data/navigation';

export const metadata: Metadata = {
  title: 'Plan du site',
  description:
    'Toutes les pages du site Propreté Business : guides, comparatifs, outils, annuaire, observatoire, ressources et pages légales.',
  alternates: { canonical: '/plan-du-site' },
};

export default function HtmlSitemapPage() {
  return (
    <main>
      <PageHeader
        title="Plan du site"
        description="Toutes les pages publiques, regroupées par section."
        breadcrumbs={[{ name: 'Plan du site', href: '/plan-du-site' }]}
      />
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-8">
          <SitemapBlock title="Navigation principale" items={PRIMARY_NAV} />
          {FOOTER_NAV.map((column) => (
            <SitemapBlock key={column.title} title={column.title} items={column.items} />
          ))}
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Villes pilotes
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 md:grid-cols-5">
              {PILOT_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${city.slug}/societes-nettoyage`}
                    className="text-brand hover:underline"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

function SitemapBlock({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      <ul className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-brand hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
