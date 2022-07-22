import React from "react";
import propTypes from "prop-types";
import Day from "../day/Day";
import "./week.scss";

const Week = ({ weekDates, eventsList, slotHeight, callModal }) => {
  return (
    <>
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );
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
            callModal={callModal}
          />
        );
      })}
    </>
  );
};

Week.propTypes = {
  weekDates: propTypes.array.isRequired,
  eventsList: propTypes.array.isRequired,
  slotHeight: propTypes.object.isRequired,
  callModal: propTypes.func.isRequired,
};

export default Week;
