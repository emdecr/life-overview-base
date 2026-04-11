/**
 * Helper utilities for the Life Overview app.
 *
 * These functions handle the core math and logic behind the week grid:
 * - Calculating which week of life "today" falls on
 * - Determining real birthday week positions (using actual date math)
 * - Generating decade configuration from max age
 * - Building CSS class strings for week cells
 */

import { parseISO, parse, isValid } from "date-fns";
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

/**
 * Maximum age to display in the life grid.
 *
 * Read from NEXT_PUBLIC_MAX_AGE env var. This determines how many
 * decade rows are rendered (e.g., 90 → 9 decades, 110 → 11 decades).
 */
export const MAX_AGE = parseInt(process.env.NEXT_PUBLIC_MAX_AGE ?? "90", 10);

// =============================================================================
// Week Calculation
// =============================================================================

/**
 * Calculate how many complete weeks have passed between the birth date and a given date.
 *
 * This is the core calculation that powers the entire grid. It determines
 * which week cell represents "today" so we can highlight it.
 *
 * Math breakdown:
 *   1. Subtract birth date from target date → milliseconds difference
 *   2. Divide by milliseconds-per-week (7 days × 24 hrs × 60 min × 60 sec × 1000 ms)
 *   3. Floor to get complete weeks (you're "in" a week until it finishes)
 *
 * @param date - The date to calculate weeks from (usually `new Date()` for today)
 * @returns The 0-based week index (e.g., 0 = birth week, ~52 = first birthday)
 */
export function weeksBetween(date: Date): number {
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor((date.getTime() - BIRTH_DATE.getTime()) / msPerWeek);
}

// =============================================================================
// Birthday Week Calculation
// =============================================================================

/**
 * Generate a map of which week IDs correspond to real birthdays.
 *
 * A calendar year is ~52.18 weeks, not exactly 52. Using `weekId % 52 === 0`
 * causes birthday markers to drift from their real positions — by age 34,
 * that's ~6 weeks of accumulated error.
 *
 * Instead, we compute each birthday's actual date (birth date + N years)
 * and use weeksBetween() to find the correct week index.
 *
 * @returns Map where key = weekId, value = age at that birthday
 */
export function generateBirthdayWeeks(): Map<number, number> {
  const map = new Map<number, number>();

  for (let age = 0; age <= MAX_AGE; age++) {
    // Create the actual birthday date for this age
    // (handles leap years correctly — Feb 29 birthdays → Feb 28/Mar 1)
    const birthday = new Date(BIRTH_DATE);
    birthday.setFullYear(BIRTH_DATE.getFullYear() + age);

    const weekId = weeksBetween(birthday);
    map.set(weekId, age);
  }

  return map;
}

/**
 * Pre-computed birthday week map, generated once at module load.
 * Used by WeekGrid to pass birthday ages to individual Week components.
 */
export const BIRTHDAY_WEEKS = generateBirthdayWeeks();

/**
 * Get the real week index for a given age using date math.
 *
 * Used by Decade to compute accurate start/end week ranges so each
 * decade begins exactly at its first birthday marker — no extra blocks.
 *
 * @param age - The age in years
 * @returns The week index for that birthday
 */
export function weekForAge(age: number): number {
  const birthday = new Date(BIRTH_DATE);
  birthday.setFullYear(BIRTH_DATE.getFullYear() + age);
  return weeksBetween(birthday);
}

// =============================================================================
// Record Week Resolution
// =============================================================================

/**
 * Try to parse a human-readable date string into a Date object.
 *
 * Supports common formats:
 *   - "April 15, 2020" (MMMM d, yyyy)
 *   - "Apr 15, 2020"   (MMM d, yyyy)
 *   - "2020-04-15"     (ISO format)
 *
 * @returns A valid Date, or null if parsing fails
 */
function tryParseDate(dateStr: string): Date | null {
  // Try ISO format first (most reliable)
  const iso = parseISO(dateStr);
  if (isValid(iso)) return iso;

  // Try "April 15, 2020" format
  const full = parse(dateStr, "MMMM d, yyyy", new Date());
  if (isValid(full)) return full;

  // Try "Apr 15, 2020" format
  const short = parse(dateStr, "MMM d, yyyy", new Date());
  if (isValid(short)) return short;

  return null;
}

/**
 * Resolve the `week` value for each record, preferring date-based calculation.
 *
 * For each record:
 *   1. If `date` is parseable → compute week from the date using weeksBetween()
 *   2. Else if `week` is set (non-null) → use the existing week value
 *   3. Otherwise → skip the record entirely
 *
 * This means you can just set a date when adding records instead of
 * manually calculating week numbers.
 */
export function resolveRecordWeeks<
  T extends { week: number | null; date: string | null }
>(records: T[]): (T & { week: number })[] {
  const resolved: (T & { week: number })[] = [];

  for (const record of records) {
    // Try to compute week from the date field
    if (record.date) {
      const parsed = tryParseDate(record.date);
      if (parsed) {
        resolved.push({ ...record, week: weeksBetween(parsed) });
        continue;
      }
    }

    // Fall back to the existing week value if it's set
    if (record.week != null) {
      resolved.push(record as T & { week: number });
      continue;
    }

    // Neither date nor week — skip this record
  }

  return resolved;
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
// Decade Generation
// =============================================================================

/**
 * Generate the decade configuration from MAX_AGE.
 *
 * Labeling convention:
 *   - Decade 0 → "Early Years" (ages 0-9)
 *   - Decade 1 → "Teens"       (ages 10-19)
 *   - Decades 2-9 → "20s" through "90s"
 *   - Decade 10+ → "100s", "110s", etc.
 *
 * @returns Array of { id, heading } objects, one per decade
 */
export function generateDecades(): { id: number; heading: string }[] {
  const decadeCount = Math.ceil(MAX_AGE / 10);

  return Array.from({ length: decadeCount }, (_, id) => {
    let heading: string;
    if (id === 0) heading = "Early Years";
    else if (id === 1) heading = "Teens";
    else heading = `${id * 10}s`;

    return { id, heading };
  });
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
