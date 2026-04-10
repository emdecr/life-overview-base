/**
 * WeekFilled — renders a week cell that has record data.
 *
 * This component displays the record's title as text inside the week cell,
 * and optionally shows a Tooltip on hover if the record has content.
 *
 * Original app had an if/else branch checking for HTML in the title
 * (via `indexOf("<")`), but both branches rendered identical JSX.
 * Simplified here to a single return.
 *
 * Visual indicators:
 *   - Bottom border accent (via .tooltipAvailable) if record has content
 *   - Red background if it's an example/demo week (weeks 300-304)
 *   - Left border color if record has tags (via .tagged class)
 */

import Tooltip from "./Tooltip";
import { getWeekClasses } from "@/lib/helpers";
import weekStyles from "./styles/Week.module.css";
import type { WeekFilledProps } from "@/lib/types";

/**
 * Simple mapping from tag names to colors.
 * Used to color the left border of tagged week cells.
 * Add more tags here as needed — the first tag determines the color.
 */
const TAG_COLORS: Record<string, string> = {
  travel: "#4ecdc4",
  milestone: "#ff6b6b",
  work: "#45b7d1",
  education: "#96ceb4",
  health: "#ffeaa7",
  example: "#ff4757",
};

export default function WeekFilled({
  weekId,
  records,
  isExampleWeek,
}: WeekFilledProps) {
  // Grab the first matching record for this week.
  // (In practice, most weeks have 0 or 1 record.)
  const [weekData] = records;

  // Check if this record has content that should trigger a tooltip
  const hasTooltip = !!weekData.content;

  // Build the CSS class string using our helper.
  // `isEmpty: false` because this is a filled week.
  const classesString = getWeekClasses(
    weekStyles,
    false,         // isEmpty — not empty, we have data
    isExampleWeek, // isExample — red background for demo weeks
    hasTooltip     // hasTooltip — bottom border accent
  );

  // Determine tag-based styling: colored left border for the first tag
  const firstTag = weekData.tags?.[0];
  const tagColor = firstTag ? TAG_COLORS[firstTag] : undefined;
  const taggedClass = firstTag ? ` ${weekStyles.tagged}` : "";

  return (
    <div
      className={classesString + taggedClass}
      id={`week-${weekId}`}
      style={tagColor ? { borderLeftColor: tagColor } : undefined}
    >
      {/* Record title — displayed as text inside the week cell */}
      <span>{weekData.title}</span>

      {/* Tooltip — only rendered if the record has content */}
      {hasTooltip && (
        <Tooltip
          content={weekData.content}
          date={weekData.date}
          tags={weekData.tags}
        />
      )}
    </div>
  );
}
