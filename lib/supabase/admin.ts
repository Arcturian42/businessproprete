import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/types/database';

/**
 * Supabase admin client — uses the service-role key and BYPASSES RLS.
 * SERVER-ONLY. Never import this from a Client Component.
 *
 * Use for: trusted server actions (admin webhooks, internal scripts),
 * never for code paths exposed to the browser.
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY',
    );
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
