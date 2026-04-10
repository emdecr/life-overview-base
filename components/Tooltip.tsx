/**
 * Tooltip — shows details when hovering over a week cell.
 *
 * This is a POLYMORPHIC component — it renders differently depending
 * on which props are provided:
 *
 *   1. `year` only       → Small tooltip showing just the year (birthday weeks)
 *   2. `date` + `content` → Full tooltip with date, description, and optional tags
 *   3. `date` only       → Compact "today" tooltip showing the current date
 *   4. No meaningful props → Full tooltip shell (fallback, rarely used)
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
  // --- Variant 1: Year tooltip (birthday weeks) ---
  // Shows just the year in a small centered box, e.g. "2024"
  if (year) {
    return (
      <>
        <div className={styles.indicator}></div>
        <div className={clsx(styles.tooltip, styles.small, "tooltip-hover-target")}>
          <span>
            <strong>{year}</strong>
          </span>
        </div>
      </>
    );
  }

  // --- Variant 2: Full tooltip (records with content) ---
  // Shows date, content text, and any tags as colored badges
  if (date && content) {
    return (
      <>
        <div className={styles.indicator}></div>
        <div className={clsx(styles.tooltip, "tooltip-hover-target")}>
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
        </div>
      </>
    );
  }

  // --- Variant 3: Date-only tooltip (today's week) ---
  // Compact tooltip showing just the formatted date, e.g. "Apr 10, 2026"
  if (date) {
    return (
      <>
        <div className={styles.indicator}></div>
        <div className={clsx(styles.tooltip, styles.today, "tooltip-hover-target")}>
          <span>
            <strong>{date}</strong>
          </span>
        </div>
      </>
    );
  }

  // --- Variant 4: Fallback ---
  // Renders the tooltip shell with whatever props were passed.
  // This rarely triggers but keeps the component from returning null.
  return (
    <>
      <div className={styles.indicator}></div>
      <div className={clsx(styles.tooltip, "tooltip-hover-target")}>
        <p>
          <strong>{date}</strong>
        </p>
        <div className={styles.content}>{content}</div>
      </div>
    </>
  );
}
