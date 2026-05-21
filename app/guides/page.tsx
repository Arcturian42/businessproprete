import type { Metadata } from 'next';

import { ComingSoonBlock } from '@/components/content/coming-soon-block';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = {
  title: 'Guides pratiques pour entreprises de nettoyage',
  description:
    'Tous les guides Propreté Business : digitalisation, recrutement, management des agents, calcul de prix, devis, choix de prestataire, conformité réglementaire.',
  alternates: { canonical: '/guides' },
};

export default function GuidesHubPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Guides"
        title="Tous les guides pour les pros du nettoyage"
        description="Méthodes, modèles et conseils opérationnels pour structurer, vendre, manager et digitaliser votre entreprise de propreté."
        breadcrumbs={[{ name: 'Guides', href: '/guides' }]}
      />
      <ComingSoonBlock
        title="Les premiers guides arrivent prochainement"
        description="Nous publions actuellement les guides piliers : grille salariale 2025, choix d’un prestataire, planning agents, devis et digitalisation."
        source="guides-hub"
      />
    </main>
  );
}
