import React, { useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";

import {
  getWeekStartDate,
  generateWeekRange,
  getTimeInterval,
} from "../src/utils/dateUtils.js";

import "./common.scss";
import Modal from "./components/modal/Modal.jsx";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isModal, setModalStatus] = useState(false);
  const [eventDay, setEventDay] = useState(
    new Date(new Date().getTime() + 1000 * 60 * 60)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWeekStartDate(new Date());
    }, 1000 * 60 * 60 * 24);

    return () => clearInterval(interval);
  }, [weekStartDate]);

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

  const callModal = (event) => {
    if (event.target.className === "calendar__time-slot") {
      setEventDay(
        new Date(
          new Date(weekStartDate).getFullYear(),
          new Date(weekStartDate).getMonth(),
          event.target.offsetParent.dataset.day,
          event.target.dataset.time
        )
      );

      setModalStatus(true);
    }

    if (event.target.className === "create-event-btn__txt") {
      setEventDay(new Date(new Date().getTime() + 1000 * 60 * 60));
      setModalStatus(true);
    }
  };

  const closeModal = (event) => {
    setModalStatus(false);
  };

  return (
    <>
      <Header
        prevWeek={prevWeek}
        comingWeek={comingWeek}
        currentWeek={currentWeek}
        weekStartDate={weekStartDate}
        callModal={callModal}
      />
      <Calendar weekDates={weekDates} callModal={callModal} />
      {isModal && <Modal closeModal={closeModal} eventDay={eventDay} />}
    </>
  );
};

export default App;
