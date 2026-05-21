/**
 * T2: Calculateur de rentabilité d'un contrat de nettoyage.
 * Pure function. Per docs/11-lead-magnets-conversion.md §T2.
 */

export type ProfitabilityInputs = {
  /** Monthly contract revenue (€). */
  monthlyRevenue: number;
  /** Operational hours per month committed under contract. */
  monthlyHours: number;
  /** Loaded agent cost per hour (€/h) — exclude charges. */
  agentHourlyCost: number;
  /** Employer social charges as decimal (0.42 = 42%). */
  socialChargesRate: number;
  /** Travel + setup time (h/month). */
  travelHours: number;
  /** Monthly material / consumables cost (€). */
  materialCost: number;
  /** Other monthly costs (€). */
  miscCost: number;
};

export type ProfitabilityOutputs = {
  /** Total cost (€). */
  totalCost: number;
  /** Gross margin in € (revenue - totalCost). */
  marginEuros: number;
  /** Gross margin % (signed). */
  marginPercent: number;
  /** Total cost per billed hour (€/h). */
  costPerBilledHour: number;
  /** Billable revenue per hour (€/h). */
  revenuePerHour: number;
  /** Break-even revenue (€) at the same cost base. */
  breakEvenRevenue: number;
  /** Verdict band. */
  verdict: 'profitable' | 'watch' | 'unprofitable';
  /** Short human-readable verdict line. */
  verdictLabel: string;
};

export function calculateProfitability(
  inputs: ProfitabilityInputs,
): ProfitabilityOutputs {
  const billedHours = Math.max(inputs.monthlyHours, 0);
  const travelHours = Math.max(inputs.travelHours, 0);
  const agentCost = Math.max(inputs.agentHourlyCost, 0);
  const charges = Math.max(inputs.socialChargesRate, 0);

  const labourCost =
    (billedHours + travelHours) * agentCost * (1 + charges);
  const totalCost =
    labourCost + Math.max(inputs.materialCost, 0) + Math.max(inputs.miscCost, 0);

  const marginEuros = inputs.monthlyRevenue - totalCost;
  const marginPercent =
    inputs.monthlyRevenue > 0 ? (marginEuros / inputs.monthlyRevenue) * 100 : 0;

  const costPerBilledHour = billedHours > 0 ? totalCost / billedHours : 0;
  const revenuePerHour =
    billedHours > 0 ? inputs.monthlyRevenue / billedHours : 0;
  const breakEvenRevenue = totalCost;

  let verdict: ProfitabilityOutputs['verdict'];
  let verdictLabel: string;
  if (marginPercent < 5) {
    verdict = 'unprofitable';
    verdictLabel = 'Non rentable — revoir le pricing ou les coûts';
  } else if (marginPercent < 15) {
    verdict = 'watch';
    verdictLabel = 'À surveiller — marge faible';
  } else {
    verdict = 'profitable';
    verdictLabel = 'Rentable';
  }

  return {
    totalCost: round(totalCost),
    marginEuros: round(marginEuros),
    marginPercent: round(marginPercent, 1),
    costPerBilledHour: round(costPerBilledHour, 2),
    revenuePerHour: round(revenuePerHour, 2),
    breakEvenRevenue: round(breakEvenRevenue),
    verdict,
    verdictLabel,
  };
}

function round(value: number, decimals = 0): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}
