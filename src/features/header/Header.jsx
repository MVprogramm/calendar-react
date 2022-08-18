import React from "react";
import propTypes from "prop-types";
import IconButton from "./components/iconButton/IconButton.jsx";
import { getDisplayedMonth } from "../../utils/dateUtils.js";
import { createBtnImg } from "./img.jsx";
import "./header.scss";

const Header = ({ changeWeek, weekStartDate, callModal }) => {
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={callModal}>
        {createBtnImg()}
        <span className="create-event-btn__txt">Create</span>
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={() => changeWeek(0)}
        >
          Today
        </button>
        <IconButton
          icon={<i className="fas fa-chevron-left"></i>}
          onClick={() => changeWeek(-1)}
          style={{
            fontSize: 16,
          }}
        />
        <IconButton
          icon={<i className="fas fa-chevron-right"></i>}
          onClick={() => changeWeek(1)}
          style={{
            fontSize: 16,
          }}
        />
        <span className="navigation__displayed-month">
          {getDisplayedMonth(weekStartDate)}
        </span>
      </div>
    </header>
  );
};

Header.propTypes = {
  changeWeek: propTypes.func.isRequired,
  weekStartDate: propTypes.instanceOf(Date).isRequired,
  callModal: propTypes.func.isRequired,
};

export default Header;
