import { NextResponse } from 'next/server';

import { leadCaptureSchema, type LeadType } from '@/lib/validation/lead';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { getClientIp, rateLimit } from '@/lib/utils/rate-limit';

export const runtime = 'nodejs';

const RATE_LIMIT_PER_HOUR = 10;
const WINDOW_MS = 60 * 60 * 1_000;

/**
 * POST /api/leads
 *
 * Validates the payload with Zod, drops honeypot bots, applies a
 * per-IP rate-limit, then attempts to persist the lead to Supabase.
 * If Supabase env vars are missing the API logs and returns 202
 * (Accepted) so the form stays usable in dev/staging without
 * real infrastructure.
 *
 * Optional outbound webhooks (Proprely / Réseau Propreté) are
 * fired in fire-and-forget mode and only when their URL env vars
 * are configured.
 */
export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = rateLimit({
    key: `leads:${ip}`,
    limit: RATE_LIMIT_PER_HOUR,
    windowMs: WINDOW_MS,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'rate_limited', resetAt: limit.resetAt },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = leadCaptureSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation_failed', issues: parsed.error.issues },
      { status: 422 },
    );
  }

  // Honeypot — silently accept (200) but do not persist.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ stored: false, reason: 'spam_filtered' });
  }

  const payload = parsed.data;
  const score = computeLeadScore(payload.leadType, payload);

  let supabaseStored = false;
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const supabase = createSupabaseAdminClient();
      const { error } = await supabase.from('leads').insert({
        lead_type: payload.leadType,
        email: payload.email,
        company_name: payload.companyName ?? null,
        phone: payload.phone ?? null,
        company_size: payload.companySize ?? null,
        message: payload.message ?? null,
        source_page: payload.sourcePage ?? null,
        score,
        utm_source: payload.utmSource ?? null,
        utm_medium: payload.utmMedium ?? null,
        utm_campaign: payload.utmCampaign ?? null,
        user_agent: request.headers.get('user-agent') ?? null,
      });
      if (error) {
        console.error('[api/leads] supabase insert failed', error);
      } else {
        supabaseStored = true;
      }
    } else {
      console.info('[api/leads] supabase env not set — lead not persisted', {
        leadType: payload.leadType,
        email: payload.email,
      });
    }
  } catch (error) {
    console.error('[api/leads] supabase unavailable', error);
  }

  await forwardToPartners(payload, score);

  return NextResponse.json(
    { stored: supabaseStored, score, leadType: payload.leadType },
    { status: 202 },
  );
}

/** Rule-based scoring per docs/03-business-ecosystem.md §Lead Scoring Model. */
function computeLeadScore(
  type: LeadType,
  data: { companySize?: string; sourcePage?: string },
): number {
  let score = 0;
  if (type === 'tool_use') score += 25;
  if (type === 'pdf_download') score += 15;
  if (type === 'demo_request') score += 35;
  if (type === 'quote_request') score += 30;
  if (type === 'profile_claim') score += 20;
  if (type === 'contact') score += 10;
  if (type === 'newsletter') score += 2;
  if (data.companySize === '50-249') score += 15;
  if (data.companySize === '250+') score += 20;
  if (data.companySize === '10-49') score += 10;
  if (data.sourcePage?.includes('logiciels') || data.sourcePage?.includes('comparatifs')) {
    score += 15;
  }
  return Math.min(score, 100);
}

async function forwardToPartners(
  payload: { leadType: LeadType; email: string; companyName?: string },
  score: number,
): Promise<void> {
  const tasks: Promise<unknown>[] = [];
  if (
    process.env.RP_WEBHOOK_URL &&
    (payload.leadType === 'quote_request' || payload.leadType === 'profile_claim')
  ) {
    tasks.push(
      safeWebhook(process.env.RP_WEBHOOK_URL, {
        source: 'proprete-business',
        score,
        ...payload,
      }),
    );
  }
  if (
    process.env.PROPRELY_WEBHOOK_URL &&
    (payload.leadType === 'demo_request' || score >= 70)
  ) {
    tasks.push(
      safeWebhook(process.env.PROPRELY_WEBHOOK_URL, {
        source: 'proprete-business',
        score,
        ...payload,
      }),
    );
  }
  if (tasks.length === 0) return;
  await Promise.allSettled(tasks);
}

async function safeWebhook(url: string, body: unknown): Promise<void> {
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('[api/leads] partner webhook failed', url, error);
  }
}
