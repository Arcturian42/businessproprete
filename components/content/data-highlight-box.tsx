import { cn } from '@/lib/utils';

export type DataHighlightItem = {
  value: string;
  label: string;
};

/**
 * "En chiffres" highlight block.
 * Numbers in JetBrains Mono, source caption. Per design.md §7 + docs/12.
 */
export function DataHighlightBox({
  title = 'En chiffres',
  items,
  source,
  className,
}: {
  title?: string;
  items: DataHighlightItem[];
  source?: string;
  className?: string;
}) {
  return (
    <aside
      role="figure"
      aria-label={title}
      className={cn(
        'my-8 rounded-card border-l-4 border-brand bg-surface p-6',
        className,
      )}
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-text-muted">
        {title}
      </p>
      <dl
        className={cn(
          'grid gap-6',
          items.length === 2 && 'grid-cols-2',
          items.length === 3 && 'grid-cols-1 sm:grid-cols-3',
          items.length >= 4 && 'grid-cols-2 sm:grid-cols-4',
        )}
      >
        {items.map((item) => (
          <div key={item.label}>
            <dt className="font-mono text-data-md text-text-primary">
              {item.value}
            </dt>
            <dd className="mt-1 text-sm text-text-muted">{item.label}</dd>
          </div>
        ))}
      </dl>
      {source && (
        <p className="mt-4 text-xs text-text-muted">Source : {source}</p>
      )}
    </aside>
  );
}
