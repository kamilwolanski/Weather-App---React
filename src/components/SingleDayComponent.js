import React from "react";
import IconService from './IconService';
import celsiusToFahrenheit from './celsiusToFahrenheit';


const SingleDayComponent = ({dailyWeather, isCelsius}) => {
    const {temp, description, date} = dailyWeather;
  return (
      <div className="single-day">
          <span className="single-day-date">{date.day}/{date.month}</span>
          <div className="single-day-weather-icon">
              <img src={IconService.handleIcon(description)} alt=""/>
          </div>
          {isCelsius ? <span className="single-day-temp">{temp} &#x2103;</span> : <span className="single-day-temp">{celsiusToFahrenheit(temp)} &deg;F</span>}
      </div>
  );
};

export default SingleDayComponent;
