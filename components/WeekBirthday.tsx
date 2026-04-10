/**
 * WeekBirthday — renders a birthday milestone week (every 52nd week).
 *
 * Birthday weeks appear every 52 weeks in the grid (weekId 0, 52, 104, ...).
 * They have a yellow background and display the person's age.
 *
 * Special behavior at decade milestones (age 10, 20, 30, ...):
 *   Shows the calendar year alongside the age, e.g. "20 years old in 2024"
 *
 * The `birthYear` prop comes from the NEXT_PUBLIC_BIRTH_DATE env var
 * (parsed in lib/helpers.ts), replacing the old hardcoded `startYear = 2004`.
 */

import clsx from "clsx";
import Tooltip from "./Tooltip";
import weekStyles from "./styles/Week.module.css";
import type { WeekBirthdayProps } from "@/lib/types";

export default function WeekBirthday({
  weekId,
  decadeId,
  birthYear,
  hasRecords,
}: WeekBirthdayProps) {
  // Calculate age: weekId / 52 gives the number of years
  // (weekId 0 = age 0, weekId 52 = age 1, weekId 520 = age 10, etc.)
  const yearsOld = weekId / 52;

  // Calculate the calendar year for decade milestone display.
  // decadeId 0 = birth decade, decadeId 2 = 20s, etc.
  // So the age at the start of this decade is decadeId * 10.
  const decadeStartYear = birthYear + decadeId * 10;

  // Use a different id prefix if this birthday week also has records,
  // so the WeekFilled component rendered alongside can use `week-${weekId}`.
  const id = hasRecords ? `birthday-${weekId}` : `week-${weekId}`;

  return (
    <div className={clsx(weekStyles.week, weekStyles.birthday)} id={id}>
      <span>
        {/* Show "1 year old" vs "X years old" (singular/plural) */}
        {`${yearsOld} ${yearsOld === 1 ? "year old" : "years old"}`}
        {/* At decade milestones (10, 20, 30...), also show the calendar year */}
        {yearsOld % 10 === 0 ? ` in ${decadeStartYear}` : ""}
      </span>

      {/* Small tooltip showing the calendar year on hover */}
      <Tooltip year={birthYear + yearsOld} />
    </div>
  );
}
