/**
 * WeekToday — renders the current week with a dark background.
 *
 * This highlights "today" in the life grid so the user can see
 * where they currently are in the timeline.
 *
 * Uses date-fns `format` instead of the old moment.js:
 *   Old: Moment().format("MMM D, YYYY")  → "Apr 10, 2026"
 *   New: format(new Date(), "MMM d, yyyy") → "Apr 10, 2026"
 *
 * Note the case difference: date-fns uses lowercase `d` for day-of-month
 * and lowercase `yyyy` for 4-digit year (moment used uppercase `D` and `YYYY`).
 */

import { format } from "date-fns";
import clsx from "clsx";
import Tooltip from "./Tooltip";
import weekStyles from "./styles/Week.module.css";
import type { WeekTodayProps } from "@/lib/types";

export default function WeekToday({ weekId }: WeekTodayProps) {
  // Format today's date for the tooltip, e.g. "Apr 10, 2026"
  const today = format(new Date(), "MMM d, yyyy");

  return (
    <div className={clsx(weekStyles.week, weekStyles.today)} id={`week-${weekId}`}>
      {/* "Today" label visible inside the week cell */}
      <span>Today</span>

      {/* Tooltip shows the formatted date on hover */}
      <Tooltip date={today} />
    </div>
  );
}
