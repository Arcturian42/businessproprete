import { cn } from '@/lib/utils';

export type Stat = {
  value: string;
  label: string;
};

/**
 * Horizontal stats strip — used under the Hero or on local pages.
 * Numbers in JetBrains Mono per design.md §7.
 */
export function StatsBar({
  stats,
  source,
  title,
  className,
}: {
  stats: Stat[];
  source?: string;
  title?: string;
  className?: string;
}) {
  return (
    <section
      className={cn('border-b border-border-light bg-white py-12', className)}
      aria-label={title ?? 'Chiffres clés'}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            {title}
          </p>
        )}
        <dl
          className={cn(
            'mt-6 grid gap-8',
            stats.length === 3 && 'grid-cols-1 sm:grid-cols-3',
            stats.length === 4 && 'grid-cols-2 md:grid-cols-4',
            stats.length >= 5 && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
          )}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-data-md text-text-primary">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-text-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
        {source && (
          <p className="mt-4 text-xs text-text-muted">Source : {source}</p>
        )}
      </div>
    </section>
  );
}
