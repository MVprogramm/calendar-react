import React from "react";
import Day from "../day/Day";

import "./week.scss";

const Week = ({ weekDates, eventsList, slotHeight }) => {
  return (
    <>
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        //getting all events from the day we will render
        const dayEvents = eventsList.filter(
          (event) =>
            new Date(event.dateFrom).getTime() > new Date(dayStart).getTime() &&
            new Date(event.dateTo).getTime() < new Date(dayEnd).getTime()
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart}
            dayEvents={dayEvents}
            slotHeight={slotHeight}
          />
        );
      })}
    </>
  );
};

export default Week;
