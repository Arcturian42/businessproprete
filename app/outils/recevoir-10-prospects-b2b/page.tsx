import type { Metadata } from 'next';

import { FaqBlock } from '@/components/content/faq-block';
import { PageHeader } from '@/components/layout/page-header';
import { ProspectsForm } from '@/components/tools/prospects-form';
import { SchemaOrg } from '@/components/seo/schema-org';
import { faqPageSchema } from '@/lib/schema/faq-page';
import { breadcrumbListSchema } from '@/lib/schema/breadcrumb-list';

const PATH = '/outils/recevoir-10-prospects-b2b';

export const metadata: Metadata = {
  title: 'Recevoir 10 prospects B2B nettoyage qualifiés',
  description:
    'Lead magnet : recevez une liste de 10 prospects B2B qualifiés (bureaux, copropriétés, industriel) selon vos zones d’intervention, transmis par Réseau Propreté.',
  alternates: { canonical: PATH },
  robots: { index: true, follow: true },
};

const FAQ = [
  {
    question: 'Que recevrai-je exactement ?',
    answer:
      'Une liste de 10 contacts B2B (nom de l’entreprise, secteur, taille, coordonnées principales) correspondant à votre zone et à votre offre. La liste est envoyée par email sous 7 jours par notre partenaire Réseau Propreté.',
  },
  {
    question: 'Comment sont sélectionnés les prospects ?',
    answer:
      'Sur la base des informations que vous renseignez : type de prestation (bureaux, industriel, copropriété, etc.), zone géographique et taille d’entreprise visée. Notre partenaire vérifie la qualification avant envoi.',
  },
  {
    question: 'Est-ce vraiment gratuit ?',
    answer:
      'Oui, sans engagement et sans carte bancaire. Cette opération est lancée par Réseau Propreté pour faire découvrir son service de mise en relation.',
  },
  {
    question: 'Mes données sont-elles partagées ?',
    answer:
      'Vos coordonnées sont transmises uniquement à Réseau Propreté pour traitement de votre demande, conformément à notre politique de confidentialité. Aucun partage avec des tiers commerciaux.',
  },
];

export default function ProspectsLeadMagnetPage() {
  return (
    <main>
      <SchemaOrg
        schemas={[
          breadcrumbListSchema([
            { name: 'Accueil', href: '/' },
            { name: 'Outils', href: '/outils' },
            { name: 'Recevoir 10 prospects', href: PATH },
          ]),
          faqPageSchema(FAQ),
        ]}
      />
      <PageHeader
        eyebrow="Lead magnet · gratuit"
        title="Recevez 10 prospects B2B qualifiés"
        description="Une liste ciblée de 10 entreprises susceptibles d’avoir besoin de services de nettoyage, transmise par notre partenaire Réseau Propreté."
        breadcrumbs={[
          { name: 'Outils', href: '/outils' },
          { name: 'Recevoir 10 prospects', href: PATH },
        ]}
      />
      <section className="bg-surface py-12 md:py-16" aria-labelledby="form-heading">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="form-heading" className="sr-only">
            Demande
          </h2>
          <ProspectsForm />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FaqBlock entries={FAQ} />
        </div>
      </section>
    </main>
  );
}
