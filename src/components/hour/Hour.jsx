import React from "react";
import propTypes from "prop-types";
import Event from "../event/Event";
import { formatMins } from "../../../src/utils/dateUtils.js";
import "./hour.scss";

const Hour = ({ dataHour, hourEvents, slotHeight, callModal }) => {
  return (
    <div
      className="calendar__time-slot"
      style={slotHeight}
      data-time={dataHour + 1}
    >
      {hourEvents.map(({ id, dateFrom, dateTo, title, done }) => {
        const from = new Date(dateFrom);
        const to = new Date(dateTo);
        const eventStart = `${from.getHours()}:${formatMins(
          from.getMinutes()
        )}`;
        const eventEnd = `${to.getHours()}:${formatMins(to.getMinutes())}`;
        const height = (to.getTime() - from.getTime()) / (1000 * 60);
        const flexDirection = height > 30 ? "column" : "row";
        const eventData = {
          id,
          title,
          done,
          time: `${eventStart} - ${eventEnd}`,
          height,
          flexDirection,
          marginTop: from.getMinutes(),
        };

        return <Event key={id} eventData={eventData} callModal={callModal} />;
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
