import React from "react";
import Decade from "./Decade";
import "./Overview.css";

const Overview = ({ records }) => {
  return (
    <div className="overview">
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
};

export default Overview;
