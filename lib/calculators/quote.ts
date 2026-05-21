/**
 * T3: Quote generator — pure helpers.
 * Build a quote object from line items; render to HTML elsewhere.
 */

export type QuoteLineItem = {
  description: string;
  quantity: number;
  unitPriceHt: number;
};

export type QuoteInputs = {
  companyName: string;
  companyAddress?: string;
  companyEmail?: string;
  companyPhone?: string;
  clientName: string;
  clientAddress?: string;
  quoteNumber: string;
  /** ISO date — issue date. */
  date: string;
  /** ISO date — validity end. */
  validUntil?: string;
  vatRate: number;
  lineItems: QuoteLineItem[];
  notes?: string;
};

export type QuoteTotals = {
  totalHt: number;
  totalVat: number;
  totalTtc: number;
};

export function computeQuoteTotals(
  lineItems: QuoteLineItem[],
  vatRate: number,
): QuoteTotals {
  const totalHt = lineItems.reduce(
    (sum, item) => sum + Math.max(item.quantity, 0) * Math.max(item.unitPriceHt, 0),
    0,
  );
  const totalVat = totalHt * Math.max(vatRate, 0);
  const totalTtc = totalHt + totalVat;
  return {
    totalHt: round(totalHt, 2),
    totalVat: round(totalVat, 2),
    totalTtc: round(totalTtc, 2),
  };
}

export function formatEuros(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount);
}

function round(value: number, decimals: number): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}
