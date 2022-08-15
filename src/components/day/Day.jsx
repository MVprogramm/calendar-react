import React from "react";
import propTypes from "prop-types";
import ClockHand from "../clockHand/ClockHand";
import Hour from "../hour/Hour";
import "./day.scss";

const Day = ({ dataDay, dayEvents, slotHeight, callModal }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);
  const thisDay = new Date(dataDay).getDate();
  return (
    <div className="calendar__day" data-day={thisDay}>
      <ClockHand dataDay={dataDay} slotHeight={slotHeight} />
      {hours.map((hour) => {
        const hourEvents = dayEvents.filter(
          (event) => new Date(event.dateFrom).getHours() === hour
        );

        return (
          <Hour
            key={thisDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            slotHeight={slotHeight}
            callModal={callModal}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: propTypes.instanceOf(Date).isRequired,
  dayEvents: propTypes.array.isRequired,
  slotHeight: propTypes.object.isRequired,
  callModal: propTypes.func.isRequired,
};

export default Day;
