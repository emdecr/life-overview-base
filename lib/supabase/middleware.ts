/**
 * Supabase middleware helper.
 *
 * This runs on EVERY request (via Next.js middleware) to keep the
 * user's auth session alive. Supabase JWTs expire after ~1 hour,
 * so the middleware refreshes the token before it expires.
 *
 * Without this, users would get randomly logged out mid-session.
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Start with a plain "pass-through" response
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Create a Supabase client that can read/write cookies on the request/response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          // Write cookies to both the request (for downstream server code)
          // and the response (so the browser gets the updated cookies)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Call getUser() to trigger the token refresh.
  // Don't remove this — without it, the session won't be refreshed.
  await supabase.auth.getUser();

  return supabaseResponse;
}
