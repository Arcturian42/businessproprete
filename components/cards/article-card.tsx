import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type ArticleCardProps = {
  href: string;
  title: string;
  excerpt: string;
  category?: string;
  author?: string;
  date?: string;
  readingTime?: number;
  className?: string;
};

/**
 * ArticleCard — used in /guides hub, homepage "Derniers Guides" grid.
 * Per design.md §6.ArticleCard.
 */
export function ArticleCard({
  href,
  title,
  excerpt,
  category,
  author,
  date,
  readingTime,
  className,
}: ArticleCardProps) {
  return (
    <Card
      className={cn(
        'group flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-DEFAULT hover:shadow-card-hover',
        className,
      )}
    >
      {category && (
        <Badge variant="category" className="self-start uppercase">
          {category}
        </Badge>
      )}
      <Link
        href={href}
        className="mt-3 flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:rounded-card"
      >
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-text-primary transition-colors group-hover:text-brand">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">
          {excerpt}
        </p>
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-text-muted">
        {author && <span>{author}</span>}
        {author && date && <span aria-hidden="true">·</span>}
        {date && <time>{date}</time>}
        {readingTime && (
          <>
            <span aria-hidden="true">·</span>
            <span>{readingTime} min de lecture</span>
          </>
        )}
      </div>
    </Card>
  );
}
