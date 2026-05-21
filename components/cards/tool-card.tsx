import Link from 'next/link';
import { type LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ToolCardProps = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  cta?: string;
  className?: string;
};

/**
 * ToolCard — surfaced on /outils hub and homepage tools row.
 * Per design.md §6.ToolCard: subtle surface bg + brand-light icon container.
 */
export function ToolCard({
  href,
  title,
  description,
  icon: Icon,
  cta = "Utiliser l'outil",
  className,
}: ToolCardProps) {
  return (
    <article
      className={cn(
        'group flex h-full flex-col rounded-card border border-border-light bg-surface p-8 transition-all duration-200 hover:-translate-y-1 hover:border-border-DEFAULT hover:bg-white hover:shadow-elevated',
        className,
      )}
    >
      <span
        className="flex h-16 w-16 items-center justify-center rounded-card bg-brand-light text-brand"
        aria-hidden="true"
      >
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
      <Button asChild variant="outline" size="md" className="mt-6 self-start">
        <Link href={href}>{cta}</Link>
      </Button>
    </article>
  );
}
