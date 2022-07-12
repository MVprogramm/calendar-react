import React from "react";
import { getFormattedDate, getFormattedHours } from "../../utils/dateUtils.js";

import "./modal.scss";

const Modal = ({ closeModal, eventDay }) => {
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
          <form className="event-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field event-form__field_title"
            />
            <div class="event-form__shield event-form__shield_title"></div>
            <div className="event-form__time">
              <i className="far fa-clock"></i>

              <label class="event-form__field event-form__field_date">
                <input type="date" id="date" name="date" />
                <span id="eventDay">{getFormattedDate(eventDay)}</span>
              </label>
              <label class="event-form__field_start-time">
                <input type="time" id="startTime" name="startTime" />
                <span id="eventStartTime">
                  {getFormattedHours(
                    new Date(eventDay.getTime() - 1000 * 60 * 60)
                  )}
                </span>
              </label>

              <span class="event-form__field_interval">-</span>

              <label class="event-form__field event-form__field_end-time">
                <input type="time" id="endTime" name="endTime" />
                <span id="eventEndTime">{getFormattedHours(eventDay)}</span>
              </label>
            </div>
            <i class="fas fa-align-left"></i>
            <textarea
              name="description"
              placeholder="Description"
              class="event-form__field event-form__field_description"
            ></textarea>
            <div class="event-form__shield event-form__shield_description"></div>
            <button
              type="submit"
              className="event-form__submit-btn"
              onClick={closeModal}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
