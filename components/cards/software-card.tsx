import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { ScoreBadge } from '@/components/comparison/score-badge';
import { cn } from '@/lib/utils';

export type SoftwareCardProps = {
  href: string;
  name: string;
  shortDescription: string;
  pricingFrom?: string;
  hasFreeTrial?: boolean;
  hasFreePlan?: boolean;
  score?: number;
  vendorUrl?: string;
  className?: string;
};

/**
 * SoftwareCard — used in /logiciels hub and on /comparatifs/* listings.
 * Score is on the 0-100 scale; visual aligns with design.md §6.
 */
export function SoftwareCard({
  href,
  name,
  shortDescription,
  pricingFrom,
  hasFreeTrial = false,
  hasFreePlan = false,
  score,
  vendorUrl,
  className,
}: SoftwareCardProps) {
  return (
    <Card
      className={cn(
        'group flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-DEFAULT hover:shadow-card-hover',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <Link
          href={href}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:rounded-button"
        >
          <h3 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-brand">
            {name}
          </h3>
        </Link>
        {typeof score === 'number' && <ScoreBadge score={score} showLabel={false} />}
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
        {shortDescription}
      </p>

      <div className="mt-4 space-y-1.5 text-xs text-text-muted">
        {pricingFrom && (
          <p>
            <span className="font-semibold text-text-secondary">
              À partir de :
            </span>{' '}
            <span className="font-mono text-text-primary">{pricingFrom}</span>
          </p>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {hasFreePlan && <span>Plan gratuit</span>}
          {hasFreeTrial && <span>Essai gratuit</span>}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border-light pt-4">
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
        >
          Voir notre avis
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        {vendorUrl && (
          <a
            href={vendorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-text-primary"
          >
            Site officiel
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </Card>
  );
}
