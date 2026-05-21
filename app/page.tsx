import Link from 'next/link';
import {
  BookOpen,
  Calculator,
  FileSpreadsheet,
  Gauge,
  TrendingUp,
  Building2,
} from 'lucide-react';

import { CtaSection } from '@/components/content/cta-section';
import { GuideCard } from '@/components/cards/guide-card';
import { HeroSection } from '@/components/layout/hero-section';
import { NewsletterForm } from '@/components/content/newsletter-form';
import { StatsBar } from '@/components/local/stats-bar';
import { ToolCard } from '@/components/cards/tool-card';
import { SITE_NAME } from '@/lib/seo/constants';

const SECTOR_STATS = [
  { value: '21 Md€', label: 'CA du marché 2024' },
  { value: '15 500', label: 'Entreprises de propreté' },
  { value: '600 000+', label: 'Emplois en France' },
  { value: '+6,9 %', label: 'Croissance annuelle (CAGR)' },
];

const FEATURED_GUIDES = [
  {
    href: '/guides/digitaliser-entreprise-nettoyage',
    title: 'Digitaliser son entreprise de nettoyage',
    description:
      'Les étapes concrètes pour passer d’Excel + WhatsApp à un système opérationnel structuré.',
    icon: TrendingUp,
  },
  {
    href: '/reglementation/grille-salaire-proprete-2025',
    title: 'Grille salariale propreté 2025',
    description:
      'Le détail des salaires minimaux par échelon (IDCC 3043), majorations et coût complet d’un agent.',
    icon: FileSpreadsheet,
  },
  {
    href: '/guides/calculer-prix-nettoyage-bureaux',
    title: 'Calculer un prix de nettoyage de bureaux',
    description:
      'La méthode professionnelle pour bâtir un devis rentable au m² selon la fréquence et le type de locaux.',
    icon: BookOpen,
  },
];

const FREE_TOOLS = [
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
];

export default function HomePage() {
  return (
    <main>
      <HeroSection
        eyebrow={SITE_NAME}
        title="Le média de référence du nettoyage professionnel en France."
        description="Guides, données, comparatifs logiciels et outils gratuits pour les dirigeants d’entreprises de propreté B2B."
        primary={{ label: 'Consulter les guides', href: '/guides' }}
        secondary={{ label: 'Découvrir les outils', href: '/outils' }}
      />

      <StatsBar
        stats={SECTOR_STATS}
        source="Monde de la Propreté 2024, Transpire Insight 2025"
        title="Le secteur en chiffres"
      />

      <section className="bg-surface py-16 md:py-20" aria-labelledby="guides-heading">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                Guides pratiques
              </p>
              <h2
                id="guides-heading"
                className="mt-2 text-3xl font-bold text-text-primary md:text-4xl"
              >
                Des ressources concrètes pour votre entreprise
              </h2>
            </div>
            <Link
              href="/guides"
              className="text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              Voir tous les guides →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_GUIDES.map((guide) => (
              <GuideCard key={guide.href} {...guide} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20" aria-labelledby="tools-heading">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                Outils gratuits
              </p>
              <h2
                id="tools-heading"
                className="mt-2 text-3xl font-bold text-text-primary md:text-4xl"
              >
                Calculez, simulez, générez en quelques clics
              </h2>
            </div>
            <Link
              href="/outils"
              className="text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              Tous les outils →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FREE_TOOLS.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-20" aria-labelledby="annuaire-heading">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-card bg-brand-light text-brand"
              aria-hidden="true"
            >
              <Building2 className="h-6 w-6" />
            </span>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Annuaire
            </p>
            <h2
              id="annuaire-heading"
              className="text-3xl font-bold text-text-primary md:text-4xl"
            >
              Trouver une entreprise de nettoyage
            </h2>
            <p className="max-w-2xl text-base text-text-secondary">
              Recherchez par ville, spécialité ou taille. Toutes les fiches
              affichent SIRET, NAF, zone desservie et score de visibilité.
            </p>
            <Link
              href="/annuaire"
              className="mt-2 inline-flex h-11 items-center rounded-button border border-brand px-6 text-sm font-semibold text-brand transition-colors hover:bg-brand-light"
            >
              Consulter l&apos;annuaire
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        title="Ne manquez pas les mises à jour du secteur"
        description="Un email par semaine avec les meilleurs articles, données et outils. Pas de spam, désinscription en un clic."
        primary={{ label: "S'abonner gratuitement", href: '/newsletter' }}
        trustNote="Rejoignez les dirigeants déjà abonnés"
      >
        <div className="mx-auto mt-8 max-w-md">
          <NewsletterForm source="homepage" />
        </div>
      </CtaSection>
    </main>
  );
}
