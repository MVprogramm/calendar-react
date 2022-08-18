import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import "./event.scss";

const Event = ({ eventData, callModal }) => {
  const { height, marginTop, flexDirection, title, time, done, id } = eventData;
  const eventStyle = {
    height,
    marginTop,
    flexDirection,
  };

  return (
    <div style={eventStyle} className="event" onClick={callModal} data-id={id}>
      <div className={classNames("event__title", { event_done: done })}>
        {title}
      </div>
      <div className={classNames("event__time", { event_done: done })}>
        {time}
      </div>
    </div>
  );
};

Event.propTypes = {
  eventData: propTypes.object.isRequired,
  callModal: propTypes.func.isRequired,
};

export default Event;
