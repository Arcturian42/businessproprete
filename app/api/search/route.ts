import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

/**
 * GET /api/search?q=&city=&limit=
 *
 * Full-text search over the `companies` table. Returns up to 20
 * active companies matching the query. Empty / missing env →
 * returns an empty result set with a flag so the UI can show
 * the right empty state.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') ?? '').trim();
  const city = (searchParams.get('city') ?? '').trim();
  const limit = Math.min(Math.max(Number(searchParams.get('limit') ?? '20'), 1), 50);

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return NextResponse.json({
      results: [],
      count: 0,
      stub: true,
      reason: 'supabase_env_missing',
    });
  }

  try {
    const supabase = createSupabaseServerClient();
    let query = supabase
      .from('companies')
      .select(
        'id, name, slug, siret, postal_code, specialties, score_visibility, is_verified, city_id',
        { count: 'exact' },
      )
      .eq('status', 'active')
      .is('deleted_at', null)
      .order('score_visibility', { ascending: false })
      .limit(limit);

    if (q) {
      query = query.textSearch(
        'name',
        q.split(/\s+/).join(' & '),
        { type: 'websearch', config: 'french' },
      );
    }
    if (city) {
      query = query.eq('city_id', city);
    }

    const { data, count, error } = await query;
    if (error) {
      console.error('[api/search] supabase query failed', error);
      return NextResponse.json({ error: 'query_failed' }, { status: 500 });
    }

    return NextResponse.json({
      results: data ?? [],
      count: count ?? 0,
    });
  } catch (error) {
    console.error('[api/search] supabase unavailable', error);
    return NextResponse.json({ results: [], count: 0, stub: true }, { status: 200 });
  }
}
