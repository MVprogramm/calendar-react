import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import { getFormattedDate } from "../../utils/dateUtils.js";
import "./dateInput.scss";

const DateInput = ({ isModal, eventData, setEventData }) => {
  const { day, done } = eventData;
  const handleDateInput = (event) => {
    setEventData({
      ...eventData,
      day: new Date(event.target.value),
    });
  };
  const showDatePicker = (event) => {
    if (isModal === "create" || isModal === "edit")
      event.target.previousElementSibling.showPicker();
  };

  return (
    <label
      className={classNames("event-form__field event-form__field_date", {
        "event-form__field_hover": isModal === "create" || isModal === "edit",
        "event-form__field_done": done,
        "event-form__field_delete": isModal === "delete",
      })}
    >
      <input
        type="date"
        id="date"
        name="date"
        value={day}
        onChange={handleDateInput}
      />
      <span id="eventDay" onClick={showDatePicker}>
        {getFormattedDate(day)}
      </span>
    </label>
  );
};

DateInput.propTypes = {
  isModal: propTypes.oneOf(["", "create", "control", "delete", "edit"])
    .isRequired,
  eventData: propTypes.object.isRequired,
  setEventData: propTypes.func.isRequired,
};

export default DateInput;
