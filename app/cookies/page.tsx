import type { Metadata } from 'next';

import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = {
  title: 'Politique cookies',
  description:
    'Quels cookies sont utilisés sur Propreté Business, à quelle fin et comment les gérer.',
  alternates: { canonical: '/cookies' },
  robots: { index: true, follow: false },
};

export default function CookiesPage() {
  return (
    <main>
      <PageHeader
        title="Politique cookies"
        breadcrumbs={[{ name: 'Cookies', href: '/cookies' }]}
      />
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none text-base leading-relaxed text-text-secondary">
            <h2>Cookies strictement nécessaires</h2>
            <p>
              Ces cookies sont indispensables au fonctionnement du site
              (préférences de session, panier vide, sécurité). Ils ne
              requièrent pas votre consentement.
            </p>

            <h2>Cookies de mesure d’audience</h2>
            <p>
              Nous utilisons Google Analytics 4 et Vercel Analytics avec
              anonymisation IP. Ces cookies nous permettent de mesurer
              l’audience du site et d’en améliorer le contenu.
            </p>

            <h2>Cookies tiers</h2>
            <p>
              Aucun cookie publicitaire n’est déposé. Les seules dépendances
              tierces sont l’infrastructure (Vercel) et l’analyse (Google).
            </p>

            <h2>Gestion de votre consentement</h2>
            <p>
              Vous pouvez à tout moment modifier vos préférences via la
              bannière de consentement (à venir) ou en bloquant les cookies
              dans votre navigateur.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
