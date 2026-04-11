/**
 * AuthButton — Login/Logout toggle.
 *
 * This is a Client Component that checks the user's auth state
 * and shows either a "Login" link or a "Logout" button.
 *
 * It sits in the top-right corner of the main page (positioned by the parent).
 *
 * How it works:
 *   1. On mount, it asks Supabase "is there a logged-in user?"
 *   2. If yes → show "Logout" button + user's email
 *   3. If no  → show "Login" link pointing to /login
 *
 * Why Client Component?
 *   - Needs `useEffect` to check auth state after hydration
 *   - Needs `useState` for the user object
 *   - Calls `supabase.auth.signOut()` which is a browser operation
 */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import styles from "./styles/Auth.module.css";
import type { User } from "@supabase/supabase-js";

export default function AuthButton() {
  // null = still checking, undefined would mean "we know there's no user"
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  // Check auth state when the component first mounts
  useEffect(() => {
    async function getUser() {
      // getUser() reads the JWT from cookies and validates it.
      // If the token is expired, the middleware will have already refreshed it.
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, [supabase.auth]);

  /**
   * Sign the user out.
   * This clears the JWT cookie, then refreshes the page so server components
   * re-render with the anonymous (public-only) data.
   */
  async function handleLogout() {
    await supabase.auth.signOut();
    router.refresh();
  }

  // Don't render anything while we're still checking auth state
  // (avoids a flash of "Login" → "Logout" on page load)
  if (loading) return null;

  // Not logged in — hide the button (user knows the /login route)
  if (!user) {
    return null;
  }

  // Logged in — show email + logout button
  return (
    <div className={styles.userInfo}>
      <span className={styles.userEmail}>{user.email}</span>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}
