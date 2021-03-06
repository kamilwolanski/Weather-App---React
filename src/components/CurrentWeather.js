import React from "react";
import IconService from './IconService';
import celsiusToFahrenheit from './celsiusToFahrenheit';
import humidityIcon from '../images/weatherIcons/clearHuminility.svg';
import humadityDesktop from '../images/weatherIcons/humadityDesktop.svg'
import windIcon from '../images/weatherIcons/clearWind.svg';
import windDesktop from '../images/weatherIcons/windDesktop.svg';


const CurrentWeatherComponent = ({ currentWeather, dayCycle, localTime, isCelsius, windowWidth }) => {
  const {
    name,
    country,
    temp,
    description,
    wind,
    humidity,
  } = currentWeather;
  const { dayOfWeek, localHour, localMinutes } = localTime;

  return (
    <>
      <div className="basic-info">
        <div className="cloudAndTemp">
          <div className="icon">
            <img src={IconService.handleIcon(description, dayCycle)} alt="" />
          </div>
          <div className="temp" style={((windowWidth < 560 && dayCycle === 'morning') || windowWidth > 560) ? {color: 'black'} : {color: 'white'}}>
            {isCelsius ? <span>{`${temp}`} &#x2103;</span> : <span>{`${celsiusToFahrenheit(temp)}`} &deg;F</span>}
          </div>
        </div>
        <div className={`localization-info ${name.length > 17 && 'small'}`} style={((windowWidth < 560 && dayCycle === 'morning') || windowWidth > 560) ? {color: 'black'} : {color: 'white'}}>
          <span className="city-name">{name}, </span>
          <span className="country-name">{country}</span>
        </div>
      </div>
      <div className="details-info">
        {windowWidth > 560 && <div className="windAndHumidity">
          <span className="wind"><img src={windowWidth > 560 ? windDesktop : windIcon} alt=""/><span>{wind} m/s</span></span>
          <span className="humidity"><img src={windowWidth > 560 ? humadityDesktop : humidityIcon} alt=""/><span>{humidity} %</span></span>
        </div>}
        <div className="timeAndDescription" style={((windowWidth < 560 && dayCycle === 'morning') || windowWidth > 560) ? {color: 'black'} : {color: 'white'}}>
          <span>
            {dayOfWeek} {localHour}:{localMinutes}
          </span>
          <span className="description">{description}</span>
        </div>
      </div>
      <div className="dailyWeather"></div>
    </>
  );
};

export default CurrentWeatherComponent;
