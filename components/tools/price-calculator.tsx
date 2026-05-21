'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FREQUENCY_LABELS,
  LOCALE_LABELS,
  calculatePrice,
  type Frequency,
  type LocaleType,
} from '@/lib/calculators/price';
import { PILOT_CITIES } from '@/lib/data/cities';
import { cn } from '@/lib/utils';

const EUR = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const BAND_LABEL: Record<
  ReturnType<typeof calculatePrice>['comparisonBand'],
  string
> = {
  cheaper: 'En dessous des prix observés sur le marché',
  in_range: 'Dans la fourchette moyenne du marché',
  expensive: 'Au-dessus de la médiane française',
};

const BAND_TONE: Record<
  ReturnType<typeof calculatePrice>['comparisonBand'],
  string
> = {
  cheaper: 'text-accent-amber',
  in_range: 'text-accent-green',
  expensive: 'text-destructive',
};

export function PriceCalculator() {
  const [localeType, setLocaleType] = useState<LocaleType>('bureaux');
  const [surfaceSqm, setSurfaceSqm] = useState<number>(200);
  const [frequency, setFrequency] = useState<Frequency>('quotidien');
  const [citySlug, setCitySlug] = useState<string>('paris');

  const result = useMemo(
    () =>
      calculatePrice({
        localeType,
        surfaceSqm: clampNumber(surfaceSqm, 50, 10_000),
        frequency,
        citySlug,
      }),
    [localeType, surfaceSqm, frequency, citySlug],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <form
        className="space-y-6 rounded-card border border-border-light bg-white p-6 shadow-card"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Estimer le prix d'un nettoyage"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="localeType">Type de locaux</Label>
            <Select
              value={localeType}
              onValueChange={(value) => setLocaleType(value as LocaleType)}
            >
              <SelectTrigger id="localeType" aria-label="Type de locaux">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(LOCALE_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="frequency">Fréquence</Label>
            <Select
              value={frequency}
              onValueChange={(value) => setFrequency(value as Frequency)}
            >
              <SelectTrigger id="frequency" aria-label="Fréquence">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(FREQUENCY_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="surface">Surface (m²)</Label>
            <Input
              id="surface"
              type="number"
              min={50}
              max={10_000}
              inputMode="numeric"
              className="font-mono"
              value={surfaceSqm}
              onChange={(event) => setSurfaceSqm(Number(event.target.value))}
            />
            <p className="text-xs text-text-muted">Entre 50 et 10 000 m².</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="city">Ville</Label>
            <Select value={citySlug} onValueChange={setCitySlug}>
              <SelectTrigger id="city" aria-label="Ville">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PILOT_CITIES.map((city) => (
                  <SelectItem key={city.slug} value={city.slug}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-xs text-text-muted">
          Les estimations sont indicatives et reposent sur des productivités
          moyennes (m²/h) et des taux horaires de marché. Le prix réel dépend
          de votre cahier des charges précis.
        </p>
      </form>

      <aside
        aria-live="polite"
        className="rounded-card bg-navy-deep p-8 text-text-ondark shadow-elevated"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-light">
          Coût mensuel estimé
        </p>
        <p className="mt-2 font-mono text-data-lg">{EUR.format(result.monthlyCost)}</p>
        <p className={cn('mt-3 text-sm font-medium', BAND_TONE[result.comparisonBand])}>
          {BAND_LABEL[result.comparisonBand]}
        </p>

        <dl className="mt-6 space-y-3 text-sm">
          <ResultRow label="Coût par passage" value={EUR.format(result.costPerVisit)} />
          <ResultRow
            label="Heures totales / mois"
            value={`${result.monthlyHours.toLocaleString('fr-FR')} h`}
          />
          <ResultRow
            label="Passages / mois"
            value={`${result.visitsPerMonth.toLocaleString('fr-FR')}`}
          />
          <ResultRow
            label="Taux horaire appliqué"
            value={`${result.effectiveHourlyRate.toLocaleString('fr-FR')} €/h`}
          />
          <ResultRow
            label="Productivité retenue"
            value={`${result.productivity} m²/h`}
          />
        </dl>
      </aside>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2">
      <dt className="text-border-dark">{label}</dt>
      <dd className="font-mono text-text-ondark">{value}</dd>
    </div>
  );
}

function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}
