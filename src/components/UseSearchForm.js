import React, { useEffect, useState } from "react";
import GetCurrentWeatherbyCity from "../api/GetCurrentWeather";
import GetDailyWeather from "../api/GetDailyWeather";
import HandleCurrentWeather from "./HandleCurrentWeather";
import fromCalvinToCelsius from "./fromCalvinToCelsius";
import HandleDayCycle from "./HandleDayCycle";
import handleLocalTime from "./handleLocalTime";
import addZero from "./addZero";
// import GetCurrentWeatherByCity from "../api/GetCurrentWeather";
import CurrentWeatherService from "../api/CurrentWeatherSevice";

const UseSearchForm = () => {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(null);
  const [dailyWeather, setDailyWeather] = useState();
  const [dayCycle, setDayCycle] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");

  function handleChange(e) {
    setCity(e.target.value);
  }

  useEffect(() => {
    async function handleWeatherApi(city) {
      try {
        if (Object.keys(errors).length === 0 && isSubmitting) {
          let responseCurrentWeather = "";
          if (city) {
            responseCurrentWeather = await CurrentWeatherService.getCurrentWeatherByCity(
              city
            );
          } else {
            responseCurrentWeather = await CurrentWeatherService.getCurrentWeatherByLocalization(
              currentPosition.lon,
              currentPosition.lat
            );
          }
          HandleCurrentWeather(responseCurrentWeather, setCurrentWeather);
          const timeZoneInSec = responseCurrentWeather.data.timezone;
          const lon = responseCurrentWeather.data.coord.lon;
          const lat = responseCurrentWeather.data.coord.lat;
          setLocalTime(handleLocalTime(timeZoneInSec));
          const responseDailyWeather = await GetDailyWeather(lon, lat);
          HandleDayCycle(responseCurrentWeather, setDayCycle, lon, lat);

          setIsSubmitting(false);
          setIsSubmitted(true);

          setDailyWeather(
            getFullDailyWeather(responseDailyWeather, timeZoneInSec)
          );
        }
      } catch (error) {
        setErrors({
          city: "Do not find this city",
        });
      }
    }

    handleWeatherApi(city);
  }, [errors, currentPosition]);

  function getFullDailyWeather(responseDailyWeather, timeZoneInSec) {
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

  return {
    city,
    currentWeather,
    dailyWeather,
    errors,
    isSubmitting,
    isSubmitted,
    dayCycle,
    localTime,
    handleChange,
    setIsSubmitting,
    setErrors,
    setCity,
    setCurrentPosition,
  };
};

export default UseSearchForm;
