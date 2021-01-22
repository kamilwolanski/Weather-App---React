import axios from 'axios';

const GetDailyWeather = async (lon, lat)=> {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
    exclude={part}&appid=86ccf0dc68b8c1df51843f8e9bf5244f`)

    return response
}

export default GetDailyWeather