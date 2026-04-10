/**
 * Browser-side Supabase client.
 *
 * This client is used in Client Components (marked with "use client").
 * It handles auth operations like login/logout from the browser.
 *
 * Unlike the server client, this is a singleton — there's only one
 * browser per user, so we can reuse the same client instance.
 */

import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
