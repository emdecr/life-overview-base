/**
 * Next.js Middleware
 *
 * This runs on every request before it reaches your pages/components.
 * Its only job here is to keep the Supabase auth session alive
 * by refreshing expired JWT tokens.
 *
 * The `matcher` config below excludes static files and images
 * so the middleware only runs on actual page navigations and API calls.
 */

import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// Only run middleware on page routes, not on static files or images
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
