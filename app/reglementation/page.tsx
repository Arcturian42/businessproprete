import type { Metadata } from 'next';

import { ComingSoonBlock } from '@/components/content/coming-soon-block';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = {
  title: 'Réglementation du nettoyage professionnel',
  description:
    'Convention collective IDCC 3043, grille salariale, majorations heures de nuit / week-end, obligations employeur, sécurité au travail dans la propreté.',
  alternates: { canonical: '/reglementation' },
};

export default function ReglementationHubPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Réglementation"
        title="La réglementation propreté décodée"
        description="Convention collective IDCC 3043, grille salariale, majorations, obligations employeur, sécurité au travail. Mise à jour à chaque évolution réglementaire."
        breadcrumbs={[{ name: 'Réglementation', href: '/reglementation' }]}
      />
      <ComingSoonBlock
        title="Articles réglementaires en cours de publication"
        description="Nous publions actuellement les fiches piliers : grille salariale 2025, majorations heures de nuit et week-end, temps de déplacement inter-sites."
        source="reglementation-hub"
      />
    </main>
  );
}
