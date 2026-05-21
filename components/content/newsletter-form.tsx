'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  newsletterSubscribeSchema,
  type NewsletterSubscribeInput,
} from '@/lib/validation/newsletter';
import { cn } from '@/lib/utils';

/**
 * Inline newsletter signup. POSTs to /api/newsletter (implemented in Sprint 7).
 * Gracefully handles the absence of the API route in dev by surfacing
 * the response text in a toast.
 */
export function NewsletterForm({
  source = 'inline',
  variant = 'inline',
  className,
}: {
  source?: string;
  variant?: 'inline' | 'card';
  className?: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterSubscribeInput>({
    resolver: zodResolver(newsletterSubscribeSchema),
    defaultValues: { source },
  });

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Une erreur est survenue');
      }
      toast.success('Inscription enregistrée. Vérifiez votre e-mail.');
      reset({ email: '', source });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Impossible de finaliser l'inscription pour le moment.",
      );
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        variant === 'inline'
          ? 'flex flex-col gap-3 sm:flex-row sm:items-start'
          : 'flex flex-col gap-3',
        className,
      )}
      noValidate
    >
      <input type="hidden" {...register('source')} />
      <div className="flex-1">
        <Label htmlFor={`newsletter-email-${variant}`} className="sr-only">
          Adresse e-mail
        </Label>
        <Input
          id={`newsletter-email-${variant}`}
          type="email"
          autoComplete="email"
          placeholder="votre@email-pro.fr"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>
      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? 'Envoi en cours…' : "S'inscrire"}
      </Button>
    </form>
  );
}
