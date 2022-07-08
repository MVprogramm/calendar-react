import React from "react";
import classNames from "classnames";

import { days } from "../../utils/dateUtils.js";

const Navigation = ({ weekDates }) => {
  let isToday = false;
  let gmt = new Date().getTimezoneOffset() / 60;
  let offset = gmt > 0 ? "-" : "+";
  const dayToday = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ).getTime();
  return (
    <header className="calendar__header">
      <div className="calendar__gmt">{`GMT ${offset}${Math.abs(gmt)}`}</div>
      {weekDates.map((dayDate) => {
        dayToday === dayDate.getTime() ? (isToday = true) : (isToday = false);
        return (
          <div className="calendar__day-label day-label">
            <span
              className={classNames("day-label__day-name", {
                "day-label__day-name_today": isToday === true,
              })}
            >
              {days[dayDate.getDay()]}
            </span>
            <span
              className={classNames("day-label__day-number", {
                "day-label__day-number_today": isToday === true,
              })}
            >
              {dayDate.getDate()}
            </span>
            <div
              className={classNames("day-label__day-circle", {
                "day-label__day-circle_today": isToday === true,
              })}
            ></div>
            <div className="day-label__day-cell"></div>
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;
