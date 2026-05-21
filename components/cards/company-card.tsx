import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScoreBadge } from '@/components/comparison/score-badge';
import { cn } from '@/lib/utils';

export type CompanyCardProps = {
  href: string;
  name: string;
  siret?: string;
  city?: string;
  postalCode?: string;
  specialties?: string[];
  score?: number;
  isVerified?: boolean;
  className?: string;
};

/**
 * CompanyCard — directory listing card.
 * Per design.md §6.CompanyCard.
 */
export function CompanyCard({
  href,
  name,
  siret,
  city,
  postalCode,
  specialties = [],
  score,
  isVerified = false,
  className,
}: CompanyCardProps) {
  return (
    <Card
      className={cn(
        'group flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-DEFAULT hover:shadow-card-hover',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link
            href={href}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:rounded-button"
          >
            <h3 className="line-clamp-2 text-base font-semibold text-text-primary transition-colors group-hover:text-brand">
              {name}
            </h3>
          </Link>
          {siret && (
            <p className="mt-1 font-mono text-xs text-text-muted">
              SIRET {siret}
            </p>
          )}
        </div>
        {typeof score === 'number' && <ScoreBadge score={score} showLabel={false} />}
      </div>

      {(city || postalCode) && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-text-muted">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          <span>
            {postalCode && `${postalCode} `}
            {city}
          </span>
        </p>
      )}

      {specialties.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {specialties.slice(0, 4).map((specialty) => (
            <li key={specialty}>
              <Badge variant="muted">{specialty}</Badge>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-border-light pt-4">
        {isVerified ? (
          <Badge variant="verified">Vérifié</Badge>
        ) : (
          <span />
        )}
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline-none focus-visible:underline"
        >
          Voir la fiche
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </Card>
  );
}
