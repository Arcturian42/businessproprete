import type { Metadata } from 'next';

import { PageHeader } from '@/components/layout/page-header';
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@/lib/seo/constants';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Mentions légales et informations éditeur du média Propreté Business.',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: true, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <main>
      <PageHeader
        title="Mentions légales"
        breadcrumbs={[{ name: 'Mentions légales', href: '/mentions-legales' }]}
      />
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none text-base leading-relaxed text-text-secondary">
            <h2>Éditeur du site</h2>
            <p>
              <strong>{SITE_NAME}</strong>
              <br />
              Site : <a href={SITE_URL}>{SITE_URL}</a>
              <br />
              Email : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>

            <h2>Directeur de la publication</h2>
            <p>
              Les coordonnées du directeur de la publication sont disponibles
              sur demande à l’adresse {CONTACT_EMAIL}.
            </p>

            <h2>Hébergeur</h2>
            <p>
              Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
              États-Unis. Site : vercel.com.
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L’ensemble du contenu éditorial (articles, guides, comparatifs,
              outils) est protégé par le droit d’auteur. Toute reproduction
              partielle ou totale doit mentionner la source et un lien vers
              la page d’origine.
            </p>

            <h2>Données INSEE & Sirene</h2>
            <p>
              Les fiches entreprises de l’annuaire reposent sur des données
              publiques issues du répertoire Sirene (INSEE). Si vous
              représentez une entreprise et souhaitez modifier ou supprimer
              une fiche, contactez-nous à {CONTACT_EMAIL} (objet : « RGPD »).
            </p>

            <h2>Crédits</h2>
            <p>
              Icônes : Lucide. Polices : Inter & JetBrains Mono (Google
              Fonts). Framework : Next.js. Hébergement : Vercel. Base de
              données : Supabase.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
