import type { Metadata } from 'next';

import { PageHeader } from '@/components/layout/page-header';
import { PARENT_PROJECTS, SITE_NAME } from '@/lib/seo/constants';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Propreté Business est un média B2B indépendant dédié au nettoyage professionnel en France. Notre mission, notre méthode, notre indépendance éditoriale.',
  alternates: { canonical: '/a-propos' },
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="À propos"
        title="Pourquoi Propreté Business existe."
        description="Le secteur de la propreté pèse 21 Md€ et emploie plus de 600 000 personnes en France. Il manque pourtant d’un média spécialisé, indépendant et utile. C’est notre projet."
        breadcrumbs={[{ name: 'À propos', href: '/a-propos' }]}
      />
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none text-base leading-relaxed text-text-secondary">
            <h2>Notre mission</h2>
            <p>
              Équiper les dirigeants d’entreprises de nettoyage en information,
              outils et données pour structurer, vendre, manager et digitaliser
              leur activité.
            </p>

            <h2>Notre méthode</h2>
            <p>
              Chaque article cite ses sources. Chaque chiffre indique sa
              provenance. Chaque guide est revu par un professionnel du secteur
              avant publication. Pas d’AI slop, pas de contenu générique :
              uniquement de l’expertise opérationnelle.
            </p>

            <h2>Notre indépendance</h2>
            <p>
              {SITE_NAME} appartient au même écosystème que{' '}
              <a
                href={PARENT_PROJECTS.proprely.url}
                className="text-brand hover:underline"
                rel="noopener"
              >
                Proprely
              </a>{' '}
              (SaaS de gestion) et{' '}
              <a
                href={PARENT_PROJECTS.reseauProprete.url}
                className="text-brand hover:underline"
                rel="noopener"
              >
                Réseau Propreté
              </a>{' '}
              (annuaire et mise en relation). Lorsque nous mentionnons l’un
              ou l’autre, nous l’indiquons explicitement. Nos comparatifs
              logiciels suivent une méthodologie publique et auditable.
            </p>

            <h2>Ce que vous trouverez ici</h2>
            <ul>
              <li>Des guides pratiques (digitalisation, recrutement, devis).</li>
              <li>Des analyses réglementaires (IDCC 3043, sécurité, paie).</li>
              <li>
                Des comparatifs indépendants de logiciels de gestion (Proprely,
                Progiclean, 2BePragma, Organilog, Klipso).
              </li>
              <li>Des outils gratuits (calcul de prix, rentabilité, devis).</li>
              <li>
                Un annuaire structuré des entreprises de nettoyage en France.
              </li>
              <li>Un observatoire data du secteur.</li>
            </ul>

            <h2>Nous contacter</h2>
            <p>
              Une remarque, une correction, une proposition d’expertise, une
              demande presse ? Écrivez-nous via la{' '}
              <a href="/contact" className="text-brand hover:underline">
                page Contact
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
