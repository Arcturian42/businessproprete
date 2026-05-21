'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ShieldCheck, Clock, Building2 } from 'lucide-react';

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
  prospectsLeadSchema,
  type ProspectsLeadInput,
} from '@/lib/validation/tool-inputs';

const VALUE_PROPS = [
  {
    icon: Building2,
    title: '10 prospects qualifiés',
    description: 'Sélectionnés selon votre zone, votre taille et votre type de prestation.',
  },
  {
    icon: Clock,
    title: 'Livraison sous 7 jours',
    description: 'Une équipe locale vous transmet la liste par email avec coordonnées vérifiées.',
  },
  {
    icon: ShieldCheck,
    title: 'Sans engagement',
    description: 'Service gratuit lancé avec Réseau Propreté. Pas de carte, pas d’abonnement.',
  },
];

export function ProspectsForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProspectsLeadInput>({
    resolver: zodResolver(prospectsLeadSchema),
    defaultValues: {
      companySize: '10-49',
      website: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          leadType: 'quote_request',
          sourcePage: '/outils/recevoir-10-prospects-b2b',
        }),
      });
      if (!response.ok && response.status !== 404) {
        const text = await response.text();
        throw new Error(text || 'Erreur côté serveur');
      }
      setDone(true);
      toast.success('Demande enregistrée. Vous serez recontacté·e sous 48h.');
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Impossible d’enregistrer votre demande pour le moment.',
      );
    } finally {
      setSubmitting(false);
    }
  });

  if (done) {
    return (
      <div className="rounded-card border border-accent-green/20 bg-accent-green-light p-8 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-accent-green" />
        <h2 className="mt-4 text-xl font-bold text-text-primary">
          Demande enregistrée
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Notre équipe vous recontacte sous 48h ouvrées pour préciser vos
          critères avant transmission par Réseau Propreté.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <ul className="space-y-4">
        {VALUE_PROPS.map(({ icon: Icon, title, description }) => (
          <li
            key={title}
            className="flex gap-3 rounded-card border border-border-light bg-surface p-4"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-brand-light text-brand"
              aria-hidden="true"
            >
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-text-primary">{title}</p>
              <p className="mt-1 text-sm text-text-secondary">{description}</p>
            </div>
          </li>
        ))}
      </ul>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-card border border-border-light bg-white p-6 shadow-card"
        noValidate
        aria-label="Recevoir 10 prospects B2B"
      >
        {/* Honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden="true"
          {...register('website')}
        />

        <div className="space-y-1.5">
          <Label htmlFor="company-name">Nom de l&apos;entreprise *</Label>
          <Input
            id="company-name"
            autoComplete="organization"
            aria-invalid={!!errors.companyName}
            {...register('companyName')}
          />
          {errors.companyName && (
            <p className="text-xs text-destructive">{errors.companyName.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email professionnel *</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              {...register('phone')}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="company-size">Taille d&apos;entreprise *</Label>
            <Select
              defaultValue="10-49"
              onValueChange={(value) =>
                setValue('companySize', value as ProspectsLeadInput['companySize'])
              }
            >
              <SelectTrigger id="company-size" aria-label="Taille d'entreprise">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-9">1 à 9 salariés</SelectItem>
                <SelectItem value="10-49">10 à 49 salariés</SelectItem>
                <SelectItem value="50-249">50 à 249 salariés</SelectItem>
                <SelectItem value="250+">250 salariés et plus</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="region">Région ciblée</Label>
            <Input
              id="region"
              placeholder="Île-de-France, Auvergne-Rhône-Alpes…"
              {...register('region')}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message">
            Précisions (type de prestation, secteurs visés, etc.)
          </Label>
          <textarea
            id="message"
            rows={4}
            className="w-full rounded-button border border-border-light bg-white px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:border-brand"
            {...register('message')}
          />
        </div>

        <Button type="submit" size="lg" disabled={submitting} className="w-full">
          {submitting ? 'Envoi en cours…' : 'Recevoir mes 10 prospects'}
        </Button>

        <p className="text-xs text-text-muted">
          En envoyant ce formulaire, vous acceptez que vos données soient
          transmises à Réseau Propreté pour traitement. Voir notre{' '}
          <a href="/politique-confidentialite" className="text-brand hover:underline">
            politique de confidentialité
          </a>
          .
        </p>
      </form>
    </div>
  );
}
