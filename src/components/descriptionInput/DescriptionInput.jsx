import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import "./descriptionInput.scss";

const DescriptionInput = ({ isModal, eventData, setEventData }) => {
  const { description, done } = eventData;
  const handleDescriptionInput = (event) => {
    setEventData({
      ...eventData,
      description: event.target.value,
    });
  };

  return (
    <>
      <textarea
        name="description"
        placeholder="Description"
        readOnly={isModal === "control" || isModal === "delete"}
        className={classNames(
          "event-form__field event-form__field_description",
          {
            "event-form__field_done": done,
            "event-form__field_edit":
              isModal === "create" || isModal === "edit",
            "event-form__field_delete": isModal === "delete",
          }
        )}
        value={description}
        onChange={handleDescriptionInput}
      ></textarea>
      <div
        className={classNames(
          "event-form__shield event-form__shield_description",
          {
            "event-form__shield_hover":
              isModal === "create" || isModal === "edit",
          }
        )}
      ></div>
    </>
  );
};

DescriptionInput.propTypes = {
  isModal: propTypes.oneOf(["", "create", "control", "delete", "edit"])
    .isRequired,
  eventData: propTypes.object.isRequired,
  setEventData: propTypes.func.isRequired,
};

export default DescriptionInput;
