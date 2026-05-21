import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type GuideCardProps = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
};

/**
 * GuideCard — icon-driven card variant for hub teasers.
 * Per design.md §6.GuideCard.
 */
export function GuideCard({
  href,
  title,
  description,
  icon: Icon,
  className,
}: GuideCardProps) {
  return (
    <Card
      className={cn(
        'group flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-DEFAULT hover:shadow-card-hover',
        className,
      )}
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-card bg-surface-alt text-brand"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6" />
      </span>
      <Link
        href={href}
        className="mt-4 flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:rounded-card"
      >
        <h3 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-brand">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">
          {description}
        </p>
      </Link>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
        Lire le guide
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Card>
  );
}
