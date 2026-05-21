import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Full-width dark CTA section.
 * Per design.md §6.CTASection: navy background, centered title + button.
 */
export function CtaSection({
  title,
  description,
  primary,
  secondary,
  trustNote,
  children,
  className,
}: {
  title: string;
  description?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  trustNote?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn('bg-navy-deep py-16 md:py-20', className)}
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="cta-heading"
          className="text-2xl font-bold text-text-ondark md:text-3xl"
        >
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-border-dark">
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          {secondary && (
            <Button asChild variant="outlineDark" size="lg">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          )}
        </div>
        {children}
        {trustNote && (
          <p className="mt-6 text-sm text-text-muted">{trustNote}</p>
        )}
      </div>
    </section>
  );
}
