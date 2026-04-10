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
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: "0.25rem", fontWeight: 500 }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "1rem",
          }}
        />
      </div>

      {/* Password field */}
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: "0.25rem", fontWeight: 500 }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Your password"
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "1rem",
          }}
        />
      </div>

      {/* Error message — only shown when login fails */}
      {error && (
        <p style={{ color: "red", marginBottom: "1rem", fontSize: "0.9rem" }}>
          {error}
        </p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "0.6rem",
          backgroundColor: "#505050",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
