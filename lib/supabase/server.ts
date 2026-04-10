/**
 * Server-side Supabase client.
 *
 * This client is used in Server Components and Route Handlers.
 * It reads/writes cookies so that the user's auth session persists
 * across requests (Supabase stores the JWT in a cookie).
 *
 * Why a function instead of a singleton?
 * Each request needs its own client because cookies are per-request.
 * A singleton would share cookie state between different users.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  // Next.js 15+ requires awaiting cookies()
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // getAll reads all cookies from the incoming request.
        // Supabase uses these to reconstruct the user session.
        getAll() {
          return cookieStore.getAll();
        },

        // setAll writes cookies back to the response.
        // This is called when Supabase refreshes an expired JWT token.
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll can fail in Server Components (they're read-only).
            // That's okay — the middleware will handle the token refresh.
          }
        },
      },
    }
  );
}
