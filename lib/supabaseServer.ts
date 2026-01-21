import { createClient } from '@supabase/supabase-js';

export function createSupabaseServerClient(accessToken?: string) {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          ...(accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {}),
          apikey: process.env.SUPABASE_ANON_KEY!,
        },
      },
    }
  );
}
