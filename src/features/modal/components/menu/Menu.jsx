import React from "react";
import propTypes from "prop-types";
import IconButton from "../../../header/components/iconButton/IconButton.jsx";
import "./menu.scss";

const Menu = ({ isModal, setModalStatus }) => {
  return (
    <div className="menu">
      {isModal === "control" && (
        <>
          <IconButton
            icon={
              <img src="https://img.icons8.com/material-outlined/18/5f6368/edit.png" />
            }
            onClick={() => setModalStatus("edit")}
          />
          <IconButton
            icon={
              <img src="https://img.icons8.com/material-outlined/18/5f6368/delete.png" />
            }
            onClick={() => setModalStatus("delete")}
          />
        </>
      )}
      <IconButton
        icon={
          <img src="https://img.icons8.com/material-outlined/18/5f6368/delete-sign.png" />
        }
        onClick={() => setModalStatus(false)}
      />
    </div>
  );
};

Menu.propTypes = {
  isModal: propTypes.oneOf(["", "create", "control", "delete", "edit"])
    .isRequired,
  setModalStatus: propTypes.func.isRequired,
};

export default Menu;
