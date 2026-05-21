import type { Metadata } from 'next';

import { ComingSoonBlock } from '@/components/content/coming-soon-block';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = {
  title: 'Annuaire des entreprises de nettoyage en France',
  description:
    'Annuaire B2B de sociétés de nettoyage en France : SIRET, NAF, adresse, spécialités, score de visibilité. Recherche par ville et spécialité.',
  alternates: { canonical: '/annuaire' },
};

export default function AnnuaireHubPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Annuaire"
        title="L’annuaire des entreprises de nettoyage en France"
        description="Trouvez une société de propreté par ville et spécialité. Chaque fiche affiche SIRET, NAF, zone desservie et score de visibilité algorithmique."
        breadcrumbs={[{ name: 'Annuaire', href: '/annuaire' }]}
      />
      <ComingSoonBlock
        title="L’annuaire ouvre ses premières fiches"
        description="Nous indexons les premières entreprises sur 10 villes pilotes : Paris, Lyon, Marseille, Bordeaux, Nantes, Lille, Toulouse, Strasbourg, Nice, Rennes."
        source="annuaire-hub"
      />
    </main>
  );
}
