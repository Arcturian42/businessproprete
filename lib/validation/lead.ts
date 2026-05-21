import { z } from 'zod';

export const LEAD_TYPES = [
  'tool_use',
  'pdf_download',
  'quote_request',
  'newsletter',
  'profile_claim',
  'demo_request',
  'contact',
] as const;

export type LeadType = (typeof LEAD_TYPES)[number];

export const leadCaptureSchema = z
  .object({
    leadType: z.enum(LEAD_TYPES),
    email: z.string().email('Email invalide').max(254),
    companyName: z.string().max(120).optional(),
    phone: z.string().max(40).optional(),
    companySize: z.enum(['1-9', '10-49', '50-249', '250+']).optional(),
    region: z.string().max(60).optional(),
    serviceTypes: z.array(z.string().max(40)).max(10).optional(),
    message: z.string().max(1_500).optional(),
    sourcePage: z.string().max(400).optional(),
    utmSource: z.string().max(100).optional(),
    utmMedium: z.string().max(100).optional(),
    utmCampaign: z.string().max(100).optional(),
    /** Honeypot — must remain empty (zero-length string). */
    website: z.string().max(0).optional(),
  })
  .passthrough();

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;
