import { CheckCircle2 } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * « À retenir » — green callout for actionable takeaways.
 * Per design.md §7 (Guides — Encadrés "À retenir").
 */
export function ATenirBox({
  title = 'À retenir',
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      role="note"
      aria-label={title}
      className={cn(
        'my-6 rounded-card border border-accent-green/20 bg-accent-green-light/60 p-5',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <CheckCircle2
          className="mt-0.5 h-5 w-5 shrink-0 text-accent-green"
          aria-hidden="true"
        />
        <div>
          <p className="mb-2 text-sm font-semibold text-accent-green">{title}</p>
          <div className="text-sm leading-relaxed text-text-secondary">{children}</div>
        </div>
      </div>
    </aside>
  );
}
