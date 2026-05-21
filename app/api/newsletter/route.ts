import { NextResponse } from 'next/server';

import { newsletterSubscribeSchema } from '@/lib/validation/newsletter';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { getClientIp, rateLimit } from '@/lib/utils/rate-limit';

export const runtime = 'nodejs';

const RATE_LIMIT_PER_HOUR = 5;
const WINDOW_MS = 60 * 60 * 1_000;
const BREVO_LIST_ID = process.env.BREVO_NEWSLETTER_LIST_ID;

/**
 * POST /api/newsletter
 *
 * 1) Validates email via Zod, drops honeypot bots.
 * 2) Inserts into `subscribers` (Supabase) if env present.
 * 3) Upserts into Brevo with double opt-in if BREVO_API_KEY set.
 * Returns 202 if accepted (regardless of Brevo result).
 */
export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = rateLimit({
    key: `newsletter:${ip}`,
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

  const parsed = newsletterSubscribeSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation_failed', issues: parsed.error.issues },
      { status: 422 },
    );
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ stored: false, reason: 'spam_filtered' });
  }

  const { email, source } = parsed.data;
  let supabaseStored = false;

  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const supabase = createSupabaseAdminClient();
      const { error } = await supabase
        .from('subscribers')
        .upsert(
          {
            email,
            source: source ?? 'newsletter-page',
            is_active: true,
          },
          { onConflict: 'email' },
        );
      if (error) {
        console.error('[api/newsletter] supabase upsert failed', error);
      } else {
        supabaseStored = true;
      }
    } else {
      console.info('[api/newsletter] supabase env missing — subscriber not persisted', {
        email,
        source,
      });
    }
  } catch (error) {
    console.error('[api/newsletter] supabase unavailable', error);
  }

  if (process.env.BREVO_API_KEY) {
    try {
      const body: Record<string, unknown> = {
        email,
        attributes: { SOURCE: source ?? 'newsletter-page' },
        includeListIds: BREVO_LIST_ID ? [Number(BREVO_LIST_ID)] : undefined,
        templateId: undefined,
        redirectionUrl: undefined,
        updateEnabled: true,
      };
      const response = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok && response.status !== 204) {
        const text = await response.text();
        console.error('[api/newsletter] Brevo double opt-in failed', response.status, text);
      }
    } catch (error) {
      console.error('[api/newsletter] Brevo unavailable', error);
    }
  } else {
    console.info('[api/newsletter] BREVO_API_KEY missing — double opt-in skipped');
  }

  return NextResponse.json(
    { stored: supabaseStored, doubleOptInSent: Boolean(process.env.BREVO_API_KEY) },
    { status: 202 },
  );
}
