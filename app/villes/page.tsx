import Link from 'next/link';
import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/layout/page-header';
import { PILOT_CITIES } from '@/lib/data/cities';

export const metadata: Metadata = {
  title: 'Pages locales — villes couvertes',
  description:
    'Annuaire et guide d’achat par ville : Paris, Lyon, Marseille, Bordeaux, Nantes, Lille, Toulouse, Strasbourg, Nice, Rennes.',
  alternates: { canonical: '/villes' },
};

export default function VillesIndexPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Pages locales"
        title="Trouver une société de nettoyage par ville"
        description="Marché local, prix moyens, entreprises répertoriées, guide d’achat ville par ville pour les 10 premières métropoles françaises."
        breadcrumbs={[{ name: 'Villes', href: '/villes' }]}
      />
      <section className="bg-surface py-16 md:py-20" aria-labelledby="cities-grid-heading">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="cities-grid-heading" className="sr-only">
            Villes couvertes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {PILOT_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}/societes-nettoyage`}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:rounded-card"
              >
                <Card className="group flex h-full items-center gap-3 p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-card bg-brand-light text-brand"
                    aria-hidden="true"
                  >
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-text-primary transition-colors group-hover:text-brand">
                      {city.name}
                    </p>
                    <p className="font-mono text-xs text-text-muted">
                      {city.departmentCode} · {city.region}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
