/**
 * Overview — the top-level container for the entire life grid.
 *
 * This is a SERVER component that creates one Decade row for each
 * decade of life, auto-generated from the NEXT_PUBLIC_MAX_AGE env var.
 *
 * It passes the full records array to each Decade. The actual filtering
 * by week number happens further down in WeekGrid (using a pre-built Map
 * for O(1) lookups).
 */

import Decade from "./Decade";
import { generateDecades } from "@/lib/helpers";
import styles from "./styles/Overview.module.css";
import type { OverviewProps } from "@/lib/types";

// Generate decade rows from MAX_AGE env var (e.g. 90 → 9 decades)
const DECADES = generateDecades();

export default function Overview({ records }: OverviewProps) {
  return (
    <div className={styles.overview}>
      {DECADES.map(({ id, heading }) => (
        <Decade key={id} decadeId={id} records={records} heading={heading} />
      ))}
    </div>
  );
}
