import React from "react";
import propTypes from "prop-types";
import IconButton from "../iconButton/IconButton";
import "./menu.scss";

const Menu = ({ closeModal, isModal, setModalStatus }) => {
  const handleClickEdit = () => {
    setModalStatus("edit");
  };
  const handleClickDelete = () => {
    setModalStatus("delete");
  };

  return (
    <div className="menu">
      {isModal === "control" && (
        <>
          <IconButton
            icon={
              <img src="https://img.icons8.com/material-outlined/18/5f6368/edit.png" />
            }
            onClick={handleClickEdit}
          />
          <IconButton
            icon={
              <img src="https://img.icons8.com/material-outlined/18/5f6368/delete.png" />
            }
            onClick={handleClickDelete}
          />
        </>
      )}
      <IconButton
        icon={
          <img src="https://img.icons8.com/material-outlined/18/5f6368/delete-sign.png" />
        }
        onClick={closeModal}
      />
    </div>
  );
};

Menu.propTypes = {
  closeModal: propTypes.func.isRequired,
  isModal: propTypes.oneOf(["", "create", "control", "delete", "edit"])
    .isRequired,
  setModalStatus: propTypes.func.isRequired,
};

export default Menu;
