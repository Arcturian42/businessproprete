import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Building2, Globe, Mail, MapPin, Phone } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CtaSection } from '@/components/content/cta-section';
import { PageHeader } from '@/components/layout/page-header';
import { ScoreBadge } from '@/components/comparison/score-badge';
import { SchemaOrg } from '@/components/seo/schema-org';
import { localBusinessSchema } from '@/lib/schema/local-business';
import { breadcrumbListSchema } from '@/lib/schema/breadcrumb-list';
import { canonicalUrl } from '@/lib/seo/canonical';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const revalidate = 3600;
export const dynamicParams = true;

type CompanyRow = {
  id: string;
  name: string;
  slug: string;
  siret: string | null;
  siren: string | null;
  naf_code: string | null;
  naf_label: string | null;
  address: string | null;
  postal_code: string | null;
  city_id: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  employee_count: number | null;
  description: string | null;
  specialties: string[] | null;
  service_area: string[] | null;
  lat: number | null;
  lng: number | null;
  score_visibility: number;
  is_verified: boolean;
};

type CityRow = {
  name: string;
  slug: string;
  region: string;
  department_code: string;
  department_name: string;
};

async function fetchCompany(slug: string): Promise<{
  company: CompanyRow;
  city: CityRow | null;
} | null> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase
      .from('companies')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .is('deleted_at', null)
      .single();

    const company = data as CompanyRow | null;
    if (!company) return null;

    let city: CityRow | null = null;
    if (company.city_id) {
      const { data: cityData } = await supabase
        .from('cities')
        .select('name, slug, region, department_code, department_name')
        .eq('id', company.city_id)
        .single();
      city = (cityData as CityRow | null) ?? null;
    }

    return { company, city };
  } catch (error) {
    console.error('[annuaire/[slug]] fetch failed', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const fetched = await fetchCompany(params.slug);
  if (!fetched) {
    return {
      title: 'Fiche entreprise',
      robots: { index: false, follow: false },
    };
  }
  const { company, city } = fetched;
  const title = city
    ? `${company.name} (${city.name}) — fiche annuaire`
    : `${company.name} — fiche annuaire`;
  const description =
    company.description ??
    `Coordonnées, spécialités et score de visibilité de ${company.name} dans l'annuaire des entreprises de nettoyage.`;

  return {
    title,
    description,
    alternates: { canonical: `/annuaire/${company.slug}` },
    openGraph: {
      title,
      description,
      url: canonicalUrl(`/annuaire/${company.slug}`),
      type: 'profile',
    },
  };
}

export default async function CompanyProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const fetched = await fetchCompany(params.slug);
  if (!fetched) notFound();

  const { company, city } = fetched;
  const profilePath = `/annuaire/${company.slug}`;

  return (
    <main>
      <SchemaOrg
        schemas={[
          breadcrumbListSchema([
            { name: 'Accueil', href: '/' },
            { name: 'Annuaire', href: '/annuaire' },
            { name: company.name, href: profilePath },
          ]),
          localBusinessSchema({
            name: company.name,
            path: profilePath,
            description: company.description ?? undefined,
            telephone: company.phone ?? undefined,
            email: company.email ?? undefined,
            url: company.website ?? undefined,
            address:
              company.address || company.postal_code || city
                ? {
                    streetAddress: company.address ?? undefined,
                    postalCode: company.postal_code ?? undefined,
                    addressLocality: city?.name ?? '',
                    addressRegion: city?.region ?? undefined,
                    addressCountry: 'FR',
                  }
                : undefined,
            geo:
              company.lat != null && company.lng != null
                ? { latitude: company.lat, longitude: company.lng }
                : undefined,
            identifier: company.siret ?? undefined,
            isicV4: company.naf_code ?? undefined,
          }),
        ]}
      />

      <PageHeader
        eyebrow={
          city
            ? `Annuaire · ${city.name} (${city.department_code})`
            : 'Fiche annuaire'
        }
        title={company.name}
        description={company.description ?? undefined}
        breadcrumbs={[
          { name: 'Annuaire', href: '/annuaire' },
          { name: company.name, href: profilePath },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <ScoreBadge score={company.score_visibility} />
          {company.is_verified && <Badge variant="verified">Vérifié</Badge>}
          {company.naf_code && (
            <span className="font-mono text-xs text-text-muted">
              NAF {company.naf_code}
            </span>
          )}
          {company.siret && (
            <span className="font-mono text-xs text-text-muted">
              SIRET {company.siret}
            </span>
          )}
        </div>
      </PageHeader>

      <section className="bg-white py-12" aria-labelledby="profile-heading">
        <div className="container mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <h2 id="profile-heading" className="sr-only">
            Coordonnées et informations
          </h2>

          <div className="space-y-6 lg:col-span-2">
            <div>
              <h3 className="text-base font-semibold uppercase tracking-wide text-text-muted">
                Coordonnées
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {company.address && (
                  <InfoRow icon={MapPin} label={company.address} />
                )}
                {(company.postal_code || city) && (
                  <InfoRow
                    icon={Building2}
                    label={`${company.postal_code ?? ''} ${city?.name ?? ''}`.trim()}
                  />
                )}
                {company.phone && (
                  <InfoRow icon={Phone} label={company.phone} href={`tel:${company.phone}`} />
                )}
                {company.email && (
                  <InfoRow icon={Mail} label={company.email} href={`mailto:${company.email}`} />
                )}
                {company.website && (
                  <InfoRow
                    icon={Globe}
                    label={company.website}
                    href={company.website}
                    external
                  />
                )}
              </ul>
            </div>

            {company.specialties && company.specialties.length > 0 && (
              <div>
                <h3 className="text-base font-semibold uppercase tracking-wide text-text-muted">
                  Spécialités
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {company.specialties.map((specialty) => (
                    <li key={specialty}>
                      <Badge variant="muted">{specialty}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {company.service_area && company.service_area.length > 0 && (
              <div>
                <h3 className="text-base font-semibold uppercase tracking-wide text-text-muted">
                  Zone d&apos;intervention
                </h3>
                <p className="mt-3 text-sm text-text-secondary">
                  {company.service_area.join(' · ')}
                </p>
              </div>
            )}
          </div>

          <aside className="rounded-card border border-border-light bg-surface p-6">
            <p className="text-sm font-semibold text-text-primary">
              Besoin d&apos;un devis ?
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Recevez 3 devis qualifiés via notre partenaire Réseau Propreté.
            </p>
            <Button asChild size="lg" className="mt-4 w-full">
              <a href="/outils/recevoir-10-prospects-b2b">Demander un devis</a>
            </Button>
            <Button asChild variant="outline" size="md" className="mt-3 w-full">
              <a href={`mailto:contact@propretebusiness.fr?subject=Réclamer la fiche ${encodeURIComponent(company.name)}`}>
                Réclamer cette fiche
              </a>
            </Button>
          </aside>
        </div>
      </section>

      <CtaSection
        title="Trouvez d'autres entreprises de nettoyage"
        description="Parcourez l'annuaire par ville ou par spécialité."
        primary={{ label: 'Voir l’annuaire', href: '/annuaire' }}
        secondary={
          city
            ? {
                label: `Société à ${city.name}`,
                href: `/${city.slug}/societes-nettoyage`,
              }
            : undefined
        }
      />
    </main>
  );
}

function InfoRow({
  icon: Icon,
  label,
  href,
  external,
}: {
  icon: React.ComponentType<React.SVGAttributes<SVGElement>>;
  label: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <span className="flex items-start gap-2">
      <Icon
        className="mt-0.5 h-4 w-4 shrink-0 text-text-muted"
        aria-hidden="true"
      />
      <span className="text-text-secondary">{label}</span>
    </span>
  );
  if (!href) return <li>{content}</li>;
  return (
    <li>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="text-text-secondary transition-colors hover:text-brand"
      >
        {content}
      </a>
    </li>
  );
}
