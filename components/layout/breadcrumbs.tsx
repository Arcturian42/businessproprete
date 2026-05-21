import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import {
  breadcrumbListSchema,
  type BreadcrumbItem,
} from '@/lib/schema/breadcrumb-list';
import { cn } from '@/lib/utils';

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

/**
 * Visible HTML breadcrumb + Schema.org BreadcrumbList JSON-LD.
 * Per docs/13-seo-technical-impl.md and design.md §6.Breadcrumbs.
 * The "Accueil" root crumb is prepended automatically.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [
    { name: 'Accueil', href: '/' },
    ...items,
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListSchema(allItems)),
        }}
      />
      <nav
        aria-label="Fil d'Ariane"
        className={cn(
          'border-b border-border-light bg-white py-3 text-xs text-text-muted',
          className,
        )}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="flex flex-wrap items-center gap-1.5">
            {allItems.map((item, index) => {
              const isLast = index === allItems.length - 1;
              return (
                <li key={item.href} className="flex items-center gap-1.5">
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="font-medium text-text-primary"
                    >
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-brand focus-visible:outline-none focus-visible:text-brand"
                    >
                      {item.name}
                    </Link>
                  )}
                  {!isLast && (
                    <ChevronRight
                      className="h-3.5 w-3.5 text-border-dark"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
