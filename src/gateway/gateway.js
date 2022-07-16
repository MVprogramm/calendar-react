const baseURL = "https://6275fcfd15458100a6a9c207.mockapi.io/api/v1/calendar";

export const fetchEventsList = () => fetch(baseURL).then((res) => res.json());

export const createEvent = (eventData) =>
  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to create event");
    }
  });

export const updateTask = (eventId, eventData) =>
  fetch(`${baseURL}/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to update event");
    }
  });

export const deleteEvent = (eventId) =>
  fetch(`${baseURL}/${eventId}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to delete event");
    }
  });
