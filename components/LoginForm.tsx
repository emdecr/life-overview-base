/**
 * LoginForm — Client Component for email/password authentication.
 *
 * Extracted from the login page into its own Client Component so the
 * parent page.tsx can remain a Server Component (needed for `export const dynamic`).
 *
 * How it works:
 *   1. User types email + password
 *   2. On submit, calls Supabase signInWithPassword
 *   3. On success, redirects to "/" and refreshes server components
 *   4. On failure, shows the error message from Supabase
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import styles from "./styles/Auth.module.css";

export default function LoginForm() {
  // Form state — tracks what the user types
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state — tracks loading spinner and error messages
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  /**
   * Handle form submission.
   * Creates the Supabase client here (not at module level) so it's only
   * instantiated when the user actually interacts with the form.
   */
  async function handleLogin(e: React.FormEvent) {
    // Prevent the browser's default form submit (which would reload the page)
    e.preventDefault();

    setError(null);
    setLoading(true);

    // Create the browser Supabase client for this auth call
    const supabase = createSupabaseBrowserClient();

    // Attempt to sign in with email + password.
    // Supabase handles password hashing, JWT creation, etc.
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      // Show the error message from Supabase (e.g., "Invalid login credentials")
      setError(authError.message);
      return;
    }

    // Success! Redirect to the home page.
    // router.refresh() tells Next.js to re-fetch server components,
    // which will now see the authenticated session and return ALL records.
    router.refresh();
    router.push("/");
  }

  return (
    <form onSubmit={handleLogin}>
      {/* Email field */}
      <div className={styles.formField}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className={styles.input}
        />
      </div>

      {/* Password field */}
      <div className={styles.formField}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Your password"
          className={styles.input}
        />
      </div>

      {/* Error message — only shown when login fails */}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {/* Submit button — cursor and opacity are dynamic based on loading state */}
      <button
        type="submit"
        disabled={loading}
        className={styles.submitButton}
        style={{
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
