import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type HeroAction = {
  label: string;
  href: string;
};

/**
 * Hero section — Deep Navy background with H1 + subtitle + CTAs.
 * Per design.md §7 (Homepage Hero).
 */
export function HeroSection({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primary?: HeroAction;
  secondary?: HeroAction;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'bg-navy py-20 md:py-24',
        className,
      )}
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-wide text-brand-light md:text-sm">
            {eyebrow}
          </p>
        )}
        <h1
          id="hero-heading"
          className="mt-4 max-w-3xl text-hero-mobile text-text-ondark md:text-hero"
        >
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-border-dark">
            {description}
          </p>
        )}
        {(primary || secondary) && (
          <div className="mt-10 flex flex-wrap gap-3">
            {primary && (
              <Button asChild size="lg">
                <Link href={primary.href}>{primary.label}</Link>
              </Button>
            )}
            {secondary && (
              <Button asChild variant="outlineDark" size="lg">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
