const getTwoNumbersString = (num) => {
  const twoNumbersString = num < 10 ? "0" + num : "" + num;
  return twoNumbersString;
};

export const getTimeInterval = (days) => 1000 * 60 * 60 * 24 * days;

export const getWeekStartDate = (date) => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(":");
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const formatMins = (mins) => {
  return mins < 10 ? `0${mins}` : mins;
};

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getDisplayedMonth = (date) => {
  const monthsNames = months.map((month) => month.slice(0, 3));
  const weekStart = getWeekStartDate(date);
  const weekEnd = new Date(new Date(weekStart).getTime() + getTimeInterval(6));
  const startMonth = weekStart.getMonth();
  const startYear = weekStart.getFullYear();
  const endMonth = weekEnd.getMonth();
  const endYear = weekEnd.getFullYear();
  const isSameMonth = startMonth === endMonth;
  if (isSameMonth) {
    return `${monthsNames[startMonth]} ${startYear}`;
  }
  const isSameYear = startYear === endYear;
  return isSameYear
    ? `${monthsNames[startMonth]} - ${monthsNames[endMonth]} ${startYear}`
    : `${monthsNames[startMonth]} ${startYear} - ${monthsNames[endMonth]} ${endYear}`;
};

export const getFormattedDate = (date) => {
  return `${getTwoNumbersString(date.getDate())} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const getFormattedHours = (date) => {
  return `${getTwoNumbersString(date.getHours())}:${getTwoNumbersString(
    date.getMinutes()
  )}`;
};

export const setTimeFormat = ([startTime, endTime]) => {
  let startHour = startTime.split(":").map((el) => +el)[0];
  let startMinute = startTime.split(":").map((el) => +el)[1];
  let endHour = endTime.split(":").map((el) => +el)[0];
  let endMinute = endTime.split(":").map((el) => +el)[1];

  if (endHour < startHour) endHour = startHour;
  if (endHour - startHour > 6) endHour = startHour + 6;

  startMinute = Math.round(startMinute / 15) * 15;
  endMinute = Math.round(endMinute / 15) * 15;

  if (startMinute === 60) {
    startHour++;
    startMinute = 0;
  }
  if (endMinute === 60) {
    endHour++;
    endMinute = 0;
  }

  if (endHour === startHour && startMinute < 30 && endMinute < startMinute + 30)
    endMinute = startMinute + 30;
  if (endHour === startHour && startMinute >= 30) endHour = startHour + 1;
  if (endHour === startHour + 1 && startMinute === 45 && endMinute === 0)
    endMinute = 15;
  if (startHour === 23 && startMinute >= 30) {
    startMinute = 30;
    endHour = 24;
    endMinute = 0;
  }

  return [
    `${getTwoNumbersString(startHour)}:${getTwoNumbersString(startMinute)}`,
    `${getTwoNumbersString(endHour)}:${getTwoNumbersString(endMinute)}`,
  ];
};
