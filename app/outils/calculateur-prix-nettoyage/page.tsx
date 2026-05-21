import type { Metadata } from 'next';

import { CtaSection } from '@/components/content/cta-section';
import { FaqBlock } from '@/components/content/faq-block';
import { PageHeader } from '@/components/layout/page-header';
import { PriceCalculator } from '@/components/tools/price-calculator';
import { SchemaOrg } from '@/components/seo/schema-org';
import { softwareApplicationSchema } from '@/lib/schema/software-application';
import { faqPageSchema } from '@/lib/schema/faq-page';
import { breadcrumbListSchema } from '@/lib/schema/breadcrumb-list';

const PATH = '/outils/calculateur-prix-nettoyage';

export const metadata: Metadata = {
  title: 'Calculateur de prix nettoyage — €/mois par m²',
  description:
    'Estimez en une minute le coût mensuel d’une prestation de nettoyage selon le type de locaux, la surface, la fréquence et la ville. Gratuit, sans inscription.',
  alternates: { canonical: PATH },
};

const FAQ = [
  {
    question: 'Sur quelle base le prix est-il calculé ?',
    answer:
      'Le calculateur combine un taux horaire moyen selon le type de locaux (25 €/h pour les bureaux, 30 €/h pour l’industriel, etc.), une productivité standard en m²/h, la fréquence de passage et un coefficient régional. Le résultat est une estimation indicative, à affiner selon votre cahier des charges.',
  },
  {
    question: 'Pourquoi le prix varie-t-il selon la ville ?',
    answer:
      'Le coût de la main-d’œuvre, du foncier et des déplacements diffère significativement entre Paris (+18 % vs moyenne nationale), Lyon (+5 %) ou Rennes (-4 %). Le calculateur applique ces multiplicateurs régionaux.',
  },
  {
    question: 'Le calculateur prend-il en compte la TVA ?',
    answer:
      'Non, les prix affichés sont en hors taxes. La TVA applicable aux prestations de nettoyage en France est de 20 % en règle générale.',
  },
  {
    question: 'Comment obtenir un devis personnalisé ?',
    answer:
      'Utilisez notre outil « Recevoir 10 prospects B2B » pour transmettre vos critères à Réseau Propreté, ou parcourez l’annuaire pour contacter directement les entreprises de votre ville.',
  },
];

export default function PriceCalculatorPage() {
  return (
    <main>
      <SchemaOrg
        schemas={[
          breadcrumbListSchema([
            { name: 'Accueil', href: '/' },
            { name: 'Outils', href: '/outils' },
            { name: 'Calculateur de prix', href: PATH },
          ]),
          softwareApplicationSchema({
            name: 'Calculateur de prix nettoyage',
            path: PATH,
            description:
              'Outil gratuit d’estimation du coût mensuel d’une prestation de nettoyage en France.',
            applicationCategory: 'BusinessApplication',
            offers: { price: 'free' },
          }),
          faqPageSchema(FAQ),
        ]}
      />
      <PageHeader
        eyebrow="Outil gratuit"
        title="Calculateur de prix nettoyage"
        description="Estimez en une minute le coût mensuel d’une prestation selon le type de locaux, la surface, la fréquence et la ville. Sans inscription."
        breadcrumbs={[
          { name: 'Outils', href: '/outils' },
          { name: 'Calculateur de prix', href: PATH },
        ]}
      />
      <section className="bg-surface py-12 md:py-16" aria-labelledby="calc-heading">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="calc-heading" className="sr-only">
            Calculateur
          </h2>
          <PriceCalculator />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FaqBlock entries={FAQ} title="Questions fréquentes" />
        </div>
      </section>

      <CtaSection
        title="Besoin d’aller plus loin ?"
        description="Recevez 3 devis qualifiés de prestataires locaux pour votre projet."
        primary={{
          label: 'Demander 3 devis',
          href: '/outils/recevoir-10-prospects-b2b',
        }}
        secondary={{
          label: 'Voir l’annuaire',
          href: '/annuaire',
        }}
      />
    </main>
  );
}
