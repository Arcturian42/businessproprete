import type { Metadata } from 'next';
import { Mail, Newspaper, Settings2 } from 'lucide-react';

import { PageHeader } from '@/components/layout/page-header';
import { CONTACT_EMAIL } from '@/lib/seo/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Une remarque, une correction, une demande presse ou un partenariat ? Contactez l’équipe Propreté Business.',
  alternates: { canonical: '/contact' },
};

const TOPICS = [
  {
    icon: Newspaper,
    title: 'Presse & expertise',
    description:
      "Demande d’interview, citation d’expert, mise à disposition de données chiffrées du secteur.",
  },
  {
    icon: Settings2,
    title: 'Correction éditoriale',
    description:
      "Vous avez repéré une erreur, un chiffre obsolète ou une référence cassée ? Signalez-le.",
  },
  {
    icon: Mail,
    title: 'Partenariats',
    description:
      "Sponsoring de contenu (signalé), parrainage de baromètre, accès données licence.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title="Écrivez-nous"
        description="L’équipe éditoriale lit chaque message et répond sous 48h ouvrées."
        breadcrumbs={[{ name: 'Contact', href: '/contact' }]}
      />
      <section className="bg-white py-16 md:py-20" aria-labelledby="contact-heading">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="contact-heading" className="sr-only">
            Sujets de contact
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {TOPICS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-card border border-border-light bg-surface p-6"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-card bg-brand-light text-brand"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-text-primary">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-card border border-border-light bg-surface-alt p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">
              Adresse email
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-block font-mono text-xl text-brand transition-colors hover:text-brand-dark"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-4 text-xs text-text-muted">
              Pour les demandes RGPD (suppression de fiche annuaire, droits
              d’accès), précisez « RGPD » en objet.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
