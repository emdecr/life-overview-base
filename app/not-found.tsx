/**
 * 404 Not Found page.
 *
 * Shown when a user navigates to a route that doesn't exist.
 * Required explicitly in Next.js 16+ for prerendering.
 */

export default function NotFound() {
  return (
    <main className="container">
      <h1>404 — Not Found</h1>
      <p style={{ color: "#666" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <a href="/" style={{ color: "#505050", textDecoration: "underline" }}>
        Go back home
      </a>
    </main>
  );
}
