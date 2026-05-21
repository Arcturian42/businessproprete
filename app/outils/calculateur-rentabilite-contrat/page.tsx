import type { Metadata } from 'next';

import { CtaSection } from '@/components/content/cta-section';
import { FaqBlock } from '@/components/content/faq-block';
import { PageHeader } from '@/components/layout/page-header';
import { ProfitabilityCalculator } from '@/components/tools/profitability-calculator';
import { SchemaOrg } from '@/components/seo/schema-org';
import { softwareApplicationSchema } from '@/lib/schema/software-application';
import { faqPageSchema } from '@/lib/schema/faq-page';
import { breadcrumbListSchema } from '@/lib/schema/breadcrumb-list';

const PATH = '/outils/calculateur-rentabilite-contrat';

export const metadata: Metadata = {
  title: 'Calculateur de rentabilité d’un contrat de nettoyage',
  description:
    'Calculez la marge brute réelle d’un contrat de propreté : coût agent, charges sociales, déplacements, matériel. Verdict immédiat et seuil de rentabilité.',
  alternates: { canonical: PATH },
};

const FAQ = [
  {
    question: 'Quelle marge brute viser sur un contrat de nettoyage ?',
    answer:
      'En propreté B2B, une marge brute de 15 à 25 % est considérée comme saine. En dessous de 10 %, le contrat devient risqué à la moindre absence ou hausse de coûts. Au-dessus de 30 %, attendez-vous à une pression sur les prix lors des renégociations.',
  },
  {
    question: 'Comment intégrer les heures de déplacement ?',
    answer:
      'Les temps de déplacement inter-sites sont considérés comme du temps de travail effectif depuis l’accord de branche IDCC 3043. Vous devez les rémunérer comme tels et les inclure dans vos calculs de coût, même s’ils ne sont pas facturés au client.',
  },
  {
    question: 'Quel taux de charges sociales prendre ?',
    answer:
      'Pour un agent de propreté en CDI au SMIC, le taux de charges sociales employeur tourne autour de 42 % (URSSAF + prévoyance + retraite + formation). Ajustez selon votre situation réelle et votre conseil paie.',
  },
  {
    question: 'Le résultat inclut-il les frais de structure ?',
    answer:
      'Non. Le calculateur isole la marge brute du contrat (avant frais de structure : direction, encadrement, locaux, comptabilité). Pour obtenir la marge nette, soustrayez votre quote-part de frais fixes.',
  },
];

export default function ProfitabilityPage() {
  return (
    <main>
      <SchemaOrg
        schemas={[
          breadcrumbListSchema([
            { name: 'Accueil', href: '/' },
            { name: 'Outils', href: '/outils' },
            { name: 'Rentabilité contrat', href: PATH },
          ]),
          softwareApplicationSchema({
            name: 'Calculateur de rentabilité contrat nettoyage',
            path: PATH,
            description:
              'Outil gratuit de calcul de la marge brute d’un contrat de propreté.',
            applicationCategory: 'BusinessApplication',
            offers: { price: 'free' },
          }),
          faqPageSchema(FAQ),
        ]}
      />
      <PageHeader
        eyebrow="Outil gratuit"
        title="Rentabilité d’un contrat"
        description="Mesurez la marge brute réelle d’un contrat de propreté en intégrant coût agent, charges sociales, déplacements et matériel."
        breadcrumbs={[
          { name: 'Outils', href: '/outils' },
          { name: 'Rentabilité contrat', href: PATH },
        ]}
      />
      <section className="bg-surface py-12 md:py-16" aria-labelledby="calc-heading">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="calc-heading" className="sr-only">
            Calculateur
          </h2>
          <ProfitabilityCalculator />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FaqBlock entries={FAQ} />
        </div>
      </section>

      <CtaSection
        title="Vos marges peuvent être pilotées."
        description="Découvrez comment Proprely structure vos prestations et automatise la facturation pour préserver vos marges."
        primary={{
          label: 'Voir nos guides logiciels',
          href: '/logiciels',
        }}
        secondary={{
          label: 'Découvrir Proprely',
          href: 'https://proprely.fr',
        }}
      />
    </main>
  );
}
