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
 * This is a placeholder — components will be added in Phase 3.
 */

export default async function Page() {
  return (
    <main className="container">
      <h1>Life Overview</h1>
      <p>Phase 1 complete — components coming in Phase 3.</p>
    </main>
  );
}
