import React from "react";
import propTypes from "prop-types";

import { getDisplayedMonth } from "../../utils/dateUtils.js";
import "./header.scss";
import IconButton from "../iconButton/IconButton.jsx";

const Header = ({
  prevWeek,
  comingWeek,
  currentWeek,
  weekStartDate,
  callModal,
}) => {
  return (
    <header className="header">
      <button className="button create-event-btn">
        <svg width="36" height="36" viewBox="0 0 36 36">
          <path fill="#34A853" d="M16 16v14h4V20z"></path>
          <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
          <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
          <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
          <path fill="none" d="M0 0h36v36H0z"></path>
        </svg>
        <span className="create-event-btn__txt" onClick={callModal}>
          Create
        </span>
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={currentWeek}>
          Today
        </button>
        <IconButton
          icon={<i className="fas fa-chevron-left"></i>}
          onClick={prevWeek}
          style={{
            fontSize: 16,
          }}
        />
        <IconButton
          icon={<i className="fas fa-chevron-right"></i>}
          onClick={comingWeek}
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
  prevWeek: propTypes.func.isRequired,
  comingWeek: propTypes.func.isRequired,
  currentWeek: propTypes.func.isRequired,
  weekStartDate: propTypes.instanceOf(Date).isRequired,
  callModal: propTypes.func.isRequired,
};

export default Header;
