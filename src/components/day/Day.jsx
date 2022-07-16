import React from "react";
import ClockHand from "../clockhand/ClockHand";
import Hour from "../hour/Hour";

import "./day.scss";

const Day = ({ dataDay, dayEvents, slotHeight }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);
  const thisDay = new Date(dataDay).getDate();
  return (
    <div className="calendar__day" data-day={thisDay}>
      <ClockHand dataDay={dataDay} slotHeight={slotHeight} />
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => new Date(event.dateFrom).getHours() === hour
        );

        return (
          <Hour
            key={thisDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            slotHeight={slotHeight}
          />
        );
      })}
    </div>
  );
};

export default Day;
