import fromCalvinToCelsius from './fromCalvinToCelsius';
import addZero from './addZero';

export default function handleDailyWeather(responseDailyWeather, timeZoneInSec) {
    const timeZoneInMiliSec = timeZoneInSec * 1000;
    const date = new Date();
    const localTime = new Date(date.valueOf() + timeZoneInMiliSec);

    function handleNextDay(indexNextDay) {
      const nextDay = new Date(localTime);
      nextDay.setDate(nextDay.getDate() + indexNextDay + 1);
      return {
        day: addZero(nextDay.getUTCDate()),
        month: addZero(nextDay.getUTCMonth() + 1),
      };
    }

    const nextFourDays = responseDailyWeather.data.daily
      .slice(1, 5)
      .map((item) => item);
    const nextFourDaysTemp = nextFourDays.map((day) => {
      return { temp: fromCalvinToCelsius(day.temp.day) };
    });
    const nextFourDaysClouds = nextFourDays.map((day) => {
      return { description: day.weather[0].description };
    });
    const nextDayDate = nextFourDays.map((day, index) => {
      return { date: handleNextDay(index) };
    });
    const fullDailyWeather = nextFourDaysTemp.map((day, index) => {
      return Object.assign(
        {},
        day,
        nextFourDaysClouds[index],
        nextDayDate[index]
      );
    });
    return fullDailyWeather;
}