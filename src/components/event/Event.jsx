import React from "react";

import "./event.scss";

const Event = ({ height, marginTop, flexDirection, title, time }) => {
  const eventStyle = {
    height,
    marginTop,
    flexDirection,
  };

  return (
    <div style={eventStyle} className="event">
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

export default Event;
