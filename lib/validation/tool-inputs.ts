import { z } from 'zod';

export const priceCalculatorSchema = z.object({
  localeType: z.enum(['bureaux', 'industriel', 'commerce', 'copropriete', 'medical']),
  surfaceSqm: z
    .number({ invalid_type_error: 'La surface doit être un nombre.' })
    .min(50, 'Surface minimale : 50 m².')
    .max(10_000, 'Surface maximale : 10 000 m².'),
  frequency: z.enum(['quotidien', 'hebdomadaire', 'mensuel', 'ponctuel']),
  citySlug: z.string().optional(),
});

export const profitabilityCalculatorSchema = z.object({
  monthlyRevenue: z.number().min(0).max(1_000_000),
  monthlyHours: z.number().min(0).max(2_000),
  agentHourlyCost: z.number().min(0).max(200),
  socialChargesRate: z.number().min(0).max(1),
  travelHours: z.number().min(0).max(500),
  materialCost: z.number().min(0).max(50_000),
  miscCost: z.number().min(0).max(50_000),
});

export const quoteGeneratorSchema = z.object({
  companyName: z.string().min(1, 'Nom de l’entreprise requis').max(120),
  companyAddress: z.string().max(240).optional(),
  companyEmail: z.string().email('Email invalide').max(120).optional().or(z.literal('')),
  companyPhone: z.string().max(40).optional(),
  clientName: z.string().min(1, 'Nom du client requis').max(120),
  clientAddress: z.string().max(240).optional(),
  quoteNumber: z.string().min(1, 'Numéro de devis requis').max(40),
  date: z.string().min(1),
  validUntil: z.string().optional(),
  vatRate: z.number().min(0).max(0.3),
  lineItems: z
    .array(
      z.object({
        description: z.string().min(1, 'Description requise').max(160),
        quantity: z.number().min(0.01),
        unitPriceHt: z.number().min(0),
      }),
    )
    .min(1, 'Ajoutez au moins une ligne'),
  notes: z.string().max(800).optional(),
});

export const prospectsLeadSchema = z.object({
  companyName: z.string().min(1, 'Nom de l’entreprise requis').max(120),
  email: z.string().email('Email invalide').max(120),
  phone: z.string().min(6, 'Téléphone trop court').max(40).optional(),
  companySize: z.enum(['1-9', '10-49', '50-249', '250+']),
  region: z.string().max(60).optional(),
  serviceTypes: z.array(z.string()).max(10).optional(),
  message: z.string().max(800).optional(),
  /** Honeypot. */
  website: z.string().max(0).optional(),
});

export type PriceCalculatorInput = z.infer<typeof priceCalculatorSchema>;
export type ProfitabilityCalculatorInput = z.infer<typeof profitabilityCalculatorSchema>;
export type QuoteGeneratorInput = z.infer<typeof quoteGeneratorSchema>;
export type ProspectsLeadInput = z.infer<typeof prospectsLeadSchema>;
