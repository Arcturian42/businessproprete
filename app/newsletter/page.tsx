import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';

import { NewsletterForm } from '@/components/content/newsletter-form';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = {
  title: 'Newsletter — un email hebdomadaire',
  description:
    'Recevez chaque semaine les meilleurs guides, analyses et outils Propreté Business directement par email. Désinscription en un clic.',
  alternates: { canonical: '/newsletter' },
};

const PROMISE = [
  'Les meilleurs articles publiés dans la semaine.',
  'Les évolutions réglementaires importantes (IDCC 3043).',
  'Un outil ou un benchmark utile, à chaque envoi.',
  "Pas de spam. Désinscription en un clic dans chaque email.",
];

export default function NewsletterPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Newsletter"
        title="Un email par semaine, pas un de plus."
        description="Les actualités, données et outils du secteur, triés par notre équipe éditoriale. Conçue pour les dirigeants d’entreprises de propreté."
        breadcrumbs={[{ name: 'Newsletter', href: '/newsletter' }]}
      />
      <section className="bg-surface py-16 md:py-20" aria-labelledby="signup-heading">
        <div className="container mx-auto grid max-w-5xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              id="signup-heading"
              className="text-2xl font-bold text-text-primary"
            >
              Ce que vous recevrez
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-text-secondary">
              {PROMISE.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent-green"
                    aria-hidden="true"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-border-light bg-white p-8 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              S&apos;abonner
            </p>
            <h3 className="mt-2 text-xl font-semibold text-text-primary">
              Inscription gratuite
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              Saisissez votre adresse professionnelle. Vous recevrez un email
              de confirmation (double opt-in RGPD).
            </p>
            <NewsletterForm source="newsletter-page" variant="card" className="mt-6" />
          </div>
        </div>
      </section>
    </main>
  );
}
