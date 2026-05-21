import { cn } from '@/lib/utils';

/**
 * Score badge — colour-coded pill based on numeric score (0-100).
 * Per docs/10-directory-data-strategy.md (score_visibility) and design.md §6.
 *
 * Thresholds:
 *  - 0-20  → "À compléter" (red)
 *  - 21-40 → "Faible"      (red)
 *  - 41-60 → "Moyen"       (amber)
 *  - 61-80 → "Bon"         (green)
 *  - 81-100 → "Excellent"  (green)
 */
export function ScoreBadge({
  score,
  className,
  showLabel = true,
}: {
  score: number;
  className?: string;
  showLabel?: boolean;
}) {
  const clamped = Math.max(0, Math.min(100, score));
  const { label, tone } = interpret(clamped);

  const toneClasses: Record<typeof tone, string> = {
    green: 'bg-accent-green-light text-accent-green',
    amber: 'bg-accent-amber-light text-accent-amber',
    red: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5 text-xs font-semibold',
        toneClasses[tone],
        className,
      )}
      aria-label={`Score : ${clamped} sur 100${showLabel ? ` (${label})` : ''}`}
    >
      <span className="font-mono">{clamped}</span>
      {showLabel && <span>{label}</span>}
    </span>
  );
}

function interpret(score: number): {
  label: string;
  tone: 'green' | 'amber' | 'red';
} {
  if (score >= 81) return { label: 'Excellent', tone: 'green' };
  if (score >= 61) return { label: 'Bon', tone: 'green' };
  if (score >= 41) return { label: 'Moyen', tone: 'amber' };
  if (score >= 21) return { label: 'Faible', tone: 'red' };
  return { label: 'À compléter', tone: 'red' };
}
