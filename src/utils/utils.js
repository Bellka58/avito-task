import { ITEMS_ON_PAGE } from "../constants/constants";

export function getFullDateString ( dateString ) {
    const date = new Date(dateString);
    const year = date.getFullYear();

    let day = date.getDate();
    day = day < 10 ? `0${day}` : `${day}`;

    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : `${month}`;

    const fullDate = `${day}.${month}.${year}`;
    return fullDate;
}

export function getShortNumber (number) {
    if (+number >= 1e6) {
      return (number / 1e6).toFixed(1) + "m";
    }
    if (+number >= 1000) {
        return (number/1000).toFixed(1) + 'k'
    }
    return (number)
}; 

export function checkTotalCount (totalCount) {
    if (totalCount > 100) {
      return ITEMS_ON_PAGE;
    } else {
      return Math.ceil(totalCount / ITEMS_ON_PAGE);
    }
}; 