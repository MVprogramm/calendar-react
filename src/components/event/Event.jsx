import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import "./event.scss";

const Event = ({
  height,
  marginTop,
  flexDirection,
  title,
  time,
  done,
  id,
  callModal,
}) => {
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
  height: propTypes.number.isRequired,
  marginTop: propTypes.number.isRequired,
  flexDirection: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  time: propTypes.string.isRequired,
  done: propTypes.bool.isRequired,
  id: propTypes.string.isRequired,
  callModal: propTypes.func.isRequired,
};

export default Event;
