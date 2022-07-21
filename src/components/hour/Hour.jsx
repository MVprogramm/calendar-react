import React from "react";
import propTypes from "prop-types";

import Event from "../event/Event";
import { formatMins } from "../../../src/utils/dateUtils.js";

const Hour = ({ dataHour, hourEvents, slotHeight, callModal }) => {
  return (
    <div
      className="calendar__time-slot"
      style={slotHeight}
      data-time={dataHour + 1}
    >
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title, done }) => {
        const from = new Date(dateFrom);
        const to = new Date(dateTo);
        const eventStart = `${from.getHours()}:${formatMins(
          from.getMinutes()
        )}`;
        const eventEnd = `${to.getHours()}:${formatMins(to.getMinutes())}`;

        const height = (to.getTime() - from.getTime()) / (1000 * 60);
        const flexDirection = height > 30 ? "column" : "row";

        return (
          <Event
            key={id}
            //calculating event height = duration of event in minutes
            height={height}
            marginTop={from.getMinutes()}
            flexDirection={flexDirection}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            done={done}
            id={id}
            callModal={callModal}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: propTypes.number.isRequired,
  hourEvents: propTypes.array.isRequired,
  slotHeight: propTypes.object.isRequired,
  callModal: propTypes.func.isRequired,
};

export default Hour;
