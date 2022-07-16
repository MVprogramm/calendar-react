import React from "react";

import "./sidebar.scss";

const Sidebar = ({ slotHeight }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__time-scale">
      {hours.map((hour) => (
        <div className="time-slot" key={hour}>
          <span className="time-slot__time">
            {hour === 0 ? "   " : `${hour}:00`}
          </span>
          <div className="calendar__scale" style={slotHeight}></div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
