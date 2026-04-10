/**
 * Overview — the top-level container for the entire life grid.
 *
 * This is a SERVER component that creates 11 Decade rows, one for each
 * decade of life from birth through age 110 (the "Centarian Days").
 *
 * It passes the full records array to each Decade. The actual filtering
 * by week number happens further down in WeekGrid (using a pre-built Map
 * for O(1) lookups).
 *
 * The decade labels are:
 *   0: "Early Years" (ages 0-9)
 *   1: "Teens"       (ages 10-19)
 *   2-9: "20s" through "90s"
 *   10: "Centarian Days" (ages 100-109)
 */

import Decade from "./Decade";
import styles from "./styles/Overview.module.css";
import type { OverviewProps } from "@/lib/types";

export default function Overview({ records }: OverviewProps) {
  return (
    <div className={styles.overview}>
      <Decade decadeId={0} records={records} heading="Early Years" />
      <Decade decadeId={1} records={records} heading="Teens" />
      <Decade decadeId={2} records={records} heading="20s" />
      <Decade decadeId={3} records={records} heading="30s" />
      <Decade decadeId={4} records={records} heading="40s" />
      <Decade decadeId={5} records={records} heading="50s" />
      <Decade decadeId={6} records={records} heading="60s" />
      <Decade decadeId={7} records={records} heading="70s" />
      <Decade decadeId={8} records={records} heading="80s" />
      <Decade decadeId={9} records={records} heading="90s" />
      <Decade decadeId={10} records={records} heading="Centarian Days" />
    </div>
  );
}
