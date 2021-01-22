import clearSkyDay from "../images/weatherIcons/clearskyday.svg";
import fewCloudsDay from "../images/weatherIcons/fewCloudsDay.svg";
import fewCloudsNight from "../images/weatherIcons/fewCloudsNight.svg";
import mist from "../images/weatherIcons/mist.svg";
import brokenClouds from "../images/weatherIcons/brokenClouds.svg";
import clearSkyNight from "../images/weatherIcons/clearSkyNight.svg";
import snow from "../images/weatherIcons/snow.svg";
import lightRainDay from "../images/weatherIcons/lightRainDay.svg";
import lightRainNight from "../images/weatherIcons/lightRainNight.svg";
import scatteredClouds from "../images/weatherIcons/scatteredClouds.svg";
import heavyRain from "../images/weatherIcons/heavyRain.svg";
import rainAndSnow from '../images/weatherIcons/rainAndSnow.svg';

const icons = {
  commonIcons: {
    mist: mist,
    fog: mist,
    haze: mist,
    "broken clouds": brokenClouds,
    "light snow": snow,
    snow: snow,
    "overcast clouds": brokenClouds,
    "scattered clouds": scatteredClouds,
    "heavy intensity rain": heavyRain,
    "clear sky": clearSkyDay,
    "light rain": lightRainDay,
    "few clouds": fewCloudsDay,
    "moderate rain": lightRainDay,
    "light intensity drizzle" : heavyRain,
    'rain and snow': rainAndSnow,
    'very heavy rain': heavyRain
  },
  dayIcons: {
    "clear sky": clearSkyDay,
    "light rain": lightRainDay,
    "few clouds": fewCloudsDay,
    "moderate rain": lightRainDay,
  },
  nightIcons: {
    "clear sky": clearSkyNight,
    "light rain": lightRainNight,
    "few clouds": fewCloudsNight,
    "moderate rain": lightRainNight,
  },
};

export default class IconService {
  static handleIcon(description, dayCycle) {
    if (!dayCycle) {
      return icons.commonIcons[description];
    } else if (
      description === "clear sky" ||
      description === "light rain" ||
      description === "few clouds" ||
      description === "moderate rain"
    ) {
      if (dayCycle === "day" || dayCycle === 'morning') {
        return icons.dayIcons[description];
      } else {
        return icons.nightIcons[description];
      }
    } else {
      return icons.commonIcons[description];
    }
  }
}
