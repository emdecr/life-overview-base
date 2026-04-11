/**
 * Decade — a row in the life grid representing 10 years of life.
 *
 * This is a SERVER component — it doesn't need any interactivity.
 * It renders:
 *   1. A heading (e.g. "20s", "30s", "Centarian Days")
 *   2. A WeekGrid client component that handles the week cells
 *
 * The Decade component acts as the bridge between the server world
 * (Overview → Decade) and the client world (WeekGrid → Week → ...).
 *
 * Week ranges are computed from real birthday dates (via weekForAge)
 * so each decade starts exactly at its first birthday marker.
 */

import WeekGrid from "./WeekGrid";
import { weekForAge, MAX_AGE } from "@/lib/helpers";
import styles from "./styles/Decade.module.css";
import type { DecadeProps } from "@/lib/types";

export default function Decade({ records, decadeId, heading }: DecadeProps) {
  // Start at the real birthday week for this decade's first age.
  // e.g., decade 3 ("30s") starts at the exact week of the 30th birthday.
  const startAge = decadeId * 10;
  const endAge = Math.min(startAge + 10, MAX_AGE);

  const startWeek = weekForAge(startAge);
  const endWeek = weekForAge(endAge);

  return (
    <div className={styles.decade}>
      {/* Decade label, e.g. "20s" */}
      <h2>{heading}</h2>

      {/* The flex container wrapping all week cells.
          WeekGrid is a Client Component — this is where the
          server/client boundary lives. */}
      <div className={styles.weeks}>
        <WeekGrid
          decadeId={decadeId}
          records={records}
          startWeek={startWeek}
          endWeek={endWeek}
        />
      </div>
    </div>
  );
}
