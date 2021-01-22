import fromCalvinToCelsius from './fromCalvinToCelsius'

export default function HandleCurrentWeather(responseCurrentWeather, setCurrentWeather) {
    const {name, sys, main, weather, wind } = responseCurrentWeather.data;
    const nameOfCity = name;
    const country = sys.country;
    const currentTemperature = fromCalvinToCelsius(main.temp);
    const currentCloud = weather[0].description;
    const currentIcon = weather[0].icon;
    const currentWind = wind.speed;
    const currentHumidity = main.humidity

    return setCurrentWeather({name: nameOfCity, country: country, temp: currentTemperature, description: currentCloud, icon: currentIcon, wind:currentWind, humidity: currentHumidity});
}