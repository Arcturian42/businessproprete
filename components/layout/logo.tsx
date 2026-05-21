import { cn } from '@/lib/utils';

/**
 * Propreté Business — SVG logo, recréé fidèlement à partir du logo fourni.
 * Marque combinant un "P" navy stylisé avec un accent vert (carré +
 * trait diagonal) et un wordmark deux lignes "PROPRETÉ" (navy) /
 * "BUSINESS" (bleu brand).
 *
 * Variantes : `light` (sur fond clair) et `dark` (sur fond navy).
 */
export function Logo({
  variant = 'light',
  className,
  showTagline = false,
}: {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}) {
  const navy = variant === 'dark' ? '#F8FAFC' : '#0B1628';
  const blue = '#1A56DB';
  const green = '#059669';
  const taglineColor = variant === 'dark' ? '#94A3B8' : '#64748B';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 font-sans leading-none',
        className,
      )}
      aria-label="Propreté Business"
    >
      <svg
        viewBox="0 0 64 64"
        width="40"
        height="40"
        role="img"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* P shape */}
        <path
          d="M14 10 H38 a14 14 0 0 1 0 28 H22 V54 H14 Z M22 18 V30 H38 a6 6 0 0 0 0-12 Z"
          fill={navy}
        />
        {/* Green diagonal accent (top right) */}
        <path
          d="M48 12 L56 4 L56 14 Z"
          fill={green}
        />
        {/* Green square accent (bottom right) */}
        <rect x="42" y="44" width="10" height="10" fill={green} />
      </svg>

      <span className="flex flex-col gap-0.5">
        <span className="flex items-baseline gap-1.5 leading-none">
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: navy }}
          >
            PROPRETÉ
          </span>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: blue }}
          >
            BUSINESS
          </span>
        </span>
        {showTagline && (
          <span
            className="font-sans text-[10px] font-medium uppercase tracking-wide"
            style={{ color: taglineColor }}
          >
            Le média des professionnels de la propreté
          </span>
        )}
      </span>
    </span>
  );
}
