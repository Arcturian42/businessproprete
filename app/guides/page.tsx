import type { Metadata } from 'next';

import { ArticleCard } from '@/components/cards/article-card';
import { ComingSoonBlock } from '@/components/content/coming-soon-block';
import { PageHeader } from '@/components/layout/page-header';
import { listGuides } from '@/lib/content/loader';

export const metadata: Metadata = {
  title: 'Guides pratiques pour entreprises de nettoyage',
  description:
    'Tous les guides Propreté Business : digitalisation, recrutement, management des agents, calcul de prix, devis, choix de prestataire, conformité réglementaire.',
  alternates: { canonical: '/guides' },
};

export default async function GuidesHubPage() {
  const guides = await listGuides('guides');

  return (
    <main>
      <PageHeader
        eyebrow="Guides"
        title="Tous les guides pour les pros du nettoyage"
        description="Méthodes, modèles et conseils opérationnels pour structurer, vendre, manager et digitaliser votre entreprise de propreté."
        breadcrumbs={[{ name: 'Guides', href: '/guides' }]}
      />
      {guides.length === 0 ? (
        <ComingSoonBlock
          title="Les premiers guides arrivent prochainement"
          description="Nous publions actuellement les guides piliers : grille salariale 2025, choix d’un prestataire, planning agents, devis et digitalisation."
          source="guides-hub"
        />
      ) : (
        <section
          className="bg-surface py-16 md:py-20"
          aria-labelledby="guides-grid-heading"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="guides-grid-heading" className="sr-only">
              Guides publiés
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <ArticleCard
                  key={guide.path}
                  href={guide.path}
                  title={guide.meta.title}
                  excerpt={guide.meta.description}
                  category={guide.meta.category}
                  author={guide.meta.author}
                  date={formatFrDate(guide.meta.datePublished)}
                  readingTime={guide.readingTimeMin}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function formatFrDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}
