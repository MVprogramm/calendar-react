import React from "react";
import propTypes from "prop-types";
import "./submit.scss";

const Submit = ({ isModal, eventData }) => {
  const { done } = eventData;
  return (
    <button type="submit" className="submit-btn">
      {isModal === "create" && "Create"}
      {isModal === "control" && done && "Not done"}
      {isModal === "control" && !done && "Done"}
      {isModal === "delete" && "Delete"}
      {isModal === "edit" && "Save"}
    </button>
  );
};

Submit.propTypes = {
  isModal: propTypes.oneOf(["", "create", "control", "delete", "edit"])
    .isRequired,
  eventData: propTypes.object.isRequired,
};

export default Submit;
