import React, { useEffect, useState } from "react";

import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";

import "./calendar.scss";
import { object } from "prop-types";

const Calendar = ({ weekDates, callModal, eventsList }) => {
  const slotHeight = { height: 60 };

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container" onClick={callModal}>
          <Sidebar slotHeight={slotHeight} />
          <Week
            weekDates={weekDates}
            eventsList={eventsList}
            slotHeight={slotHeight}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
