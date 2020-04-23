import React from "react";
import Tooltip from "./Tooltip";
import Moment from "moment";

const WeekToday = ({ weekId }) => {
  const today = Moment().format("MMM D, YYYY");
  return (
    <div className="week today" id={`week-${weekId}`}>
      <span>Today</span>
      <Tooltip date={today} />
    </div>
  );
};

export default WeekToday;
