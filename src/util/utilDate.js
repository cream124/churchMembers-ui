import dayjs from "dayjs";
const format = 'DD/MM/YYYY';
const systemFormat = 'DD-MM-YYYY';
const timeFormat = 'HH:mm';

// get a string and convert it to camelCase
export function getAge(birthDate) {
    const age = parseInt(dayjs().diff(dayjs(birthDate), 'year'));
    return age;
}

// **
//  * 
//  * @param  birthDate  in ISO format as "2024-05-02T04:00:00.000Z"
//  * @returns Age in Int format
//  */
export function getPrintDate(date) {
    const newDate = dayjs(date).format(format);
    return newDate;
}

export function getCurrentDate() {
    return  dayjs().format(systemFormat);
    // return newDate;
}

export function getPrintTime(date) {
    const newDate = dayjs(date).format(timeFormat);
    return newDate;
}

export function getCurrentDateISO() {
    const newDate = dayjs().format();
    return newDate;
}