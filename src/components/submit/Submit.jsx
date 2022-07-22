import React from "react";
import propTypes from "prop-types";
import "./submit.scss";

const Submit = ({ isModal, eventDone }) => {
  return (
    <button type="submit" className="submit-btn">
      {isModal === "create" && "Create"}
      {isModal === "control" && eventDone && "Not done"}
      {isModal === "control" && !eventDone && "Done"}
      {isModal === "delete" && "Delete"}
      {isModal === "edit" && "Save"}
    </button>
  );
};

Submit.propTypes = {
  isModal: propTypes.oneOf(["", "create", "control", "delete", "edit"])
    .isRequired,
  eventDone: propTypes.bool.isRequired,
};

export default Submit;
