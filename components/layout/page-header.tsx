import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/lib/schema/breadcrumb-list';

/**
 * Standard page header for hub and content pages.
 * Renders breadcrumbs + eyebrow + H1 + optional description.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <header
        className={cn('bg-white py-12 md:py-16', className)}
        aria-labelledby="page-heading"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              {eyebrow}
            </p>
          )}
          <h1
            id="page-heading"
            className="mt-2 max-w-3xl text-3xl font-bold leading-tight text-text-primary md:text-4xl"
          >
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
              {description}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </header>
    </>
  );
}
