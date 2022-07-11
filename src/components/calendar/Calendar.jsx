import React, { useState } from "react";

import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";

import events from "../../gateway/events";

import "./calendar.scss";

const Calendar = ({ weekDates, callModal }) => {
  const [events] = useState([]);
  const slotHeight = { height: 60 };

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container" onClick={callModal}>
          <Sidebar slotHeight={slotHeight} />
          <Week weekDates={weekDates} events={events} slotHeight={slotHeight} />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
