import { NextResponse } from 'next/server';
import { z } from 'zod';

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { getClientIp, rateLimit } from '@/lib/utils/rate-limit';

export const runtime = 'nodejs';

const TOOL_SLUGS = [
  'calculateur-prix-nettoyage',
  'calculateur-rentabilite-contrat',
  'generateur-devis-nettoyage',
  'recevoir-10-prospects-b2b',
] as const;

const toolResultSchema = z.object({
  inputs: z.record(z.unknown()),
  outputs: z.record(z.unknown()),
  sessionId: z.string().max(80).optional(),
  leadId: z.string().uuid().optional(),
  sourcePage: z.string().max(400).optional(),
});

/**
 * POST /api/tools/[slug]
 *
 * Persists an anonymous calculator result to `tool_results`.
 * Used for funnel analytics (started → completed → email_captured).
 * Falls back to console logging if Supabase env is missing.
 */
export async function POST(
  request: Request,
  { params }: { params: { slug: string } },
) {
  if (!TOOL_SLUGS.includes(params.slug as (typeof TOOL_SLUGS)[number])) {
    return NextResponse.json({ error: 'unknown_tool' }, { status: 404 });
  }

  const ip = getClientIp(request.headers);
  const limit = rateLimit({
    key: `tool:${ip}`,
    limit: 60,
    windowMs: 60 * 60 * 1_000,
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
  const parsed = toolResultSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation_failed', issues: parsed.error.issues },
      { status: 422 },
    );
  }

  let stored = false;
  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const supabase = createSupabaseAdminClient();
      const { error } = await supabase.from('tool_results').insert({
        tool_slug: params.slug,
        // Zod-validated objects; Supabase Json column accepts arbitrary JSONB.
        inputs: parsed.data.inputs as never,
        outputs: parsed.data.outputs as never,
        session_id: parsed.data.sessionId ?? null,
        lead_id: parsed.data.leadId ?? null,
        source_page: parsed.data.sourcePage ?? `/outils/${params.slug}`,
        user_agent: request.headers.get('user-agent') ?? null,
        ip_hash: hashIp(ip),
      });
      if (error) {
        console.error('[api/tools] supabase insert failed', error);
      } else {
        stored = true;
      }
    }
  } catch (error) {
    console.error('[api/tools] supabase unavailable', error);
  }

  return NextResponse.json({ stored, toolSlug: params.slug }, { status: 202 });
}

/** Lightweight non-cryptographic hash — for analytic grouping, not security. */
function hashIp(ip: string): string {
  let hash = 5381;
  for (let i = 0; i < ip.length; i += 1) {
    hash = (hash * 33) ^ ip.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}
