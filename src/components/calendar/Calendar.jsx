import React, { useState } from "react";

import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import ClockHand from "../clockhand/ClockHand";
import events from "../../gateway/events";

import "./calendar.scss";

const Calendar = ({ weekDates }) => {
  const [events] = useState([]);

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week weekDates={weekDates} events={events} />
          <ClockHand />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
