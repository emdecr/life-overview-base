/**
 * Root Layout
 *
 * This is the top-level layout that wraps every page in the app.
 * In Next.js App Router, layout.tsx replaces the old public/index.html.
 * It defines the <html> and <body> tags, metadata, and global styles.
 */

import type { Metadata } from "next";
import "./globals.css";

// Metadata replaces the <title> and <meta> tags from the old index.html
export const metadata: Metadata = {
  title: "Life Overview",
  description: "A life-in-weeks visualization — every week of your life as a grid",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
