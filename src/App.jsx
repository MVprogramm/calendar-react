import React, { useEffect, useState } from "react";

import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import Modal from "./components/modal/Modal.jsx";

import {
  getWeekStartDate,
  generateWeekRange,
  getTimeInterval,
  getFormattedHours,
} from "../src/utils/dateUtils.js";
import {
  fetchEventsList,
  createEvent,
  updateEvent,
  deleteEvent,
} from "./gateway/gateway";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isModal, setModalStatus] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDay, setEventDay] = useState(
    new Date(new Date().getTime() + 1000 * 60 * 60)
  );
  const [eventStartTime, setEventStartTime] = useState(
    getFormattedHours(new Date())
  );
  const [eventEndTime, setEventEndTime] = useState(
    getFormattedHours(new Date(new Date().getTime() + 1000 * 60 * 60))
  );
  const [eventDescription, setEventDescription] = useState("");
  const [eventsList, setEventList] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWeekStartDate(new Date());
    }, 1000 * 60 * 60 * 24);

    return () => clearInterval(interval);
  }, [weekStartDate]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () =>
    fetchEventsList().then((events) => setEventList(events));

  const weekTime = getTimeInterval(7);

  const onSubmit = (event) => {
    event.preventDefault();
    closeModal();

    const currentEvent = {
      title: eventTitle,
      description: eventDescription,
      dateFrom: `${new Date(eventDay).getFullYear()}-${
        new Date(eventDay).getMonth() + 1
      }-${new Date(eventDay).getDate()} ${eventStartTime}`,
      dateTo: `${new Date(eventDay).getFullYear()}-${
        new Date(eventDay).getMonth() + 1
      }-${new Date(eventDay).getDate()} ${eventEndTime}`,
    };

    createEvent(currentEvent).then(() => fetchEvents());
  };

  const favicon = document.querySelector("#favicon");
  favicon.href = `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${new Date().getDate()}.ico`;

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
    setEventTitle("");
    setEventDescription("");
    if (event.target.className === "calendar__time-slot") {
      setEventDay(
        new Date(
          new Date(weekStartDate).getFullYear(),
          new Date(weekStartDate).getMonth(),
          event.target.offsetParent.dataset.day
        )
      );
      setEventStartTime(
        getFormattedHours(
          new Date(
            new Date(weekStartDate).getFullYear(),
            new Date(weekStartDate).getMonth(),
            event.target.offsetParent.dataset.day,
            event.target.dataset.time - 1
          )
        )
      );
      setEventEndTime(
        getFormattedHours(
          new Date(
            new Date(weekStartDate).getFullYear(),
            new Date(weekStartDate).getMonth(),
            event.target.offsetParent.dataset.day,
            event.target.dataset.time
          )
        )
      );

      setModalStatus(true);
    }

    if (event.target.className === "create-event-btn__txt") {
      setEventDay(new Date(new Date().getTime() + 1000 * 60 * 60));
      setModalStatus(true);
    }
  };

  const closeModal = () => {
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
      <Calendar
        weekDates={weekDates}
        callModal={callModal}
        eventsList={eventsList}
      />
      {isModal && (
        <Modal
          closeModal={closeModal}
          onSubmit={onSubmit}
          eventDay={eventDay}
          setEventDay={setEventDay}
          eventStartTime={eventStartTime}
          setEventStartTime={setEventStartTime}
          eventEndTime={eventEndTime}
          setEventEndTime={setEventEndTime}
          setEventTitle={setEventTitle}
          eventTitle={eventTitle}
          setEventDescription={setEventDescription}
          eventDescription={eventDescription}
        />
      )}
    </>
  );
};

export default App;
