/**
 * Week — the core rendering logic for a single week cell.
 *
 * This component determines WHICH variant of week to render based on:
 *   1. Is this a birthday week? (weekId divisible by 52)
 *   2. Does this week have record data?
 *   3. Is this the current week ("today")?
 *   4. None of the above → empty cell
 *
 * Rendering priority (checked in order):
 *   - Birthday + has records → WeekBirthday AND WeekFilled (side by side)
 *   - Birthday only         → WeekBirthday
 *   - Has records           → WeekFilled
 *   - Is today              → WeekToday
 *   - Otherwise             → empty div with base styling
 *
 * This matches the exact same conditional logic from the original Week.js,
 * just ported to TypeScript with typed props.
 */

import WeekBirthday from "./WeekBirthday";
import WeekFilled from "./WeekFilled";
import WeekToday from "./WeekToday";
import { isExampleWeek, getWeekClasses } from "@/lib/helpers";
import weekStyles from "./styles/Week.module.css";
import type { WeekProps } from "@/lib/types";

export default function Week({
  weekId,
  records,
  decadeId,
  todayWeek,
  birthYear,
  birthdayAge,
}: WeekProps) {
  // Check if this week is in the demo/example range (300-304)
  const isExample = isExampleWeek(weekId);

  // Check if this is the user's current week
  const isToday = weekId === todayWeek;

  // Check if this is a birthday week (computed from real date math in helpers.ts,
  // not weekId % 52, which drifts ~0.18 weeks per year)
  const isBirthday = birthdayAge !== undefined;

  // Check if we have any records for this week
  const hasRecords = records.length > 0;

  // --- Condition 1: Birthday week WITH records ---
  // Render both a birthday marker and a filled week (two cells side by side)
  if (isBirthday && hasRecords) {
    return (
      <>
        <WeekBirthday
          decadeId={decadeId}
          weekId={weekId}
          birthYear={birthYear}
          age={birthdayAge!}
          hasRecords={true}
        />
        <WeekFilled
          isExampleWeek={isExample}
          records={records}
          weekId={weekId}
        />
      </>
    );
  }

  // --- Condition 2: Birthday week without records ---
  if (isBirthday) {
    return (
      <WeekBirthday
        decadeId={decadeId}
        weekId={weekId}
        birthYear={birthYear}
        age={birthdayAge!}
      />
    );
  }

  // --- Condition 3: Has records (not a birthday) ---
  if (hasRecords) {
    return (
      <WeekFilled
        isExampleWeek={isExample}
        records={records}
        weekId={weekId}
      />
    );
  }

  // --- Condition 4: Today's week ---
  if (isToday) {
    return <WeekToday weekId={weekId} />;
  }

  // --- Default: Empty week cell ---
  // Most weeks end up here — just a tiny bordered box in the grid.
  // Past empty weeks get a light gray fill to distinguish from the future.
  const isPast = weekId < todayWeek;
  const classesString = getWeekClasses(
    weekStyles,
    true,      // isEmpty
    isExample, // isExample (could still be in demo range even without records)
    false      // hasTooltip
  ) + (isPast ? ` ${weekStyles.past}` : "");

  return <div className={classesString} id={`week-${weekId}`}></div>;
}
