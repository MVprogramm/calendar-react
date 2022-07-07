import React, { useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";

import {
  getWeekStartDate,
  generateWeekRange,
  getTimeInterval,
} from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const weekTime = getTimeInterval(7);

  const favicon = document.querySelector("#favicon");
  favicon.href = `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${weekStartDate.getDate()}.ico`;

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const prevWeek = () => {
    const lastWeek = new Date(new Date(weekStartDate).getTime() - weekTime);
    setWeekStartDate(lastWeek);
  };

  const comingWeek = () => {
    const nextWeek = new Date(new Date(weekStartDate).getTime() + weekTime);
    setWeekStartDate(nextWeek);
  };

  const currentWeek = () => {
    setWeekStartDate(new Date());
  };

  return (
    <>
      <Header
        prevWeek={prevWeek}
        comingWeek={comingWeek}
        currentWeek={currentWeek}
        weekStartDate={weekStartDate}
      />
      <Calendar weekDates={weekDates} />
    </>
  );
};

export default App;
