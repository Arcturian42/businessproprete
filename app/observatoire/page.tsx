import type { Metadata } from 'next';

import { ComingSoonBlock } from '@/components/content/coming-soon-block';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = {
  title: 'Observatoire du nettoyage professionnel',
  description:
    'Données chiffrées, études et baromètres du marché français de la propreté B2B. Chiffres clés, prix moyens, taux de digitalisation.',
  alternates: { canonical: '/observatoire' },
};

export default function ObservatoireHubPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Observatoire"
        title="L’observatoire de la propreté"
        description="Études, baromètres et chiffres clés du marché français du nettoyage professionnel. Données originales et sources publiques."
        breadcrumbs={[{ name: 'Observatoire', href: '/observatoire' }]}
      />
      <ComingSoonBlock
        title="Deux études phares en cours de publication"
        description="« État du marché 2025 » et « Baromètre digitalisation des entreprises de nettoyage 2025 » seront publiés sous forme d’article + PDF téléchargeable."
        source="observatoire-hub"
      />
    </main>
  );
}
