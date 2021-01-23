import { useEffect, useState } from "react";
import GetDailyWeather from "../api/GetDailyWeather";
import HandleCurrentWeather from "./HandleCurrentWeather";
import HandleDayCycle from "./HandleDayCycle";
import handleLocalTime from "./handleLocalTime";
import handleDailyWeather from './handleDailyWeather';
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
            handleDailyWeather(responseDailyWeather, timeZoneInSec)
          );
        }
      } catch (error) {
        setIsSubmitted(false);

        setErrors({
          city: "City not found",
        });
      }
    }

    handleWeatherApi(city);
  }, [errors, currentPosition]);

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
    setIsSubmitted
  };
};

export default UseSearchForm;
