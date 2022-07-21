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
  getEvent,
  updateEvent,
  deleteEvent,
} from "./gateway/gateway";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isModal, setModalStatus] = useState("");
  const [eventID, setEventID] = useState(0);
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
  const [eventDone, setEventDone] = useState(false);
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

    const currentEvent = {
      id: eventID,
      title: eventTitle ? eventTitle : "(no title)",
      description: eventDescription,
      dateFrom: `${new Date(eventDay).getFullYear()}-${
        new Date(eventDay).getMonth() + 1
      }-${new Date(eventDay).getDate()} ${eventStartTime}`,
      dateTo: `${new Date(eventDay).getFullYear()}-${
        new Date(eventDay).getMonth() + 1
      }-${new Date(eventDay).getDate()} ${eventEndTime}`,
      done: isModal === "control" ? !eventDone : eventDone,
    };

    if (isModal === "create") {
      const dateFromTime = new Date(currentEvent.dateFrom).getTime();
      const dateToTime = new Date(currentEvent.dateTo).getTime();

      if (
        eventsList.some(
          (event) =>
            (dateFromTime >= new Date(event.dateFrom).getTime() &&
              dateFromTime <= new Date(event.dateTo).getTime()) ||
            (dateToTime >= new Date(event.dateFrom).getTime() &&
              dateToTime <= new Date(event.dateTo).getTime()) ||
            (dateFromTime <= new Date(event.dateTo).getTime() &&
              dateToTime >= new Date(event.dateFrom).getTime())
        )
      ) {
        alert("This interval overlaps another event");
      } else {
        closeModal();
        createEvent(currentEvent).then(() => fetchEvents());
      }
    }

    if (isModal === "delete") {
      closeModal();
      deleteEvent(currentEvent.id).then(() => fetchEvents());
    }

    if (isModal === "edit") {
      closeModal();
      updateEvent(currentEvent.id, currentEvent).then(() => fetchEvents());
    }

    if (isModal === "control") {
      closeModal();
      updateEvent(currentEvent.id, currentEvent).then(() => fetchEvents());
    }
  };

  const favicon = document.querySelector("#favicon");
  favicon.href = `https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_${new Date().getDate()}.ico`;

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
  const setEvent = (event) => {
    setEventID(event.id);
    setEventTitle(event.title);
    setEventDay(new Date(event.dateFrom));
    setEventStartTime(getFormattedHours(new Date(event.dateFrom)));
    setEventEndTime(getFormattedHours(new Date(event.dateTo)));
    setEventDescription(event.description);
    setEventDone(event.done);
  };

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

      setModalStatus("create");
    }

    if (event.target.className === "create-event-btn__txt") {
      setEventDay(new Date(new Date().getTime() + 1000 * 60 * 60));
      setModalStatus("create");
    }

    if (event.target.className === "event") {
      getEvent(event.target.dataset.id)
        .then((event) => {
          setEvent(event);

          return event;
        })
        .then((event) => {
          setModalStatus("control");
        });
    }

    if (
      event.target.className === "event__title" ||
      event.target.className === "event__time"
    ) {
      getEvent(event.target.offsetParent.dataset.id)
        .then((event) => {
          setEvent(event);

          return event;
        })
        .then((event) => {
          setModalStatus("control");
        });
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
          isModal={isModal}
          setModalStatus={setModalStatus}
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
          setEventDone={setEventDone}
          eventDone={eventDone}
        />
      )}
    </>
  );
};

export default App;
