/**
 * Decade — a row in the life grid representing 10 years (520 weeks).
 *
 * This is a SERVER component — it doesn't need any interactivity.
 * It renders:
 *   1. A heading (e.g. "20s", "30s", "Centarian Days")
 *   2. A WeekGrid client component that handles the 520 week cells
 *
 * The Decade component acts as the bridge between the server world
 * (Overview → Decade) and the client world (WeekGrid → Week → ...).
 *
 * Each decade covers 520 weeks:
 *   - Decade 0: weeks 0-519    ("Early Years", ages 0-9)
 *   - Decade 1: weeks 520-1039 ("Teens", ages 10-19)
 *   - Decade 2: weeks 1040-1559 ("20s", ages 20-29)
 *   - ...etc up to decade 10
 */

import WeekGrid from "./WeekGrid";
import styles from "./styles/Decade.module.css";
import type { DecadeProps } from "@/lib/types";

export default function Decade({ records, decadeId, heading }: DecadeProps) {
  // Calculate the week range for this decade.
  // Each decade has 520 weeks (52 weeks/year × 10 years).
  const startWeek = decadeId * 520;
  const endWeek = startWeek + 520;

  return (
    <div className={styles.decade}>
      {/* Decade label, e.g. "20s" */}
      <h2>{heading}</h2>

      {/* The flex container wrapping all 520 week cells.
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
