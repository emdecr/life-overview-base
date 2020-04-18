import React from "react";
import WeekBirthday from "./WeekBirthday";
import WeekFilled from "./WeekFilled";
import WeekToday from "./WeekToday";
import "./Week.css";
import { exampleBackground, getClassesString, weeksBetween } from "../helpers";

const Week = ({ records, weekId, decadeId }) => {
  const exampleBackgroundCheck = exampleBackground(weekId) ? true : false;
  const todayWeek = weeksBetween(new Date());
  const todayCheck = weekId === todayWeek ? true : false;
  const getRecords = id => {
    const matches = records.filter(r => {
      return r.week === id;
    });
    return matches;
  };

  const classesString = getClassesString(true, exampleBackgroundCheck, false);

  const generateWeek = () => {
    let records = getRecords(weekId);

    if (weekId % 52 === 0 && records.length > 0) {
      return (
        <React.Fragment>
          <WeekBirthday
            decadeId={decadeId}
            weekId={weekId}
            recordsCheck={true}
          />
          <WeekFilled
            exampleBackgroundCheck={exampleBackgroundCheck}
            records={records}
            weekId={weekId}
          />
        </React.Fragment>
      );
    }

    if (weekId % 52 === 0) {
      return <WeekBirthday decadeId={decadeId} weekId={weekId} />;
    }

    if (records.length > 0) {
      return (
        <WeekFilled
          exampleBackgroundCheck={exampleBackgroundCheck}
          records={records}
          weekId={weekId}
        />
      );
    }

    if (todayCheck) {
      return <WeekToday />;
    }

    return <div className={classesString} id={`week-${weekId}`}></div>;
  };

  return <React.Fragment>{generateWeek()}</React.Fragment>;
};

export default Week;
