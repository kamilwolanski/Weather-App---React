import axios from "axios";

export default class CurrentWeatherService {
  static async getCurrentWeatherByCity(city) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=86ccf0dc68b8c1df51843f8e9bf5244f`
    );

    return response;
  }
  static async getCurrentWeatherByLocalization(lon, lat) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=86ccf0dc68b8c1df51843f8e9bf5244f`
    );

    return response;
  }
}
