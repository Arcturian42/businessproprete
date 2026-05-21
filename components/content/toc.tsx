import Link from 'next/link';

import type { TocEntry } from '@/lib/content/toc';
import { cn } from '@/lib/utils';

/**
 * Sticky table of contents — desktop sidebar only.
 * Mobile users get the headings inlined naturally in the article.
 */
export function Toc({ entries, className }: { entries: TocEntry[]; className?: string }) {
  if (entries.length === 0) return null;
  return (
    <nav
      aria-label="Table des matières"
      className={cn(
        'sticky top-24 hidden self-start text-sm lg:block',
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        Sommaire
      </p>
      <ol className="mt-3 space-y-2 border-l border-border-light pl-3">
        {entries.map((entry) => (
          <li
            key={`${entry.level}-${entry.slug}`}
            className={cn(entry.level === 3 && 'ml-3 text-xs')}
          >
            <Link
              href={`#${entry.slug}`}
              className="block text-text-muted transition-colors hover:text-brand"
            >
              {entry.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
