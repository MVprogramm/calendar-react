import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import "./titleInput.scss";

const TitleInput = ({ isModal, eventTitle, setEventTitle, eventDone }) => {
  const handleTitleInput = (event) => {
    setEventTitle(event.target.value);
  };
  return (
    <>
      <input
        type="text"
        name="title"
        placeholder="Title"
        readOnly={isModal === "control" || isModal === "delete"}
        className={classNames("event-form__field event-form__field_title", {
          "event-form__field_done": eventDone,
          "event-form__field_delete": isModal === "delete",
        })}
        value={eventTitle}
        onChange={handleTitleInput}
      />
      <div
        className={classNames("event-form__shield event-form__shield_title", {
          "event-form__shield_hover":
            isModal === "create" || isModal === "edit",
        })}
      ></div>
    </>
  );
};

TitleInput.propTypes = {
  isModal: propTypes.oneOf(["", "create", "control", "delete", "edit"])
    .isRequired,
  eventTitle: propTypes.string.isRequired,
  setEventTitle: propTypes.func.isRequired,
  eventDone: propTypes.bool.isRequired,
};

export default TitleInput;
