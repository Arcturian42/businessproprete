import { createBrowserClient } from '@supabase/ssr';

import type { Database } from '@/types/database';

/**
 * Supabase client for the browser (Client Components, "use client" only).
 * Uses the anon key, respects RLS.
 */
export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY',
    );
  }

  return createBrowserClient<Database>(url, anonKey);
}
