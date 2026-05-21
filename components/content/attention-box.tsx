import { AlertTriangle } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * « Attention » — amber callout for warnings.
 * Per design.md §7 (Guides — Encadrés "Attention").
 */
export function AttentionBox({
  title = 'Attention',
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
        'my-6 rounded-card border border-accent-amber/20 bg-accent-amber-light p-5',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-accent-amber"
          aria-hidden="true"
        />
        <div>
          <p className="mb-2 text-sm font-semibold text-accent-amber">{title}</p>
          <div className="text-sm leading-relaxed text-text-secondary">{children}</div>
        </div>
      </div>
    </aside>
  );
}
