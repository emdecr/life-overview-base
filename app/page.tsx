/**
 * Home Page — Server Component
 *
 * This replaces the old App.js class component. Instead of:
 *   - componentDidMount → useEffect → axios.get → setState
 *
 * We simply `await` the Supabase query directly in the component body.
 * This is possible because Server Components can be async functions.
 * The data is fetched on the server at request time and sent to the
 * client as pre-rendered HTML — no loading spinners needed.
 *
 * HOW AUTH + RLS WORKS HERE:
 *   The Supabase server client reads the user's JWT from cookies.
 *   - If no JWT (anonymous visitor) → RLS returns only `public = true` records
 *   - If valid JWT (logged-in user) → RLS returns ALL records
 *   We don't need any if/else logic — the database handles it automatically.
 *
 * `dynamic = "force-dynamic"` ensures this page is rendered fresh on every
 * request (not cached), so auth state is always current.
 */

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { resolveRecordWeeks } from "@/lib/helpers";
import Overview from "@/components/Overview";
import AuthButton from "@/components/AuthButton";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "@/components/styles/Auth.module.css";
import type { LifeRecord } from "@/lib/types";

// Render on every request — don't cache, because auth state varies per user
export const dynamic = "force-dynamic";

export default async function Page() {
  // Create a server-side Supabase client (reads JWT from cookies)
  const supabase = await createSupabaseServerClient();

  // Fetch records from the `life_overview_records` table, ordered by week number.
  // RLS policies automatically filter based on the user's auth state:
  //   - Anonymous → only public records
  //   - Authenticated → all records
  const { data: records, error } = await supabase
    .from("life_overview_records")
    .select("*")
    .order("week", { ascending: true });

  // If Supabase returns an error, show it (helpful during development)
  if (error) {
    return (
      <main className="container">
        <h1>Life Overview</h1>
        <p style={{ color: "red" }}>
          Error loading records: {error.message}
        </p>
        <p style={{ color: "#666", fontSize: "0.9rem" }}>
          Make sure your Supabase URL and anon key are set in .env.local,
          and the life_overview_records table exists (run seed/records.sql).
        </p>
      </main>
    );
  }

  return (
    <main className="container">
      {/* Header row: title + auth button */}
      <div className={styles.headerRow}>
        <h1>Life Overview</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>

      <p style={{ marginBottom: "2rem" }} >I was directly inspired by <a href="https://busterbenson.com/the-life-of/buster/" target="_blank">Buster Benson&apos;s project</a> and decided to create my own version. Each square in the grid represents one week of your life, organized into decades. A healthy exercise in momento mori.</p>

      {/* The main week grid — 11 decades of 520 weeks each */}
      <Overview records={resolveRecordWeeks((records as LifeRecord[]) ?? [])} />
    </main>
  );
}
