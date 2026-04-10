/**
 * Home Page (Server Component)
 *
 * This is the main entry point — it replaces the old App.js class component.
 * As a Server Component, it can fetch data directly from Supabase at render time
 * without needing useEffect, loading states, or client-side fetching.
 *
 * The Supabase RLS (Row Level Security) policies automatically filter records:
 * - Unauthenticated visitors only see records where `public = true`
 * - Authenticated users see all records
 *
 * `dynamic = "force-dynamic"` prevents static pre-rendering, which would fail
 * because the Supabase client needs runtime environment variables.
 *
 * This is a placeholder — components will be added in Phase 3.
 */

// Tell Next.js to always render this page at request time (not at build time)
export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main className="container">
      <h1>Life Overview</h1>
      <p>Phase 1 & 2 complete — components coming in Phase 3.</p>
    </main>
  );
}
