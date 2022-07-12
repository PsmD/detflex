const today = new Date();

const year = today.getFullYear();
const nextyear = today.getFullYear() + 1;
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const prevmonth = ("0" + today.getMonth()).slice(-2);
const date = ("0" + today.getDate()).slice(-2);
const hours = ("0" + today.getHours()).slice(-2);
const minutes = ("0" + today.getMinutes()).slice(-2);

export const currentday = year + "-" + month + "-" + date;
export const currentTime = year + "." + month + "." + date + "." + " " + hours + ":" + minutes;
export const prevmonthday = year + "-" + prevmonth + "-" + date;
export const nextyearday = nextyear + "-" + month + "-" + date;
