import React, { useEffect, useState, useRef } from "react";
import UseSearchForm from "./components/UseSearchForm";
import validateInfo from "./components/ValidateInfo";
import "./App.css";
import "./AppMaxWidth800.css";
import "./AppMaxWidth560.css";
import startBackround from "./images/tlo_1.svg";
import dayImage from "./images/day1.svg";
import nightImage from "./images/night2.svg";
import eveningImage from "./images/evening1.svg";
import morningImage from "./images/morning1.svg";
import CurrentWeatherComponent from "./components/CurrentWeather";
import SingleDayComponent from "./components/SingleDayComponent";
import SwitchBtn from "./components/SwitchBtn";
import PopUp from "./components/PopUp";
import LoadingComponent from "./components/LoadingComponent";
import dayWithoutClouds from "./images/dayWithoutClouds.svg";
import humidityIcon from './images/weatherIcons/clearHuminility.svg';
import humadityDesktop from './images/weatherIcons/humadityDesktop.svg'
import windIcon from './images/weatherIcons/clearWind.svg';
import windDesktop from './images/weatherIcons/windDesktop.svg';

function App() {
  const formHeightRef = useRef(null);

  const {
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
    setCurrentPosition,
    setIsSubmitted
  } = UseSearchForm();

  const [isCelsius, setIsCelsius] = useState(true);
  const [showPopUp, setShowPopUp] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [formHeight, setFormHeight] = useState("");
  const [firstHeight, setFirstHeight] = useState("");
  document.body.style.height = `${windowHeight}px`;
  document.body.style.minHeight = `${windowHeight}px`;
  document.body.style.maxHeight = `${windowHeight}px`;

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
      formHeightRef.current &&
        setFormHeight(formHeightRef.current.clientHeight);
    window.addEventListener("resize", handleResize);
  }, [isSubmitted]);

  useEffect(() => {
    setFirstHeight(window.innerHeight);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validateInfo(city, setIsSubmitted));
    setIsSubmitting(true);
  }

  function renderBackground() {
    if (dayCycle === "day") {
      return windowWidth > 560 ? dayImage : dayWithoutClouds;
    } else if (dayCycle === "night") {
      return nightImage;
    } else if (dayCycle === "evening") {
      return eveningImage;
    } else if (dayCycle === "morning") {
      return morningImage;
    }

    return startBackround;
  }

  return (
    <>
      <div
        className="app-container"
        style={
          isSubmitted && !isSubmitting
            ? { position: "relative" }
            : { position: "static" }
        }
      >
        {showPopUp && (
          <PopUp
            setIsSubmitting={setIsSubmitting}
            setCurrentPosition={setCurrentPosition}
            setShowPopUp={setShowPopUp}
          />
        )}
        {isSubmitted && !isSubmitting ? (
          <div className="hero-img">
            <img src={renderBackground()} alt="" />
          </div>
        ) : (
          <div className="hero-img">
            <img src={renderBackground()} alt="" />
          </div>
        )}
        {((currentWeather && isSubmitted && !isSubmitting && windowWidth < 560) ||
            (Object.keys(errors).length !== 0 && !isSubmitted && windowWidth < 560)) &&<div className="windAndHumidity">
          <span className="wind">
            <img src={windowWidth > 560 ? windDesktop : windIcon} alt="" />
            <span>{currentWeather.wind} m/s</span>
          </span>
          <span className="humidity">
            <img
              src={windowWidth > 560 ? humadityDesktop : humidityIcon}
              alt=""
            />
            <span>{currentWeather.humidity} %</span>
          </span>
        </div>}
        {isSubmitting && Object.keys(errors).length === 0 && (
          <LoadingComponent />
        )}
        <div className="overlay"></div>
        {isSubmitted && !isSubmitting && <div className="x"></div>}
        {!showPopUp && (
          <SwitchBtn isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
        )}

        <div className="center">
          {((!showPopUp && !isSubmitting) ||
            Object.keys(errors).length !== 0) && (
            <form onSubmit={handleSubmit} ref={formHeightRef}>
              <div className="inputSend">
                <input
                  className="search-input"
                  type="text"
                  name="city"
                  placeholder="Enter a city"
                  onChange={handleChange}
                  value={city}
                  maxLength="58"
                  inputMode="search"
                />
                {errors.city ? (
                  <p>{errors.city}</p>
                ) : (
                  <p style={{ visibility: "hidden" }}>x</p>
                )}
              </div>
              <input className="submit-input" type="submit" value="Search" />
            </form>
          )}
          {((isSubmitted && !isSubmitting) ||
            (Object.keys(errors).length !== 0 && !isSubmitted)) && (
            <div
              className="weather-container"
              style={windowWidth < 560 ? { height: firstHeight - formHeight }: {height: 'initial'}}
            >
              <div className="wrapper">
                {currentWeather && (
                  <CurrentWeatherComponent
                    currentWeather={currentWeather}
                    dayCycle={dayCycle}
                    localTime={localTime}
                    isCelsius={isCelsius}
                    windowWidth={windowWidth}
                  />
                )}
                <div className="daily-weather-container" style={((windowWidth < 560 && dayCycle === "evening") || windowWidth > 560) ? {backgroundColor: 'rgba(0, 0, 0, 0.17)', color: 'white'} : {backgroundColor: 'rgba(255, 255, 255, 0.837)'} }>
                  {dailyWeather &&
                    dailyWeather.map((day, index) => (
                      <SingleDayComponent
                        key={index}
                        dailyWeather={day}
                        dayCycle={dayCycle}
                        isCelsius={isCelsius}
                      />
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
