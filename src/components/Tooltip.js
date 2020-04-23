import React from "react";
import "./Tooltip.css";

const Tooltip = ({ year, date, content }) => {
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

  if (date && content) {
    return (
      <React.Fragment>
        <div className="tooltip-indicator"></div>
        <div className="tooltip">
          <p>
            <strong>{date}</strong>
          </p>
          <div className="tooltip__content">{content}</div>
        </div>
      </React.Fragment>
    );
  }

  if (date) {
    return (
      <React.Fragment>
        <div className="tooltip-indicator"></div>
        <div className="tooltip today">
          <span>
            <strong>{date}</strong>
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
        <div className="tooltip__content">{content}</div>
      </div>
    </React.Fragment>
  );
};

export default Tooltip;
