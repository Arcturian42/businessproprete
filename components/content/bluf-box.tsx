import { cn } from '@/lib/utils';

/**
 * BLUF Box — Bottom Line Up Front.
 * The direct answer in the first 50 words, designed to be cited by AI engines.
 * Per docs/07-geo-content-strategy.md and design.md §7 (Guides).
 */
export function BlufBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      role="note"
      aria-label="Réponse rapide"
      className={cn(
        'my-6 rounded-card border-l-4 border-brand bg-brand-light p-5 text-base leading-relaxed text-text-primary',
        className,
      )}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-dark">
        Réponse rapide
      </p>
      <div className="prose-tight">{children}</div>
    </aside>
  );
}
