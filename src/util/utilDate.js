import dayjs from "dayjs";

// get a string and convert it to camelCase
export function getAge(birthDate) {
    const now = dayjs();
    const dif = now.diff(birthDate, 'year')
    return dif;
}
