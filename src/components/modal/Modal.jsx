import React from "react";
import { getFormattedDate, setTimeFormat } from "../../utils/dateUtils.js";

import "./modal.scss";

const Modal = ({
  closeModal,
  onSubmit,
  eventDay,
  setEventDay,
  eventTitle,
  setEventTitle,
  eventStartTime,
  setEventStartTime,
  eventEndTime,
  setEventEndTime,
  eventDescription,
  setEventDescription,
}) => {
  const handleTitleInput = (event) => {
    setEventTitle(event.target.value);
  };
  const handleDescriptionInput = (event) => {
    setEventDescription(event.target.value);
  };
  const showDatePicker = (event) => {
    event.target.previousElementSibling.showPicker();
  };
  const handleDateInput = (event) => {
    setEventDay(new Date(event.target.value));
  };
  const showTimePicker = (event) => {
    event.target.previousElementSibling.showPicker();
  };
  const handleStartTimeInput = (event) => {
    setEventStartTime(setTimeFormat([event.target.value, eventEndTime])[0]);
  };
  const handleEndTimeInput = (event) => {
    setEventEndTime(setTimeFormat([eventStartTime, event.target.value])[1]);
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={closeModal}>
            <img
              className="create-event__img"
              src="https://img.icons8.com/material-outlined/18/5f6368/delete-sign.png"
            />
          </button>
          <form className="event-form" onSubmit={onSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field event-form__field_title"
              value={eventTitle}
              onChange={handleTitleInput}
            />
            <div className="event-form__shield event-form__shield_title"></div>
            <div className="event-form__time">
              <i className="far fa-clock"></i>

              <label className="event-form__field event-form__field_date">
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
              <label className="event-form__field_start-time">
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

              <label className="event-form__field event-form__field_end-time">
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
            </div>
            <i className="fas fa-align-left"></i>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field event-form__field_description"
              value={eventDescription}
              onChange={handleDescriptionInput}
            ></textarea>
            <div className="event-form__shield event-form__shield_description"></div>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
