/**
 * WeekGrid — the "use client" boundary for the week rendering loop.
 *
 * This is the KEY architectural component in the Next.js migration.
 * Everything above WeekGrid (page.tsx, Overview, Decade) is a Server Component.
 * Everything inside WeekGrid (Week, WeekFilled, etc.) is a Client Component.
 *
 * WHY is this the client boundary?
 *   1. It calls `weeksBetween(new Date())` which depends on the current time
 *      (this must run in the browser to be accurate for the user's timezone)
 *   2. All child components (Week, Tooltip) benefit from client-side rendering
 *      for hover interactions
 *
 * PERFORMANCE OPTIMIZATION:
 *   The original app filtered the records array for EACH of ~520 weeks per decade
 *   using Array.filter() — that's O(weeks × records) per decade.
 *
 *   We optimize this by building a Map<weekId, LifeRecord[]> ONCE using useMemo,
 *   then looking up records per week in O(1). This changes the complexity from
 *   O(weeks × records) to O(weeks + records).
 */
"use client";

import { useMemo } from "react";
import Week from "./Week";
import { weeksBetween, BIRTH_YEAR } from "@/lib/helpers";
import type { WeekGridProps } from "@/lib/types";
import type { LifeRecord } from "@/lib/types";

export default function WeekGrid({
  decadeId,
  records,
  startWeek,
  endWeek,
}: WeekGridProps) {
  // Calculate which week "today" is — this is why we need "use client".
  // weeksBetween uses the birth date from env var and current browser time.
  const todayWeek = weeksBetween(new Date());

  /**
   * Pre-index records by week number for O(1) lookups.
   *
   * Instead of calling records.filter(r => r.week === weekId) for each
   * of 520 weeks (which is O(520 × records.length)), we build a Map once
   * and do Map.get(weekId) per week (which is O(1) per lookup).
   *
   * useMemo ensures we only rebuild the Map when the records array changes
   * (which is basically never — it's fetched once from Supabase).
   */
  const recordsByWeek = useMemo(() => {
    const map = new Map<number, LifeRecord[]>();
    for (const record of records) {
      // Get existing records for this week, or start a new array
      const existing = map.get(record.week) ?? [];
      existing.push(record);
      map.set(record.week, existing);
    }
    return map;
  }, [records]);

  // Build an array of Week components for this decade (520 weeks)
  const weeks = [];
  for (let weekId = startWeek; weekId < endWeek; weekId++) {
    // Look up records for this specific week — O(1) via the Map
    const weekRecords = recordsByWeek.get(weekId) ?? [];

    weeks.push(
      <Week
        key={`week-key-${weekId}`}
        weekId={weekId}
        records={weekRecords}
        decadeId={decadeId}
        todayWeek={todayWeek}
        birthYear={BIRTH_YEAR}
      />
    );
  }

  return <>{weeks}</>;
}
