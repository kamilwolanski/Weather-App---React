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

function App() {
  const windowHeight = window.innerHeight;
  document.body.style.height = `${windowHeight}px`;
  

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    console.log(windowHeight)

    window.addEventListener("resize", handleResize);
  });
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
  } = UseSearchForm();

  const [isCelsius, setIsCelsius] = useState(true);
  const [showPopUp, setShowPopUp] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  console.log(windowWidth)
  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validateInfo(city));
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
      <div className="app-container">
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
            <form onSubmit={handleSubmit}>
              <div className="inputSend">
                <input
                  className="search-input"
                  type="text"
                  name="city"
                  placeholder="Enter a city"
                  onChange={handleChange}
                  value={city}
                  maxLength="58"
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
            (Object.keys(errors).length !== 0 && isSubmitted)) && (
            <div className="weather-container">
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
                <div className="daily-weather-container">
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
