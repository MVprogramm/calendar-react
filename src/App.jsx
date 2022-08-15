import React, { useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import Modal from "./components/modal/Modal.jsx";
import * as getDate from "../src/utils/dateUtils.js";
import * as gateWay from "./gateway/gateway";
import * as getEvent from "../src/utils/eventUtils.js";
import "./common.scss";

const App = () => {
  const favicon = document.querySelector("#favicon");
  favicon.href = `${gateWay.faviconURL}${new Date().getDate()}.ico`;

  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isModal, setModalStatus] = useState("");
  const [eventData, setEventData] = useState(getEvent.initialState());
  const [eventsList, setEventList] = useState([]);

  const fetchEvents = () =>
    gateWay.fetchEventsList().then((events) => setEventList(events));
  useEffect(() => {
    const interval = setInterval(() => {
      setWeekStartDate(new Date());
    }, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, [weekStartDate]);
  useEffect(() => {
    fetchEvents();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    getEvent
      .sendEvent(eventData, eventsList, isModal)
      .then(() => fetchEvents());

    setModalStatus(false);
  };

  const weekTime = getDate.getDaysInterval(7);
  const weekDates = getDate.generateWeekRange(
    getDate.getWeekStartDate(weekStartDate)
  );

  const changeWeek = (nav) => {
    const targetWeek =
      nav === 0
        ? new Date()
        : new Date(new Date(weekStartDate).getTime() + nav * weekTime);
    setWeekStartDate(targetWeek);
  };

  const callModal = (event) =>
    getEvent.builtStateFromEvent(event, weekStartDate).then((res) => {
      setEventData(res[0]);
      setModalStatus(res[1]);
    });

  return (
    <>
      <Header
        changeWeek={changeWeek}
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
          eventData={eventData}
          setEventData={setEventData}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

export default App;
