import React from "react";
import propTypes from "prop-types";
import Menu from "./components/menu/Menu.jsx";
import Form from "./components/form/Form";
import "./modal.scss";

const Modal = ({
  isModal,
  setModalStatus,
  onSubmit,
  eventData,
  setEventData,
}) => {
  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <Menu isModal={isModal} setModalStatus={setModalStatus} />
          <Form
            isModal={isModal}
            onSubmit={onSubmit}
            eventData={eventData}
            setEventData={setEventData}
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
  onSubmit: propTypes.func.isRequired,
  eventData: propTypes.object.isRequired,
  setEventData: propTypes.func.isRequired,
};

export default Modal;
