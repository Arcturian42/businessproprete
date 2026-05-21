/**
 * T1: Calculateur de prix nettoyage.
 *
 * Pure function — input → output. No DOM, no DB, no async.
 * Formula per docs/11-lead-magnets-conversion.md §T1, plus
 * regional adjustments for the 10 pilot cities.
 *
 * Rates and productivities are conservative French market
 * benchmarks (à raffiner par l'équipe éditoriale avant publication).
 */

export type LocaleType =
  | 'bureaux'
  | 'industriel'
  | 'commerce'
  | 'copropriete'
  | 'medical';

export type Frequency = 'quotidien' | 'hebdomadaire' | 'mensuel' | 'ponctuel';

export type PriceInputs = {
  /** Type of premises. */
  localeType: LocaleType;
  /** Surface in m² (50 – 10 000). */
  surfaceSqm: number;
  /** Cleaning frequency. */
  frequency: Frequency;
  /** Optional city slug for regional adjustment. */
  citySlug?: string;
};

export type PriceOutputs = {
  /** Estimated monthly cost (€). */
  monthlyCost: number;
  /** Estimated cost per cleaning visit (€). */
  costPerVisit: number;
  /** Cleaning hours per month. */
  monthlyHours: number;
  /** Cost per hour (€/h). */
  costPerHour: number;
  /** Number of visits per month (rounded to 0.1). */
  visitsPerMonth: number;
  /** Comparison band with national average. */
  comparisonBand: 'cheaper' | 'in_range' | 'expensive';
  /** Hourly rate applied (after city adjustment). */
  effectiveHourlyRate: number;
  /** Productivity used (m²/h). */
  productivity: number;
};

/** Hourly rate (€/h) by premises type — base French market. */
const HOURLY_RATE: Record<LocaleType, number> = {
  bureaux: 25,
  industriel: 30,
  commerce: 24,
  copropriete: 22,
  medical: 32,
};

/** Productivity (m² cleaned per agent-hour) by type. */
const PRODUCTIVITY_SQM_PER_HOUR: Record<LocaleType, number> = {
  bureaux: 300,
  industriel: 250,
  commerce: 320,
  copropriete: 350,
  medical: 200,
};

/** Visits per month by frequency. */
const VISITS_PER_MONTH: Record<Frequency, number> = {
  quotidien: 22,
  hebdomadaire: 4.33,
  mensuel: 1,
  ponctuel: 1,
};

/** City-level cost-of-labour multiplier (relative to national average). */
const CITY_ADJUSTMENT: Record<string, number> = {
  paris: 1.18,
  lyon: 1.05,
  marseille: 0.97,
  bordeaux: 1.0,
  nantes: 0.98,
  lille: 0.98,
  toulouse: 1.0,
  strasbourg: 1.02,
  nice: 1.05,
  rennes: 0.96,
};

export const LOCALE_LABELS: Record<LocaleType, string> = {
  bureaux: 'Bureaux',
  industriel: 'Industriel',
  commerce: 'Commerce',
  copropriete: 'Copropriété',
  medical: 'Médical',
};

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  quotidien: 'Quotidien (5 j/sem)',
  hebdomadaire: 'Hebdomadaire',
  mensuel: 'Mensuel',
  ponctuel: 'Ponctuel',
};

export function calculatePrice(inputs: PriceInputs): PriceOutputs {
  const surface = clamp(inputs.surfaceSqm, 50, 10_000);
  const baseRate = HOURLY_RATE[inputs.localeType];
  const productivity = PRODUCTIVITY_SQM_PER_HOUR[inputs.localeType];
  const visits = VISITS_PER_MONTH[inputs.frequency];
  const cityMultiplier =
    (inputs.citySlug ? CITY_ADJUSTMENT[inputs.citySlug] : undefined) ?? 1;

  const effectiveHourlyRate = round(baseRate * cityMultiplier, 2);
  const hoursPerVisit = surface / productivity;
  const monthlyHours = round(hoursPerVisit * visits, 1);
  const monthlyCost = round(monthlyHours * effectiveHourlyRate, 0);
  const costPerVisit = round(hoursPerVisit * effectiveHourlyRate, 0);
  const costPerHour = effectiveHourlyRate;

  // National average sqm rate to bucket the result.
  const sqmRateMonthly = monthlyCost / surface;
  let comparisonBand: PriceOutputs['comparisonBand'];
  if (inputs.frequency === 'quotidien') {
    if (sqmRateMonthly < 2.2) comparisonBand = 'cheaper';
    else if (sqmRateMonthly > 3.8) comparisonBand = 'expensive';
    else comparisonBand = 'in_range';
  } else {
    if (sqmRateMonthly < 0.3) comparisonBand = 'cheaper';
    else if (sqmRateMonthly > 1.2) comparisonBand = 'expensive';
    else comparisonBand = 'in_range';
  }

  return {
    monthlyCost,
    costPerVisit,
    monthlyHours,
    costPerHour,
    visitsPerMonth: round(visits, 2),
    comparisonBand,
    effectiveHourlyRate,
    productivity,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function round(value: number, decimals: number): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}
