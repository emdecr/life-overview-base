import React from "react";
import Tooltip from "./Tooltip";

const WeekBirthday = ({ weekId, decadeId, recordsCheck }) => {
  const yearsOld = weekId / 52;
  let startYear = 2004;
  const decadeAge = startYear + decadeId * 10;

  const id = recordsCheck ? `birthday-${weekId}` : `week-${weekId}`;

  return (
    <div className="week birthday" id={id}>
      <span>
        {`${yearsOld} ${yearsOld === 1 ? "year old" : "years old"}
        ${yearsOld % 10 === 0 ? `in ${decadeAge}` : ""}`}
      </span>
      <Tooltip year={startYear + yearsOld} />
    </div>
  );
};

export default WeekBirthday;
