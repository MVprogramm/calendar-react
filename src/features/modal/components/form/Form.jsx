import React from "react";
import propTypes from "prop-types";
import TitleInput from "./components/titleInput/TitleInput";
import DateInput from "./components/dateInput/DateInput";
import TimeInput from "./components/timeInput/TimeInput";
import DescriptionInput from "./components/descriptionInput/DescriptionInput";
import Submit from "./components/submit/Submit";
import "./form.scss";

const Form = ({ isModal, onSubmit, eventData, setEventData }) => {
  return (
    <form className="event-form" onSubmit={onSubmit}>
      <TitleInput
        isModal={isModal}
        eventData={eventData}
        setEventData={setEventData}
      />
      <div className="event-form__time">
        <i className="far fa-clock"></i>
        <DateInput
          isModal={isModal}
          eventData={eventData}
          setEventData={setEventData}
        />
        <TimeInput
          isModal={isModal}
          eventData={eventData}
          setEventData={setEventData}
        />
      </div>
      <i className="fas fa-align-left"></i>
      <DescriptionInput
        isModal={isModal}
        eventData={eventData}
        setEventData={setEventData}
      />
      <Submit isModal={isModal} eventData={eventData} />
    </form>
  );
};

Form.propTypes = {
  isModal: propTypes.oneOf(["", "create", "control", "delete", "edit"])
    .isRequired,
  onSubmit: propTypes.func.isRequired,
  eventData: propTypes.object.isRequired,
  setEventData: propTypes.func.isRequired,
};

export default Form;
