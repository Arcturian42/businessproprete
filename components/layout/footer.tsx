import Link from 'next/link';

import { Logo } from '@/components/layout/logo';
import { FOOTER_NAV } from '@/lib/data/navigation';
import { PARENT_PROJECTS, SITE_NAME, SITE_TAGLINE } from '@/lib/seo/constants';

/**
 * Footer — Surface Dark background, 4 columns desktop, stacked mobile.
 * Per design.md §6.Footer.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-border-dark">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo variant="dark" />
            <p className="mt-4 text-sm leading-relaxed text-border-dark">
              {SITE_TAGLINE}. Guides, données, outils gratuits pour les
              dirigeants d&apos;entreprises de nettoyage en France.
            </p>
          </div>

          {FOOTER_NAV.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-text-ondark">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-border-dark transition-colors duration-150 hover:text-text-ondark focus-visible:outline-none focus-visible:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs md:flex-row md:items-center md:justify-between">
          <p className="text-border-dark">
            © {currentYear} {SITE_NAME} — Média B2B du secteur de la propreté
            en France.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-text-muted">Écosystème :</span>
            <a
              href={PARENT_PROJECTS.proprely.url}
              rel="noopener noreferrer"
              className="text-border-dark transition-colors hover:text-text-ondark"
            >
              {PARENT_PROJECTS.proprely.name}
            </a>
            <a
              href={PARENT_PROJECTS.reseauProprete.url}
              rel="noopener noreferrer"
              className="text-border-dark transition-colors hover:text-text-ondark"
            >
              {PARENT_PROJECTS.reseauProprete.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
