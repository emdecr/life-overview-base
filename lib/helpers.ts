/**
 * Helper utilities for the Life Overview app.
 *
 * These functions handle the core math and logic behind the week grid:
 * - Calculating which week of life "today" falls on
 * - Determining if a week should have example/demo styling
 * - Building CSS class strings for week cells
 */

import { parseISO } from "date-fns";
import clsx from "clsx";

// =============================================================================
// Birth Date Configuration
// =============================================================================

/**
 * Parse the birth date from an environment variable.
 *
 * NEXT_PUBLIC_ prefix makes this available in both server and client components.
 * Falls back to a default if the env var isn't set (useful during development).
 *
 * parseISO converts "2004-02-13" string → JavaScript Date object.
 */
const birthDateStr = process.env.NEXT_PUBLIC_BIRTH_DATE ?? "2004-02-13";
export const BIRTH_DATE = parseISO(birthDateStr);
export const BIRTH_YEAR = BIRTH_DATE.getFullYear();

// =============================================================================
// Week Calculation
// =============================================================================

/**
 * Calculate how many weeks have passed between the birth date and a given date.
 *
 * This is the core calculation that powers the entire grid. It determines
 * which week cell represents "today" so we can highlight it.
 *
 * Math breakdown:
 *   1. Subtract birth date from target date → milliseconds difference
 *   2. Divide by milliseconds-per-week (7 days × 24 hrs × 60 min × 60 sec × 1000 ms)
 *   3. Round to nearest integer (weeks don't align perfectly to midnight)
 *
 * @param date - The date to calculate weeks from (usually `new Date()` for today)
 * @returns The 0-based week index (e.g., 0 = birth week, 52 = first birthday)
 */
export function weeksBetween(date: Date): number {
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.round((date.getTime() - BIRTH_DATE.getTime()) / msPerWeek);
}

// =============================================================================
// Example/Demo Weeks
// =============================================================================

/**
 * Demo week IDs that get a red background for visual testing.
 *
 * These are hardcoded example weeks from the original app, used to
 * demonstrate what "filled" weeks look like before real data is added.
 */
const EXAMPLE_WEEK_IDS = new Set([300, 301, 302, 303, 304]);

/**
 * Check if a week ID falls in the example/demo range.
 *
 * @param weekId - The 0-based week index to check
 * @returns true if this week should have the red example background
 */
export function isExampleWeek(weekId: number): boolean {
  return EXAMPLE_WEEK_IDS.has(weekId);
}

// =============================================================================
// CSS Class Builder
// =============================================================================

/**
 * Build a CSS Module class string for a week cell.
 *
 * Uses `clsx` to conditionally join class names. This replaces the old
 * `getClassesString` helper — but now works with CSS Modules where class
 * names are objects (e.g., `styles.week`) instead of plain strings.
 *
 * @param styles    - The imported CSS Module object (e.g., `import styles from "./Week.module.css"`)
 * @param isEmpty   - True if the week has no record data (renders as a tiny empty box)
 * @param isExample - True if the week is in the demo range (gets red background)
 * @param hasTooltip - True if the week has content that triggers a tooltip on hover
 * @returns A space-separated class string ready for the `className` attribute
 */
export function getWeekClasses(
  styles: Record<string, string>,
  isEmpty: boolean,
  isExample: boolean,
  hasTooltip: boolean
): string {
  return clsx(
    styles.week,                              // Always applied — base week styling
    isEmpty && styles.empty,                  // Minimal styling for empty weeks
    isExample && styles.exampleBackground,    // Red background for demo weeks
    hasTooltip && styles.tooltipAvailable     // Bottom border accent when hoverable
  );
}
