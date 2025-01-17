import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import Navigation from "./components/navigation/Navigation.jsx";
import Week from "./components/week/Week.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import "./calendar.scss";

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
            callModal={callModal}
          />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  weekDates: propTypes.array.isRequired,
  callModal: propTypes.func.isRequired,
  eventsList: propTypes.array.isRequired,
};

export default Calendar;
