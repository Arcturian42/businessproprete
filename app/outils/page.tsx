import type { Metadata } from 'next';
import { Calculator, Gauge, FileSpreadsheet, Users } from 'lucide-react';

import { PageHeader } from '@/components/layout/page-header';
import { ToolCard } from '@/components/cards/tool-card';

export const metadata: Metadata = {
  title: 'Outils gratuits pour entreprises de nettoyage',
  description:
    'Calculateur de prix au m², calculateur de rentabilité contrat, générateur de devis PDF, lead magnet « Recevoir 10 prospects B2B ». Sans inscription pour utiliser.',
  alternates: { canonical: '/outils' },
};

const TOOLS = [
  {
    href: '/outils/calculateur-prix-nettoyage',
    title: 'Calculateur de prix nettoyage',
    description:
      'Estimez en une minute le coût mensuel d’une prestation selon la surface, la fréquence et la ville.',
    icon: Calculator,
  },
  {
    href: '/outils/calculateur-rentabilite-contrat',
    title: 'Rentabilité d’un contrat',
    description:
      'Calculez la marge réelle d’un contrat : coût agent, charges, déplacements, matériel.',
    icon: Gauge,
  },
  {
    href: '/outils/generateur-devis-nettoyage',
    title: 'Générateur de devis',
    description:
      'Créez et téléchargez un devis professionnel en PDF avec vos coordonnées et logo.',
    icon: FileSpreadsheet,
  },
  {
    href: '/outils/recevoir-10-prospects-b2b',
    title: 'Recevoir 10 prospects B2B',
    description:
      'Demandez 10 prospects qualifiés correspondant à vos critères, transmis par Réseau Propreté.',
    icon: Users,
  },
];

export default function OutilsHubPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Outils gratuits"
        title="Calculez, simulez, générez."
        description="Quatre outils opérationnels pour estimer vos prix, mesurer la rentabilité de vos contrats, créer un devis pro et capter des prospects."
        breadcrumbs={[{ name: 'Outils', href: '/outils' }]}
      />
      <section className="bg-white pb-20" aria-labelledby="tools-grid-heading">
        <h2 id="tools-grid-heading" className="sr-only">
          Outils disponibles
        </h2>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
