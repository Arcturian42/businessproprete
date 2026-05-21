import type { Metadata } from 'next';

import { CtaSection } from '@/components/content/cta-section';
import { FaqBlock } from '@/components/content/faq-block';
import { PageHeader } from '@/components/layout/page-header';
import { QuoteGenerator } from '@/components/tools/quote-generator';
import { SchemaOrg } from '@/components/seo/schema-org';
import { softwareApplicationSchema } from '@/lib/schema/software-application';
import { faqPageSchema } from '@/lib/schema/faq-page';
import { breadcrumbListSchema } from '@/lib/schema/breadcrumb-list';

const PATH = '/outils/generateur-devis-nettoyage';

export const metadata: Metadata = {
  title: 'Générateur de devis nettoyage — PDF gratuit',
  description:
    'Créez un devis professionnel pour vos prestations de nettoyage : coordonnées entreprise, client, lignes, TVA, total TTC. Aperçu instantané + impression PDF.',
  alternates: { canonical: PATH },
};

const FAQ = [
  {
    question: 'Comment télécharger le devis en PDF ?',
    answer:
      'Cliquez sur « Imprimer / enregistrer en PDF » puis dans la fenêtre d’impression de votre navigateur, choisissez « Enregistrer au format PDF » comme destination. Tous les navigateurs modernes (Chrome, Safari, Firefox, Edge) supportent cette fonction.',
  },
  {
    question: 'Mes données sont-elles enregistrées ?',
    answer:
      'Non. Le devis est généré 100 % côté navigateur. Rien n’est transmis à nos serveurs, rien n’est stocké. Si vous quittez la page, vos données sont perdues — pensez à enregistrer le PDF.',
  },
  {
    question: 'Le devis est-il juridiquement valable ?',
    answer:
      'Le format respecte les mentions habituelles d’un devis B2B (identité, date, numéro, lignes, TVA, total TTC, validité). Vérifiez les mentions obligatoires propres à votre situation : SIRET, conditions générales, mention TVA non applicable le cas échéant.',
  },
  {
    question: 'Comment ajouter mon logo ?',
    answer:
      'Pour cette version, l’ajout d’un logo est manuel post-export. Ouvrez le PDF, ajoutez votre logo via votre traitement de texte ou un outil PDF. Une version avec upload logo est prévue (V1.1).',
  },
];

export default function QuoteGeneratorPage() {
  return (
    <main>
      <SchemaOrg
        schemas={[
          breadcrumbListSchema([
            { name: 'Accueil', href: '/' },
            { name: 'Outils', href: '/outils' },
            { name: 'Générateur de devis', href: PATH },
          ]),
          softwareApplicationSchema({
            name: 'Générateur de devis nettoyage',
            path: PATH,
            description:
              'Outil gratuit de création de devis professionnel pour prestations de propreté.',
            applicationCategory: 'BusinessApplication',
            offers: { price: 'free' },
          }),
          faqPageSchema(FAQ),
        ]}
      />
      <PageHeader
        eyebrow="Outil gratuit"
        title="Générateur de devis"
        description="Créez un devis professionnel en quelques secondes. Aperçu instantané, impression PDF via votre navigateur. Aucune donnée enregistrée."
        breadcrumbs={[
          { name: 'Outils', href: '/outils' },
          { name: 'Générateur de devis', href: PATH },
        ]}
      />
      <section className="bg-surface py-12 md:py-16" aria-labelledby="quote-heading">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="quote-heading" className="sr-only">
            Générateur
          </h2>
          <QuoteGenerator />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FaqBlock entries={FAQ} />
        </div>
      </section>

      <CtaSection
        title="Industrialisez la gestion de vos devis."
        description="Modèles, signature électronique, suivi des relances : Proprely structure votre cycle commercial."
        primary={{
          label: 'Voir les logiciels devis',
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
