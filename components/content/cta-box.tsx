import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Contextual inline CTA box for articles & guides.
 * Per design.md §6.CTABox: amber-50 background, amber border, single CTA.
 */
export function CtaBox({
  title,
  description,
  cta,
  variant = 'lead',
  className,
}: {
  title: string;
  description?: string;
  cta: { label: string; href: string };
  variant?: 'lead' | 'tool';
  className?: string;
}) {
  const Icon = variant === 'lead' ? Download : ArrowRight;

  return (
    <aside
      role="complementary"
      className={cn(
        'my-8 rounded-card border border-accent-amber/30 bg-accent-amber-light/50 p-6',
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-accent-amber/15 text-accent-amber"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="text-base font-semibold text-text-primary">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-text-secondary">{description}</p>
          )}
          <Button asChild size="md" className="mt-4">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
