import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * POST /api/revalidate
 *
 * Token-gated cache invalidation hook. Used by the editorial
 * pipeline (manual content publish) to refresh ISR-cached pages
 * without waiting for the periodic revalidate window.
 *
 *   curl -X POST https://propretebusiness.fr/api/revalidate \
 *     -H "x-revalidate-secret: $REVALIDATE_TOKEN" \
 *     -H "Content-Type: application/json" \
 *     -d '{"path": "/guides/grille-salaire-proprete-2025"}'
 */
export async function POST(request: Request) {
  const secret = request.headers.get('x-revalidate-secret');
  if (!process.env.REVALIDATE_TOKEN || secret !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
  }

  let body: { path?: string; tag?: string };
  try {
    body = (await request.json()) as { path?: string; tag?: string };
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  if (!body.path && !body.tag) {
    return NextResponse.json(
      { error: 'missing_path_or_tag' },
      { status: 400 },
    );
  }

  try {
    if (body.tag) revalidateTag(body.tag);
    if (body.path) revalidatePath(body.path);
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      ...body,
    });
  } catch (error) {
    console.error('[api/revalidate] failed', error);
    return NextResponse.json({ error: 'revalidation_failed' }, { status: 500 });
  }
}
