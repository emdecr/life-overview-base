/**
 * Overview — the top-level container for the entire life grid.
 *
 * This is a SERVER component that creates 11 Decade rows, one for each
 * decade of life from birth through age 110 (the "Centarian Days").
 *
 * It passes the full records array to each Decade. The actual filtering
 * by week number happens further down in WeekGrid (using a pre-built Map
 * for O(1) lookups).
 */

import Decade from "./Decade";
import styles from "./styles/Overview.module.css";
import type { OverviewProps } from "@/lib/types";

/**
 * Decade configuration — ids 0 and 1 have custom labels ("Early Years", "Teens"),
 * ids 2-9 follow the "{n}0s" naming pattern, and id 10 is the "Centarian Days".
 * To add or remove decades, just edit this array.
 */
const DECADES = [
  { id: 0, heading: "Early Years" },
  { id: 1, heading: "Teens" },
  { id: 2, heading: "20s" },
  { id: 3, heading: "30s" },
  { id: 4, heading: "40s" },
  { id: 5, heading: "50s" },
  { id: 6, heading: "60s" },
  { id: 7, heading: "70s" },
  { id: 8, heading: "80s" },
  { id: 9, heading: "90s" },
  { id: 10, heading: "Centarian Days" },
];

export default function Overview({ records }: OverviewProps) {
  return (
    <div className={styles.overview}>
      {DECADES.map(({ id, heading }) => (
        <Decade key={id} decadeId={id} records={records} heading={heading} />
      ))}
    </div>
  );
}
