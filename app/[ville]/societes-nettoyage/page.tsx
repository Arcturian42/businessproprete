import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';

import { ComingSoonBlock } from '@/components/content/coming-soon-block';
import { CtaSection } from '@/components/content/cta-section';
import { DataHighlightBox } from '@/components/content/data-highlight-box';
import { PageHeader } from '@/components/layout/page-header';
import { StatsBar } from '@/components/local/stats-bar';
import { PILOT_CITIES, findCityBySlug, nearbyCities } from '@/lib/data/cities';

export const dynamicParams = false;

export function generateStaticParams() {
  return PILOT_CITIES.map((city) => ({ ville: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { ville: string };
}): Promise<Metadata> {
  const city = findCityBySlug(params.ville);
  if (!city) return {};

  return {
    title: `Sociétés de nettoyage à ${city.name} — annuaire, tarifs et guide`,
    description: `Trouver une entreprise de nettoyage à ${city.name} (${city.departmentCode}). Annuaire B2B, prix moyens, guide pour bien choisir un prestataire de propreté.`,
    alternates: { canonical: `/${city.slug}/societes-nettoyage` },
    openGraph: {
      title: `Sociétés de nettoyage à ${city.name}`,
      description: `Annuaire et guide d’achat des entreprises de nettoyage professionnel à ${city.name}.`,
      type: 'article',
    },
  };
}

const NUMBER_FR = new Intl.NumberFormat('fr-FR');

export default function CityPage({ params }: { params: { ville: string } }) {
  const city = findCityBySlug(params.ville);
  if (!city) notFound();

  const others = nearbyCities(city.slug, 600, 6);

  const populationLabel =
    city.metroPopulation && city.metroPopulation !== city.population
      ? `${NUMBER_FR.format(city.metroPopulation)} hab. (métropole)`
      : `${NUMBER_FR.format(city.population)} habitants`;

  return (
    <main>
      <PageHeader
        eyebrow={`${city.region} · ${city.departmentName} (${city.departmentCode})`}
        title={`Sociétés de nettoyage à ${city.name}`}
        description={`Annuaire B2B, prix moyens et guide d’achat pour choisir un prestataire de propreté à ${city.name}.`}
        breadcrumbs={[
          { name: 'Villes', href: '/villes' },
          { name: city.name, href: `/${city.slug}/societes-nettoyage` },
        ]}
      />

      <StatsBar
        title={`Le marché à ${city.name}`}
        stats={[
          { value: populationLabel, label: 'Population' },
          {
            value: `${NUMBER_FR.format(city.cleaningCompanyCount)}`,
            label: 'Entreprises NAF 8121Z (estimation)',
          },
          {
            value: `${NUMBER_FR.format(Math.round(city.officeSurface / 1_000_000))} M m²`,
            label: 'Parc tertiaire estimé',
          },
        ]}
        source="INSEE (population) · estimations CleanP/CBRE (parc tertiaire) · extraction Sirene NAF 8121Z"
      />

      <ComingSoonBlock
        title={`L’annuaire ${city.name} s’étoffe progressivement`}
        description="Nous indexons manuellement les premières fiches entreprises. Une fois la base seedée (Sprint 6), les sociétés apparaîtront ici avec score, spécialités et zone d’intervention."
        source={`ville-${city.slug}`}
      />

      <section className="bg-white py-16" aria-labelledby="local-context-heading">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2
            id="local-context-heading"
            className="text-2xl font-bold text-text-primary"
          >
            Choisir un prestataire à {city.name}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Le marché de la propreté professionnelle à {city.name} compte
            environ {NUMBER_FR.format(city.cleaningCompanyCount)} entreprises
            actives sous le code NAF 8121Z (nettoyage courant des bâtiments).
            La métropole concentre plusieurs zones tertiaires majeures et
            un tissu de PME / ETI dense, ce qui explique des grilles de prix
            plus structurées qu’en zones rurales.
          </p>

          <DataHighlightBox
            title="Repères de prix à titre indicatif"
            items={[
              { value: '28 €/h', label: 'Bureaux quotidien (médiane)' },
              { value: '32 €/h', label: 'Industriel ponctuel' },
              { value: '22 €/h', label: 'Copropriété hebdo' },
            ]}
            source="Benchmark interne Propreté Business — à confirmer ville par ville"
          />
        </div>
      </section>

      {others.length > 0 && (
        <section
          className="bg-surface py-12"
          aria-labelledby="nearby-cities-heading"
        >
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2
              id="nearby-cities-heading"
              className="text-lg font-semibold text-text-primary"
            >
              Autres villes couvertes
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/${other.slug}/societes-nettoyage`}
                    className="inline-flex items-center gap-1.5 rounded-pill border border-border-light bg-white px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-brand hover:text-brand"
                  >
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {other.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaSection
        title={`Besoin d’un devis nettoyage à ${city.name} ?`}
        description="Recevez 3 devis qualifiés d’entreprises de propreté locales via notre partenaire Réseau Propreté."
        primary={{
          label: 'Demander 3 devis',
          href: '/outils/recevoir-10-prospects-b2b',
        }}
        secondary={{
          label: 'Consulter l’annuaire',
          href: '/annuaire',
        }}
      />
    </main>
  );
}
