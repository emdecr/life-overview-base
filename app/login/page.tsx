/**
 * Login Page (Server wrapper)
 *
 * This thin server component forces dynamic rendering so the login form
 * (a Client Component) doesn't get statically pre-rendered at build time.
 * Static pre-rendering would fail because the Supabase client needs
 * runtime environment variables that aren't available during `next build`.
 */

import LoginForm from "@/components/LoginForm";

// Tell Next.js to never statically pre-render this page
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="container" style={{ maxWidth: "400px" }}>
      <h1>Login</h1>
      <p style={{ marginBottom: "1.5rem", color: "#666" }}>
        Sign in to view private life records.
      </p>
      <LoginForm />
    </main>
  );
}
