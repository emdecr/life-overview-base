/**
 * TypeScript types for the Life Overview app.
 *
 * These types define the shape of data flowing through the app —
 * from Supabase all the way down to individual Week components.
 */

// =============================================================================
// Database Types
// =============================================================================

/**
 * A single life record from the Supabase `life_overview_records` table.
 *
 * Each record represents a notable event or period tied to a specific
 * week of the user's life. The `week` field is a 0-based index:
 *   - Week 0 = birth week
 *   - Week 52 = 1st birthday
 *   - Week 5720 = age 110 (theoretical max)
 */
export interface LifeRecord {
  id: number;
  week: number;
  date: string;          // Human-readable date, e.g. "April 15, 2020"
  title: string;         // Short label shown on the week cell
  content: string | null; // Longer description shown in tooltip (optional)
  tags: string[];        // Tags for grouping/styling, e.g. ["travel", "milestone"]
  public: boolean;       // If false, only visible to authenticated users
  created_at: string;    // ISO timestamp from Supabase
}

// =============================================================================
// Component Props
// =============================================================================

/** Props for the Overview component — the top-level grid container */
export interface OverviewProps {
  records: LifeRecord[];
}

/** Props for a single Decade row (10 years = 520 weeks) */
export interface DecadeProps {
  decadeId: number;       // 0-10 (0 = "Early Years", 10 = "Centarian Days")
  records: LifeRecord[];
  heading: string;        // Display label, e.g. "20s", "30s"
}

/**
 * Props for WeekGrid — the "use client" boundary.
 *
 * WeekGrid is a Client Component because it needs to:
 *   1. Compute `todayWeek` using `new Date()` (dynamic, client-dependent)
 *   2. Pre-index records into a Map for O(1) lookups per week
 */
export interface WeekGridProps {
  decadeId: number;
  records: LifeRecord[];
  startWeek: number;      // decadeId * 520
  endWeek: number;        // startWeek + 520
}

/** Props for a single Week cell */
export interface WeekProps {
  weekId: number;
  records: LifeRecord[];  // Pre-filtered records matching this weekId
  decadeId: number;
  todayWeek: number;      // Which week index "today" falls on
  birthYear: number;      // Derived from NEXT_PUBLIC_BIRTH_DATE env var
  birthdayAge?: number;   // If this week is a birthday, the age (computed from real dates)
}

/** Props for a week that has record data */
export interface WeekFilledProps {
  weekId: number;
  records: LifeRecord[];
  isExampleWeek: boolean; // True if weekId is in the demo range (300-304)
}

/** Props for a birthday milestone week */
export interface WeekBirthdayProps {
  weekId: number;
  decadeId: number;
  birthYear: number;
  age: number;            // The age at this birthday (computed from real date math)
  hasRecords?: boolean;   // True if this birthday week also has record data
}

/** Props for the "today" marker week */
export interface WeekTodayProps {
  weekId: number;
}

/**
 * Props for the Tooltip component.
 *
 * Tooltip is polymorphic — it renders differently based on which props
 * are provided:
 *   - year only       → small year tooltip (birthday weeks)
 *   - date + content  → full tooltip with date and description
 *   - date only       → compact date tooltip (today's week)
 *   - tags            → shown as small badges in any tooltip variant
 */
export interface TooltipProps {
  year?: number;
  date?: string;
  content?: string | null;
  tags?: string[];
}
