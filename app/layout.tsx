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
    <html lang="en" suppressHydrationWarning>
      {/* Inline script to apply saved theme before first paint (prevents flash) */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")||"system";var d=t==="system"?window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light":t;document.documentElement.setAttribute("data-theme",d)}catch(e){}})()`,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
