import * as getDate from "./dateUtils.js";
import * as gateWay from "../gateway/gateway";

export const initialState = () => {
  return {
    id: 0,
    title: "",
    day: new Date(),
    start: getDate.getFormattedHours(new Date()),
    end: getDate.getFormattedHours(
      new Date(new Date().getTime() + 1000 * 60 * 60)
    ),
    description: "",
    done: false,
  };
};

export const convertStateToForm = (state) => {
  return {
    id: state.id,
    title: state.title ? state.title : "(no title)",
    description: state.description,
    dateFrom: getDate.getFormattedTime(state.day, state.start),
    dateTo: getDate.getFormattedTime(state.day, state.end),
    done: state.done,
  };
};

export const convertFormToState = (form) => {
  return {
    id: form.id,
    title: form.title === "(no title)" ? "" : form.title,
    day: new Date(form.dateFrom),
    start: getDate.getFormattedHours(new Date(form.dateFrom)),
    end: getDate.getFormattedHours(new Date(form.dateTo)),
    description: form.description,
    done: form.done,
  };
};

export const builtStateFromEvent = (event, currentDate) => {
  if (event.target.className === "calendar__time-slot")
    return Promise.resolve([
      {
        title: "",
        day: new Date(
          new Date(currentDate).getFullYear(),
          new Date(currentDate).getMonth(),
          event.target.offsetParent.dataset.day
        ),
        start: getDate.getFormattedHours(
          new Date(
            new Date(currentDate).getFullYear(),
            new Date(currentDate).getMonth(),
            event.target.offsetParent.dataset.day,
            event.target.dataset.time - 1
          )
        ),
        end: getDate.getFormattedHours(
          new Date(
            new Date(currentDate).getFullYear(),
            new Date(currentDate).getMonth(),
            event.target.offsetParent.dataset.day,
            event.target.dataset.time
          )
        ),
        description: "",
        done: false,
      },
      "create",
    ]);

  if (
    event.target.outerHTML.includes("create-event-btn") ||
    event.target.outerHTML.includes("svg")
  )
    return Promise.resolve([
      {
        title: "",
        day: new Date(),
        start: getDate.getFormattedHours(new Date()),
        end: getDate.getFormattedHours(
          new Date(new Date().getTime() + 1000 * 60 * 60)
        ),
        description: "",
        done: false,
      },
      "create",
    ]);

  if (event.target.className === "event")
    return gateWay
      .getEvent(event.target.dataset.id)
      .then((event) => [convertFormToState(event), "control"]);

  if (
    String(event.target.className).includes("event__title") ||
    String(event.target.className).includes("event__time")
  )
    return gateWay
      .getEvent(event.target.offsetParent.dataset.id)
      .then((event) => [convertFormToState(event), "control"]);
};

export const createNewEvent = (event, events) => {
  const dateFromTime = new Date(event.dateFrom).getTime();
  const dateToTime = new Date(event.dateTo).getTime();
  if (
    events.some(
      (eventData) =>
        (dateFromTime >= new Date(eventData.dateFrom).getTime() &&
          dateFromTime <= new Date(eventData.dateTo).getTime()) ||
        (dateToTime >= new Date(eventData.dateFrom).getTime() &&
          dateToTime <= new Date(eventData.dateTo).getTime()) ||
        (dateFromTime <= new Date(eventData.dateTo).getTime() &&
          dateToTime >= new Date(eventData.dateFrom).getTime())
    )
  ) {
    alert("This interval overlaps another event");
  } else {
    return gateWay.createEvent(event).then(() => gateWay.fetchEventsList());
  }
};

export const deleteCurrentEvent = (event) =>
  gateWay.deleteEvent(event.id).then(() => gateWay.fetchEventsList());

export const updateCurrentEvent = (event) =>
  gateWay.updateEvent(event.id, event).then(() => gateWay.fetchEventsList());

export const sendEvent = (eventData, eventsList, isModal) => {
  const currentEvent = convertStateToForm(eventData);
  if (isModal === "create") return createNewEvent(currentEvent, eventsList);
  if (isModal === "control") {
    currentEvent.done = !currentEvent.done;
    return updateCurrentEvent(currentEvent);
  }
  if (isModal === "delete") return deleteCurrentEvent(currentEvent);
  if (isModal === "edit") return updateCurrentEvent(currentEvent);
};
