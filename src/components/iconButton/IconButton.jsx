import React from "react";
import propTypes from "prop-types";

import "./iconButton.scss";

const IconButton = ({ icon, onClick, style }) => {
  return (
    <button className="icon-button" style={style} onClick={onClick}>
      {icon}
      <div className="icon-button__circle"></div>
    </button>
  );
};

IconButton.propTypes = {
  icon: propTypes.element.isRequired,
  onClick: propTypes.func.isRequired,
  style: propTypes.object,
};

export default IconButton;
