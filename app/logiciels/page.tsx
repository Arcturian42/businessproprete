import type { Metadata } from 'next';

import { ComingSoonBlock } from '@/components/content/coming-soon-block';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = {
  title: 'Logiciels pour entreprises de nettoyage : avis et comparatifs',
  description:
    'Tous les avis indépendants Propreté Business : Proprely, Progiclean, 2BePragma, Organilog, Klipso. Fonctionnalités, prix, alternatives, avantages et limites.',
  alternates: { canonical: '/logiciels' },
};

export default function LogicielsHubPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Logiciels"
        title="Logiciels de nettoyage : avis & comparatifs"
        description="Évaluations indépendantes et détaillées des SaaS dédiés à la gestion d’une entreprise de propreté : planning, agents, devis, qualité."
        breadcrumbs={[{ name: 'Logiciels', href: '/logiciels' }]}
      />
      <ComingSoonBlock
        title="Premiers avis logiciels en cours de finalisation"
        description="Nous publierons d’abord 5 fiches détaillées : Proprely, Progiclean, 2BePragma, Organilog, Klipso. Chaque fiche est notée sur 10 critères métier."
        source="logiciels-hub"
      />
    </main>
  );
}
