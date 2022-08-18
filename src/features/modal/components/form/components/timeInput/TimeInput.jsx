import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import { setTimeFormat } from "../../../../../../utils/dateUtils.js";
import "./timeInput.scss";

const TimeInput = ({ isModal, eventData, setEventData }) => {
  const { start, end, done } = eventData;
  const showTimePicker = (event) => {
    if (isModal === "create" || isModal === "edit")
      event.target.previousElementSibling.showPicker();
  };
  const handleStartTimeInput = (event) => {
    setEventData({
      ...eventData,
      start: setTimeFormat([event.target.value, end])[0],
      end: setTimeFormat([event.target.value, end])[1],
    });
  };
  const handleEndTimeInput = (event) => {
    setEventData({
      ...eventData,
      start: setTimeFormat([start, event.target.value])[0],
      end: setTimeFormat([start, event.target.value])[1],
    });
  };

  return (
    <>
      <label
        className={classNames("event-form__field_start-time", {
          "event-form__field_hover": isModal === "create" || isModal === "edit",
          "event-form__field_done": done,
          "event-form__field_delete": isModal === "delete",
        })}
      >
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={start}
          onChange={handleStartTimeInput}
        />
        <span id="eventStartTime" onClick={showTimePicker}>
          {setTimeFormat([start, end])[0]}
        </span>
      </label>

      <span className="event-form__field_interval">-</span>

      <label
        className={classNames("event-form__field_end-time", {
          "event-form__field_hover": isModal === "create" || isModal === "edit",
          "event-form__field_done": done,
          "event-form__field_delete": isModal === "delete",
        })}
      >
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={end}
          onChange={handleEndTimeInput}
        />
        <span id="eventEndTime" onClick={showTimePicker}>
          {setTimeFormat([start, end])[1]}
        </span>
      </label>
    </>
  );
};

TimeInput.propTypes = {
  isModal: propTypes.oneOf(["", "create", "control", "delete", "edit"])
    .isRequired,
  eventData: propTypes.object.isRequired,
  setEventData: propTypes.func.isRequired,
};

export default TimeInput;
