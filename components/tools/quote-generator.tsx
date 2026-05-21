'use client';

import { useMemo, useState } from 'react';
import { Plus, Trash2, Printer } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  type QuoteLineItem,
  computeQuoteTotals,
  formatEuros,
} from '@/lib/calculators/quote';

const DEFAULT_LINE_ITEMS: QuoteLineItem[] = [
  { description: 'Nettoyage de bureaux — passage quotidien', quantity: 1, unitPriceHt: 1_200 },
  { description: 'Vitrerie — passage mensuel', quantity: 1, unitPriceHt: 180 },
];

export function QuoteGenerator() {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [quoteNumber, setQuoteNumber] = useState(
    `DEV-${new Date().getFullYear()}-001`,
  );
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [validUntil, setValidUntil] = useState(() =>
    new Date(Date.now() + 30 * 86_400_000).toISOString().slice(0, 10),
  );
  const [vatRatePct, setVatRatePct] = useState(20);
  const [items, setItems] = useState<QuoteLineItem[]>(DEFAULT_LINE_ITEMS);
  const [notes, setNotes] = useState(
    'Conditions de paiement : 30 jours date de facture. Devis valable 30 jours.',
  );

  const totals = useMemo(
    () => computeQuoteTotals(items, vatRatePct / 100),
    [items, vatRatePct],
  );

  const updateItem = (index: number, patch: Partial<QuoteLineItem>) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  };
  const addItem = () =>
    setItems((prev) => [...prev, { description: '', quantity: 1, unitPriceHt: 0 }]);
  const removeItem = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        className="space-y-6 rounded-card border border-border-light bg-white p-6 shadow-card print:hidden"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Générer un devis"
      >
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold uppercase tracking-wide text-text-muted">
            Votre entreprise
          </legend>
          <TextField id="company-name" label="Nom de l'entreprise" value={companyName} onChange={setCompanyName} required />
          <TextField id="company-address" label="Adresse" value={companyAddress} onChange={setCompanyAddress} />
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField id="company-email" label="Email" type="email" value={companyEmail} onChange={setCompanyEmail} />
            <TextField id="company-phone" label="Téléphone" value={companyPhone} onChange={setCompanyPhone} />
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold uppercase tracking-wide text-text-muted">
            Client
          </legend>
          <TextField id="client-name" label="Nom du client" value={clientName} onChange={setClientName} required />
          <TextField id="client-address" label="Adresse" value={clientAddress} onChange={setClientAddress} />
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold uppercase tracking-wide text-text-muted">
            Devis
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            <TextField id="quote-number" label="N° de devis" value={quoteNumber} onChange={setQuoteNumber} />
            <DateField id="date" label="Date" value={date} onChange={setDate} />
            <DateField id="valid-until" label="Valable jusqu'au" value={validUntil} onChange={setValidUntil} />
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold uppercase tracking-wide text-text-muted">
            Prestations
          </legend>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-2 rounded-button border border-border-light bg-surface p-3"
              >
                <div className="col-span-12 sm:col-span-6">
                  <Label htmlFor={`item-${index}-desc`} className="text-xs">
                    Description
                  </Label>
                  <Input
                    id={`item-${index}-desc`}
                    value={item.description}
                    onChange={(event) =>
                      updateItem(index, { description: event.target.value })
                    }
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <Label htmlFor={`item-${index}-qty`} className="text-xs">
                    Qté
                  </Label>
                  <Input
                    id={`item-${index}-qty`}
                    type="number"
                    min={0}
                    step={0.01}
                    className="font-mono"
                    value={item.quantity}
                    onChange={(event) =>
                      updateItem(index, { quantity: Number(event.target.value) || 0 })
                    }
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Label htmlFor={`item-${index}-unit`} className="text-xs">
                    PU HT (€)
                  </Label>
                  <Input
                    id={`item-${index}-unit`}
                    type="number"
                    min={0}
                    step={0.01}
                    className="font-mono"
                    value={item.unitPriceHt}
                    onChange={(event) =>
                      updateItem(index, { unitPriceHt: Number(event.target.value) || 0 })
                    }
                  />
                </div>
                <div className="col-span-12 sm:col-span-1 flex items-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                    aria-label="Supprimer cette ligne"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="mr-1 h-4 w-4" />
            Ajouter une ligne
          </Button>
        </fieldset>

        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            id="vat"
            label="Taux de TVA"
            suffix="%"
            value={vatRatePct}
            onChange={setVatRatePct}
            step={0.5}
            min={0}
            max={30}
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes / conditions</Label>
          <textarea
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            className="mt-1.5 w-full rounded-button border border-border-light bg-white px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:border-brand"
          />
        </div>

        <Button
          type="button"
          onClick={() => window.print()}
          className="w-full"
        >
          <Printer className="mr-2 h-4 w-4" />
          Imprimer / enregistrer en PDF
        </Button>
        <p className="text-xs text-text-muted">
          Astuce : dans la fenêtre d&apos;impression, choisissez
          « Enregistrer au format PDF » comme destination.
        </p>
      </form>

      <article
        className="rounded-card border border-border-light bg-white p-8 text-text-primary shadow-card print:border-0 print:p-0 print:shadow-none"
        aria-label="Aperçu du devis"
      >
        <header className="flex items-start justify-between gap-4 border-b border-border-light pb-4">
          <div>
            <h2 className="text-xl font-bold">{companyName || 'Votre entreprise'}</h2>
            {companyAddress && (
              <p className="mt-1 whitespace-pre-line text-sm text-text-muted">
                {companyAddress}
              </p>
            )}
            <div className="mt-1 text-xs text-text-muted">
              {companyEmail && <span>{companyEmail}</span>}
              {companyEmail && companyPhone && <span> · </span>}
              {companyPhone && <span>{companyPhone}</span>}
            </div>
          </div>
          <div className="text-right text-sm">
            <p className="font-mono font-semibold">DEVIS</p>
            <p className="mt-1 font-mono text-xs text-text-muted">N° {quoteNumber}</p>
            <p className="font-mono text-xs text-text-muted">
              Émis le {formatFrDate(date)}
            </p>
            {validUntil && (
              <p className="font-mono text-xs text-text-muted">
                Valable jusqu&apos;au {formatFrDate(validUntil)}
              </p>
            )}
          </div>
        </header>

        <section className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Adressé à
          </p>
          <p className="mt-1 text-base font-semibold">{clientName || 'Nom du client'}</p>
          {clientAddress && (
            <p className="mt-1 whitespace-pre-line text-sm text-text-muted">
              {clientAddress}
            </p>
          )}
        </section>

        <section className="mt-6">
          <table className="w-full text-sm">
            <thead className="border-b border-border-light text-left text-xs uppercase tracking-wide text-text-muted">
              <tr>
                <th className="py-2">Description</th>
                <th className="py-2 text-right">Qté</th>
                <th className="py-2 text-right">PU HT</th>
                <th className="py-2 text-right">Total HT</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-border-light/60">
                  <td className="py-2 align-top">{item.description || '—'}</td>
                  <td className="py-2 text-right align-top font-mono">
                    {item.quantity}
                  </td>
                  <td className="py-2 text-right align-top font-mono">
                    {formatEuros(item.unitPriceHt)}
                  </td>
                  <td className="py-2 text-right align-top font-mono">
                    {formatEuros(item.quantity * item.unitPriceHt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-6 ml-auto max-w-xs space-y-1 text-sm">
          <div className="flex justify-between font-mono">
            <span>Total HT</span>
            <span>{formatEuros(totals.totalHt)}</span>
          </div>
          <div className="flex justify-between font-mono text-text-muted">
            <span>TVA ({vatRatePct} %)</span>
            <span>{formatEuros(totals.totalVat)}</span>
          </div>
          <div className="mt-1 flex justify-between border-t border-border-light pt-1 font-mono text-base font-bold">
            <span>Total TTC</span>
            <span>{formatEuros(totals.totalTtc)}</span>
          </div>
        </section>

        {notes && (
          <footer className="mt-6 whitespace-pre-line border-t border-border-light pt-4 text-xs text-text-muted">
            {notes}
          </footer>
        )}
      </article>
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function DateField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function NumberField({
  id,
  label,
  suffix,
  value,
  onChange,
  step,
  min,
  max,
}: {
  id: string;
  label: string;
  suffix?: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {suffix && <span className="ml-1 font-normal text-text-muted">({suffix})</span>}
      </Label>
      <Input
        id={id}
        type="number"
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

function formatFrDate(iso: string): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('fr-FR');
  } catch {
    return iso;
  }
}
