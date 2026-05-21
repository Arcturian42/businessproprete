import { z } from 'zod';

export const newsletterSubscribeSchema = z.object({
  email: z
    .string()
    .min(1, 'L’adresse e-mail est requise.')
    .email('Adresse e-mail invalide.')
    .max(254, 'Adresse e-mail trop longue.'),
  source: z.string().max(100).optional(),
  /** Honeypot — must remain empty. */
  website: z.string().max(0).optional(),
});

export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>;
