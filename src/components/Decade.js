import React from "react";
import Week from "./Week";
import "./Decade.css";

const Decade = ({ records, decadeId, heading }) => {
  const weeks = () => {
    let start = decadeId * 520;
    let finish = start + 520;
    let weeksArr = [];
    for (let i = start; i < finish; i++) {
      weeksArr.push(
        <Week
          records={records}
          weekId={i}
          decadeId={decadeId}
          key={`week-key-${i}`}
        />
      );
    }
    return weeksArr;
  };
  return (
    <div className="decade">
      <h2>{heading}</h2>
      <div className="weeks">{weeks()}</div>
    </div>
  );
};

export default Decade;
