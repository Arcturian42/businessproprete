import type { Metadata } from 'next';

import { ComingSoonBlock } from '@/components/content/coming-soon-block';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = {
  title: 'Comparatifs logiciels propreté',
  description:
    'Comparatifs indépendants des logiciels de gestion pour entreprises de nettoyage. Critères métier, scoring, méthodologie transparente.',
  alternates: { canonical: '/comparatifs' },
};

export default function ComparatifsHubPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Comparatifs"
        title="Comparatifs logiciels propreté"
        description="Confrontez les logiciels du marché sur des critères métier précis. Notre méthodologie est publique et transparente."
        breadcrumbs={[{ name: 'Comparatifs', href: '/comparatifs' }]}
      />
      <ComingSoonBlock
        title="3 comparatifs piliers en cours de finalisation"
        description="« Meilleur logiciel nettoyage 2025 », « Proprely vs Excel » et « Logiciel planning nettoyage » seront publiés en priorité."
        source="comparatifs-hub"
      />
    </main>
  );
}
