'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateProfitability } from '@/lib/calculators/profitability';
import { cn } from '@/lib/utils';

const EUR = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const VERDICT_TONE = {
  profitable: 'text-accent-green',
  watch: 'text-accent-amber',
  unprofitable: 'text-destructive',
} as const;

export function ProfitabilityCalculator() {
  const [revenue, setRevenue] = useState(5_000);
  const [hours, setHours] = useState(180);
  const [agentCost, setAgentCost] = useState(13.5);
  const [chargesPct, setChargesPct] = useState(42);
  const [travel, setTravel] = useState(10);
  const [material, setMaterial] = useState(120);
  const [misc, setMisc] = useState(80);

  const result = useMemo(
    () =>
      calculateProfitability({
        monthlyRevenue: revenue,
        monthlyHours: hours,
        agentHourlyCost: agentCost,
        socialChargesRate: chargesPct / 100,
        travelHours: travel,
        materialCost: material,
        miscCost: misc,
      }),
    [revenue, hours, agentCost, chargesPct, travel, material, misc],
  );

  const reset = () => {
    setRevenue(5_000);
    setHours(180);
    setAgentCost(13.5);
    setChargesPct(42);
    setTravel(10);
    setMaterial(120);
    setMisc(80);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <form
        className="space-y-6 rounded-card border border-border-light bg-white p-6 shadow-card"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Calculer la rentabilité d'un contrat"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            id="revenue"
            label="Revenu mensuel du contrat"
            value={revenue}
            onChange={setRevenue}
            suffix="€"
            step={50}
            min={0}
          />
          <NumberField
            id="hours"
            label="Heures mensuelles facturées"
            value={hours}
            onChange={setHours}
            suffix="h"
            step={1}
            min={0}
          />
          <NumberField
            id="agent-cost"
            label="Coût horaire agent (brut)"
            value={agentCost}
            onChange={setAgentCost}
            suffix="€/h"
            step={0.1}
            min={0}
          />
          <NumberField
            id="charges"
            label="Charges sociales"
            value={chargesPct}
            onChange={setChargesPct}
            suffix="%"
            step={1}
            min={0}
            max={100}
          />
          <NumberField
            id="travel"
            label="Temps de déplacement"
            value={travel}
            onChange={setTravel}
            suffix="h/mois"
            step={1}
            min={0}
          />
          <NumberField
            id="material"
            label="Frais matériel mensuels"
            value={material}
            onChange={setMaterial}
            suffix="€"
            step={10}
            min={0}
          />
          <NumberField
            id="misc"
            label="Frais divers mensuels"
            value={misc}
            onChange={setMisc}
            suffix="€"
            step={10}
            min={0}
          />
        </div>
        <div>
          <Button type="button" variant="ghost" size="sm" onClick={reset}>
            Réinitialiser les valeurs
          </Button>
        </div>
        <p className="text-xs text-text-muted">
          Le coût horaire agent doit être brut. Les charges sociales par défaut
          (42 %) sont une moyenne du secteur — ajustez selon votre situation.
        </p>
      </form>

      <aside
        aria-live="polite"
        className="rounded-card bg-navy-deep p-8 text-text-ondark shadow-elevated"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-light">
          Marge brute mensuelle
        </p>
        <p
          className={cn(
            'mt-2 font-mono text-data-lg',
            result.marginEuros < 0 ? 'text-destructive' : 'text-text-ondark',
          )}
        >
          {EUR.format(result.marginEuros)}
        </p>
        <p
          className={cn(
            'mt-2 text-sm font-semibold',
            VERDICT_TONE[result.verdict],
          )}
        >
          {result.marginPercent.toLocaleString('fr-FR')} % — {result.verdictLabel}
        </p>

        <dl className="mt-6 space-y-3 text-sm">
          <ResultRow label="Coût total" value={EUR.format(result.totalCost)} />
          <ResultRow
            label="Coût / heure facturée"
            value={`${result.costPerBilledHour.toLocaleString('fr-FR')} €/h`}
          />
          <ResultRow
            label="Revenu / heure"
            value={`${result.revenuePerHour.toLocaleString('fr-FR')} €/h`}
          />
          <ResultRow
            label="Seuil de rentabilité"
            value={EUR.format(result.breakEvenRevenue)}
          />
        </dl>
      </aside>
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  suffix,
  step,
  min,
  max,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {suffix && (
          <span className="ml-1 font-normal text-text-muted">({suffix})</span>
        )}
      </Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        step={step}
        min={min}
        max={max}
        className="font-mono"
        value={value}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
      />
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
