/**
 * ThemeToggle — a segmented control for light / dark / system themes.
 *
 * How it works:
 *   1. Reads saved preference from localStorage (key: "theme")
 *   2. Applies the resolved theme as data-theme="light"|"dark" on <html>
 *   3. "System" follows the OS preference via matchMedia
 *   4. Saves the user's choice to localStorage on click
 *
 * On first load (no saved preference), defaults to "system".
 */
"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./styles/ThemeToggle.module.css";

type Theme = "light" | "dark" | "system";

/**
 * Resolve the actual theme to apply based on the user's preference.
 * "system" defers to the OS dark mode setting.
 */
function resolveTheme(preference: Theme): "light" | "dark" {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Apply the resolved theme to the <html> element */
function applyTheme(preference: Theme) {
  document.documentElement.setAttribute("data-theme", resolveTheme(preference));
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  // On mount, read saved preference and apply it
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const preference = saved ?? "system";
    setTheme(preference);
    applyTheme(preference);
  }, []);

  // Listen for OS theme changes when set to "system"
  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  function handleChange(newTheme: Theme) {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  }

  const options: { value: Theme; label: string }[] = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];

  return (
    <div className={styles.toggle}>
      {options.map(({ value, label }) => (
        <button
          key={value}
          className={clsx(styles.option, theme === value && styles.active)}
          onClick={() => handleChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
