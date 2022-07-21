import React from "react";
import propTypes from "prop-types";

import TitleInput from "../titleInput/TitleInput";
import DateInput from "../dateInput/DateInput";
import TimeInput from "../timeInput/TimeInput";
import DescriptionInput from "../descriptionInput/DescriptionInput";
import Submit from "../submit/Submit";

import "./form.scss";

const Form = ({
  isModal,
  onSubmit,
  eventTitle,
  setEventTitle,
  eventDay,
  setEventDay,
  eventStartTime,
  setEventStartTime,
  eventEndTime,
  setEventEndTime,
  eventDescription,
  setEventDescription,
  eventDone,
  setEventDone,
}) => {
  return (
    <form className="event-form" onSubmit={onSubmit}>
      <TitleInput
        isModal={isModal}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        eventDone={eventDone}
      />
      <div className="event-form__time">
        <i className="far fa-clock"></i>
        <DateInput
          isModal={isModal}
          eventDay={eventDay}
          setEventDay={setEventDay}
          eventDone={eventDone}
        />
        <TimeInput
          isModal={isModal}
          eventStartTime={eventStartTime}
          setEventStartTime={setEventStartTime}
          eventEndTime={eventEndTime}
          setEventEndTime={setEventEndTime}
          eventDone={eventDone}
        />
      </div>
      <i className="fas fa-align-left"></i>
      <DescriptionInput
        isModal={isModal}
        eventDescription={eventDescription}
        setEventDescription={setEventDescription}
        eventDone={eventDone}
      />
      <Submit
        isModal={isModal}
        eventDone={eventDone}
        setEventDone={setEventDone}
      />
    </form>
  );
};

Form.propTypes = {
  isModal: propTypes.oneOf(["", "create", "control", "delete", "edit"])
    .isRequired,
  onSubmit: propTypes.func.isRequired,
  eventTitle: propTypes.string.isRequired,
  setEventTitle: propTypes.func.isRequired,
  eventDay: propTypes.instanceOf(Date).isRequired,
  setEventDay: propTypes.func.isRequired,
  eventStartTime: propTypes.string.isRequired,
  setEventStartTime: propTypes.func.isRequired,
  eventEndTime: propTypes.string.isRequired,
  setEventEndTime: propTypes.func.isRequired,
  eventDescription: propTypes.string.isRequired,
  setEventDescription: propTypes.func.isRequired,
  eventDone: propTypes.bool.isRequired,
  setEventDone: propTypes.func.isRequired,
};

export default Form;
