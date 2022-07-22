import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import { setTimeFormat } from "../../utils/dateUtils.js";
import "./timeInput.scss";

const TimeInput = ({
  isModal,
  eventStartTime,
  setEventStartTime,
  eventEndTime,
  setEventEndTime,
  eventDone,
}) => {
  const showTimePicker = (event) => {
    if (isModal === "create" || isModal === "edit")
      event.target.previousElementSibling.showPicker();
  };
  const handleStartTimeInput = (event) => {
    setEventStartTime(setTimeFormat([event.target.value, eventEndTime])[0]);
    setEventEndTime(setTimeFormat([event.target.value, eventEndTime])[1]);
  };
  const handleEndTimeInput = (event) => {
    setEventStartTime(setTimeFormat([eventStartTime, event.target.value])[0]);
    setEventEndTime(setTimeFormat([eventStartTime, event.target.value])[1]);
  };

  return (
    <>
      <label
        className={classNames("event-form__field_start-time", {
          "event-form__field_hover": isModal === "create" || isModal === "edit",
          "event-form__field_done": eventDone,
          "event-form__field_delete": isModal === "delete",
        })}
      >
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={eventStartTime}
          onChange={handleStartTimeInput}
        />
        <span id="eventStartTime" onClick={showTimePicker}>
          {setTimeFormat([eventStartTime, eventEndTime])[0]}
        </span>
      </label>

      <span className="event-form__field_interval">-</span>

      <label
        className={classNames("event-form__field_end-time", {
          "event-form__field_hover": isModal === "create" || isModal === "edit",
          "event-form__field_done": eventDone,
          "event-form__field_delete": isModal === "delete",
        })}
      >
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={eventEndTime}
          onChange={handleEndTimeInput}
        />
        <span id="eventEndTime" onClick={showTimePicker}>
          {setTimeFormat([eventStartTime, eventEndTime])[1]}
        </span>
      </label>
    </>
  );
};

TimeInput.propTypes = {
  isModal: propTypes.oneOf(["", "create", "control", "delete", "edit"])
    .isRequired,
  eventStartTime: propTypes.string.isRequired,
  setEventStartTime: propTypes.func.isRequired,
  eventEndTime: propTypes.string.isRequired,
  setEventEndTime: propTypes.func.isRequired,
  eventDone: propTypes.bool.isRequired,
};

export default TimeInput;
