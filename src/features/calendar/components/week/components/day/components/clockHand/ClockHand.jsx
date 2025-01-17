import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import "./clockHand.scss";

const ClockHand = ({ dataDay, slotHeight }) => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [currentTime]);

  const startTime = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).getTime();

  const { height } = slotHeight;
  const timeScale = 60 * (60 / height) * 1000;
  const topLine = Math.round((currentTime - startTime - 100000) / timeScale);

  if (startTime !== new Date(dataDay).getTime()) return null;
  return (
    <div className="clock clock__line" style={{ top: topLine }}>
      <div className="clock clock__circle"></div>
    </div>
  );
};

ClockHand.propTypes = {
  dataDay: propTypes.instanceOf(Date).isRequired,
  slotHeight: propTypes.object.isRequired,
};

export default ClockHand;
