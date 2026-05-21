import Link from 'next/link';

import { SITE_NAME, SITE_TAGLINE } from '@/lib/seo/constants';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="bg-navy py-20 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-sm uppercase tracking-wide text-brand-light">
            {SITE_NAME}
          </p>
          <h1 className="mt-4 max-w-3xl text-hero-mobile md:text-hero text-text-ondark">
            Le média de référence du nettoyage professionnel en France.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-border-dark">
            {SITE_TAGLINE}. Guides, données, comparatifs logiciels et outils
            gratuits pour les dirigeants d&apos;entreprises de propreté B2B.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/guides"
              className="inline-flex h-11 items-center rounded-button bg-brand px-6 text-sm font-semibold text-white shadow-card transition-colors duration-150 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Consulter les guides
            </Link>
            <Link
              href="/outils"
              className="inline-flex h-11 items-center rounded-button border border-text-ondark px-6 text-sm font-semibold text-text-ondark transition-colors duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-ondark focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Découvrir les outils
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border-light bg-white py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-text-muted">
            Le secteur en chiffres
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4">
            <Stat value="21 Md€" label="CA du marché 2024" />
            <Stat value="15 500" label="Entreprises de propreté" />
            <Stat value="600 000+" label="Emplois en France" />
            <Stat value="+6,9 %" label="Croissance annuelle (CAGR)" />
          </dl>
          <p className="mt-4 text-xs text-text-muted">
            Sources : Monde de la Propreté 2024, Transpire Insight 2025.
          </p>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-mono text-data-md text-text-primary">{value}</dt>
      <dd className="mt-1 text-sm text-text-muted">{label}</dd>
    </div>
  );
}
