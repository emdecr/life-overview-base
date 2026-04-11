/**
 * WeekBirthday — renders a birthday milestone week.
 *
 * Birthday weeks are positioned using real date math (not weekId % 52),
 * so they appear at the correct week in the grid without drift.
 * The `age` prop is pre-computed by the birthday week map in helpers.ts.
 *
 * Special behavior at decade milestones (age 10, 20, 30, ...):
 *   Shows the calendar year alongside the age, e.g. "20 years old in 2024"
 *
 * The `birthYear` prop comes from the NEXT_PUBLIC_BIRTH_DATE env var
 * (parsed in lib/helpers.ts).
 */

import clsx from "clsx";
import Tooltip from "./Tooltip";
import weekStyles from "./styles/Week.module.css";
import type { WeekBirthdayProps } from "@/lib/types";

export default function WeekBirthday({
  weekId,
  decadeId,
  birthYear,
  age,
  hasRecords,
}: WeekBirthdayProps) {
  // Calendar year for this birthday
  const calendarYear = birthYear + age;

  // Calculate the calendar year at the start of this decade (for milestone display)
  const decadeStartYear = birthYear + decadeId * 10;

  // Use a different id prefix if this birthday week also has records,
  // so the WeekFilled component rendered alongside can use `week-${weekId}`.
  const id = hasRecords ? `birthday-${weekId}` : `week-${weekId}`;

  return (
    <div className={clsx(weekStyles.week, weekStyles.birthday)} id={id}>
      <span>
        {/* Show "1 year old" vs "X years old" (singular/plural) */}
        {`${age} ${age === 1 ? "year old" : "years old"}`}
        {/* At decade milestones (10, 20, 30...), also show the calendar year */}
        {age % 10 === 0 ? ` in ${decadeStartYear}` : ""}
      </span>

      {/* Small tooltip showing the calendar year on hover */}
      <Tooltip year={calendarYear} />
    </div>
  );
}
