import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";

import { getFormattedDate } from "../../utils/dateUtils.js";

import "./dateInput.scss";

const DateInput = ({ isModal, eventDay, setEventDay, eventDone }) => {
  const handleDateInput = (event) => {
    setEventDay(new Date(event.target.value));
  };
  const showDatePicker = (event) => {
    if (isModal === "create" || isModal === "edit")
      event.target.previousElementSibling.showPicker();
  };

  return (
    <label
      className={classNames("event-form__field event-form__field_date", {
        "event-form__field_hover": isModal === "create" || isModal === "edit",
        "event-form__field_done": eventDone,
        "event-form__field_delete": isModal === "delete",
      })}
    >
      <input
        type="date"
        id="date"
        name="date"
        value={eventDay}
        onChange={handleDateInput}
      />
      <span id="eventDay" onClick={showDatePicker}>
        {getFormattedDate(eventDay)}
      </span>
    </label>
  );
};

DateInput.propTypes = {
  isModal: propTypes.oneOf(["", "create", "control", "delete", "edit"])
    .isRequired,
  eventDay: propTypes.instanceOf(Date).isRequired,
  setEventDay: propTypes.func.isRequired,
  eventDone: propTypes.bool.isRequired,
};

export default DateInput;
