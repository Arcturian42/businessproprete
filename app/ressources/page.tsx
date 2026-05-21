import type { Metadata } from 'next';

import { ComingSoonBlock } from '@/components/content/coming-soon-block';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = {
  title: 'Ressources gratuites — PDFs, modèles & check-lists',
  description:
    'Téléchargez gratuitement nos PDFs, modèles Excel, check-lists et templates pour piloter votre entreprise de nettoyage.',
  alternates: { canonical: '/ressources' },
};

export default function RessourcesHubPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Ressources"
        title="Téléchargez nos ressources gratuites"
        description="PDFs, modèles Excel, check-lists et templates conçus pour vous faire gagner du temps au quotidien."
        breadcrumbs={[{ name: 'Ressources', href: '/ressources' }]}
      />
      <ComingSoonBlock
        title="Première vague de ressources en finalisation"
        description="Au programme : guide complet grille salariale 2025 (PDF), check-list audit digitalisation, modèles de planning hebdomadaire Excel."
        source="ressources-hub"
      />
    </main>
  );
}
