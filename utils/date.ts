import moment from "moment-timezone";

// const date = new Date(Date.UTC(2025, 2, 23, 2, 0, 0)); // Test with diff datesmonth is 0-indexed
export const now = moment.tz(new Date(), "America/New_York");
export const today = now.format("YYYY-MM-DD");
export const currentHour = now.hour();

// console.log("NOW", now);
// console.log("TODAY", today);
// console.log("CURRENT HOUR", currentHour);

export function formatDayOfWeek(dayOfWeek: number) {
  switch (dayOfWeek) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}

export function formatMonth(month: number) {
  switch (month) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
  }
}

/**
 * Format a date string into a Day, Month.Date format
 * @param dateString dateString in the format YYYY-MM-DD
 * @returns formatted date string (e.g. "Monday, Mar. 24")
 */
export function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return `${formatDayOfWeek(date.getDay())}, ${formatMonth(
    date.getMonth()
  )}. ${date.getDate()}`;
}
