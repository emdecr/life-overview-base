/**
 * Tooltip — shows details when hovering over a week cell.
 *
 * This is a POLYMORPHIC component — it renders differently depending
 * on which props are provided:
 *
 *   1. `year` only       → Small tooltip showing just the year (birthday weeks)
 *   2. `date` + `content` → Full tooltip with date, description, and optional tags
 *   3. `date` only       → Compact "today" tooltip showing the current date
 *
 * VISIBILITY: The tooltip is always in the DOM but hidden via CSS.
 * The PARENT .week cell makes it visible on hover using:
 *   .week:hover .tooltip-hover-target { opacity: 1; visibility: visible; }
 *
 * The class "tooltip-hover-target" is a GLOBAL (non-module-scoped) class
 * that bridges the CSS Module boundary between Week and Tooltip styles.
 * See Week.module.css for the hover rule.
 */

import styles from "./styles/Tooltip.module.css";
import clsx from "clsx";
import type { TooltipProps } from "@/lib/types";

export default function Tooltip({ year, date, content, tags }: TooltipProps) {
  // Determine which size variant to use:
  //   - year only    → small (centered, 70px)
  //   - date only    → today (centered, 100px)
  //   - date+content → default (full width, 250px)
  const sizeClass = year ? styles.small : date && !content ? styles.today : undefined;

  // Build the inner content based on which props were provided
  let innerContent: React.ReactNode;

  if (year) {
    // Birthday year tooltip, e.g. "2024"
    innerContent = (
      <span>
        <strong>{year}</strong>
      </span>
    );
  } else if (date && content) {
    // Full record tooltip with date, content text, and optional tag badges
    innerContent = (
      <>
        <p>
          <strong>{date}</strong>
        </p>
        <div className={styles.content}>{content}</div>
        {/* Render tag badges if any tags exist */}
        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </>
    );
  } else if (date) {
    // Today's date tooltip, e.g. "Apr 10, 2026"
    innerContent = (
      <span>
        <strong>{date}</strong>
      </span>
    );
  }

  return (
    <div className={clsx(styles.tooltip, sizeClass, "tooltip-hover-target")}>
      {innerContent}
    </div>
  );
}
