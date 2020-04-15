import React from "react";
import Tooltip from "./Tooltip";
import { getClassesString } from "../helpers";

const WeekFilled = ({ weekId, records, exampleBackgroundCheck }) => {
  const weekData = records[0];
  const tooltipCheck = weekData.content ? true : false;
  const classesString = getClassesString(
    false,
    exampleBackgroundCheck,
    tooltipCheck
  );

  let tooltip = function(c) {
    if (c.content) {
      return <Tooltip htmlContent={c.content} date={c.date} />;
    }
    return null;
  };

  if (weekData.title.indexOf("<") !== -1) {
    let headingHTML = function() {
      return { __html: weekData.title };
    };
    return (
      <div className={classesString} id={`week-${weekId}`}>
        <span dangerouslySetInnerHTML={headingHTML()}></span>
        {tooltip(weekData)}
      </div>
    );
  } else {
    return (
      <div className={classesString} id={`week-${weekId}`}>
        <span>{weekData.title}</span>
        {tooltip(weekData)}
      </div>
    );
  }
};

export default WeekFilled;
