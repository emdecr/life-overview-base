import React from "react";

const Tooltip = ({ year, content, date }) => {
  if (year) {
    return (
      <React.Fragment>
        <div className="tooltip-indicator"></div>
        <div className="tooltip small">
          <span>
            <strong>{year}</strong>
          </span>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="tooltip-indicator"></div>
      <div className="tooltip">
        <p>
          <strong>{date}</strong>
        </p>
        <div className="tooltip__content">
          <p>{content}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tooltip;
