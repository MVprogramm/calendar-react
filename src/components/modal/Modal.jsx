import React from "react";
import propTypes from "prop-types";
import Menu from "../menu/Menu";
import Form from "../form/Form";
import "./modal.scss";

const Modal = ({
  isModal,
  setModalStatus,
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
  eventDone,
  setEventDone,
}) => {
  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <Menu
            closeModal={closeModal}
            isModal={isModal}
            setModalStatus={setModalStatus}
          />
          <Form
            isModal={isModal}
            onSubmit={onSubmit}
            eventTitle={eventTitle}
            setEventTitle={setEventTitle}
            eventDay={eventDay}
            setEventDay={setEventDay}
            eventStartTime={eventStartTime}
            setEventStartTime={setEventStartTime}
            eventEndTime={eventEndTime}
            setEventEndTime={setEventEndTime}
            eventDescription={eventDescription}
            setEventDescription={setEventDescription}
            eventDone={eventDone}
            setEventDone={setEventDone}
          />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isModal: propTypes.oneOf(["", "create", "control", "delete", "edit"])
    .isRequired,
  setModalStatus: propTypes.func.isRequired,
  closeModal: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  eventDay: propTypes.instanceOf(Date).isRequired,
  setEventDay: propTypes.func.isRequired,
  eventTitle: propTypes.string.isRequired,
  setEventTitle: propTypes.func.isRequired,
  eventStartTime: propTypes.string.isRequired,
  setEventStartTime: propTypes.func.isRequired,
  eventEndTime: propTypes.string.isRequired,
  setEventEndTime: propTypes.func.isRequired,
  eventDescription: propTypes.string.isRequired,
  setEventDescription: propTypes.func.isRequired,
  eventDone: propTypes.bool.isRequired,
  setEventDone: propTypes.func.isRequired,
};

export default Modal;
