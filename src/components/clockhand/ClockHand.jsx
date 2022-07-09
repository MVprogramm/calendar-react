import React, { useEffect, useState } from "react";

import "./clockhand.scss";

const ClockHand = ({ dataDay, slotHeight }) => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 36000);

    return clearInterval(interval);
  }, [currentTime]);

  const startTime = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).getTime();

  const { height } = slotHeight;
  const timeScale = 60 * (60 / height) * 1000;
  const topLine = Math.round((currentTime - startTime) / timeScale);

  if (new Date().getDate() !== dataDay) return null;
  return (
    <div className="clock clock__line" style={{ top: topLine }}>
      <div className="clock clock__circle"></div>
    </div>
  );
};

export default ClockHand;
