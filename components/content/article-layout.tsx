import { Calendar, Clock, UserCircle2 } from 'lucide-react';

import { Toc } from '@/components/content/toc';
import type { GuideRecord } from '@/lib/content/loader';
import { cn } from '@/lib/utils';

/**
 * Two-column article layout — main MDX body + sticky TOC sidebar.
 * Mirrors design.md §7 Guides template.
 */
export function ArticleLayout({
  record,
  children,
  category,
  className,
}: {
  record: GuideRecord;
  children: React.ReactNode;
  category: string;
  className?: string;
}) {
  const date = new Date(record.meta.dateModified ?? record.meta.datePublished);
  const dateLabel = date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const isUpdated = Boolean(record.meta.dateModified);

  return (
    <article className={cn('bg-white pb-16', className)}>
      <header className="border-b border-border-light py-10">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            {category}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-text-primary md:text-4xl">
            {record.meta.title}
          </h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-text-secondary">
            {record.meta.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <UserCircle2 className="h-4 w-4" aria-hidden="true" />
              {record.meta.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {isUpdated ? 'Mis à jour le ' : 'Publié le '}
              <time dateTime={(record.meta.dateModified ?? record.meta.datePublished)}>
                {dateLabel}
              </time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {record.readingTimeMin} min de lecture
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,_1fr)_240px]">
          <div className="min-w-0">
            <div className="max-w-prose">{children}</div>
          </div>
          <Toc entries={record.toc} />
        </div>
      </div>
    </article>
  );
}
