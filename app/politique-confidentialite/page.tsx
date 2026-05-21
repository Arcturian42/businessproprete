import type { Metadata } from 'next';

import { PageHeader } from '@/components/layout/page-header';
import { CONTACT_EMAIL, SITE_NAME } from '@/lib/seo/constants';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Comment Propreté Business collecte, traite et protège vos données personnelles. Conformité RGPD.',
  alternates: { canonical: '/politique-confidentialite' },
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHeader
        title="Politique de confidentialité"
        breadcrumbs={[
          { name: 'Politique de confidentialité', href: '/politique-confidentialite' },
        ]}
      />
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none text-base leading-relaxed text-text-secondary">
            <p>
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}.
            </p>

            <h2>1. Responsable du traitement</h2>
            <p>
              {SITE_NAME} est responsable du traitement des données
              personnelles collectées sur ce site. Contact :{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>

            <h2>2. Données collectées</h2>
            <ul>
              <li>
                <strong>Newsletter</strong> : adresse email, nom d’entreprise
                (optionnel), source de la page d’inscription.
              </li>
              <li>
                <strong>Formulaires</strong> (contact, lead magnet, devis) :
                email, nom, téléphone (optionnel), taille d’entreprise.
              </li>
              <li>
                <strong>Outils</strong> (calculateurs) : entrées et résultats
                anonymisés (sans email tant que vous ne le fournissez pas
                explicitement).
              </li>
              <li>
                <strong>Analytique</strong> : pages visitées, durée, source de
                trafic — via Google Analytics 4 et Vercel Analytics, en
                anonymisant les adresses IP.
              </li>
            </ul>

            <h2>3. Bases légales</h2>
            <ul>
              <li>
                <strong>Consentement</strong> : newsletter, cookies non
                essentiels.
              </li>
              <li>
                <strong>Intérêt légitime</strong> : annuaire d’entreprises
                (données publiques Sirene), analytique anonymisée.
              </li>
              <li>
                <strong>Exécution d’un contrat</strong> : réponse à une
                demande de contact ou de devis.
              </li>
            </ul>

            <h2>4. Conservation</h2>
            <p>
              Les données newsletter sont conservées jusqu’à votre
              désinscription. Les leads et formulaires sont conservés 3 ans
              après le dernier contact. Les données analytiques sont
              anonymisées après 14 mois.
            </p>

            <h2>5. Vos droits</h2>
            <p>
              Vous disposez d’un droit d’accès, de rectification, de
              suppression, de limitation, de portabilité et d’opposition.
              Pour les exercer, écrivez à{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> (objet :
              « RGPD »).
            </p>

            <h2>6. Cookies</h2>
            <p>
              Voir notre <a href="/cookies">politique cookies</a>.
            </p>

            <h2>7. Transferts hors UE</h2>
            <p>
              Certains sous-traitants (Vercel, Brevo, Google) peuvent héberger
              ou traiter des données aux États-Unis. Ces transferts sont
              encadrés par les clauses contractuelles types de la Commission
              européenne.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
