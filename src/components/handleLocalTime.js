import addZero from './addZero';

const days = {0 : 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday'}

export default function handleLocalTime(timeZoneInSec) {
    const timeZoneInMiliSec = timeZoneInSec * 1000;
    const date = new Date();
    const localTime = new Date(date.valueOf() + (timeZoneInMiliSec));
    const localDay = localTime.getUTCDate();
    const localMonth = localTime.getUTCMonth();
    const localYear = localTime.getUTCFullYear();
    const dayOfWeek = days[localTime.getUTCDay()]
    const localHour = addZero(localTime.getUTCHours());
    const localMinutes = addZero(localTime.getUTCMinutes());

    const nextDay = new Date(localTime);
    nextDay.setDate(nextDay.getDate() + 3);

    return {day: localDay, month: localMonth, year: localYear, dayOfWeek: dayOfWeek, localHour: localHour, localMinutes: localMinutes}
}