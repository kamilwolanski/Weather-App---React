import axios from 'axios';

const GetCurrentWeatherByCity = async (city)=> {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=86ccf0dc68b8c1df51843f8e9bf5244f`)

    return response
}

export default GetCurrentWeatherByCity

