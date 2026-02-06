import { useState } from "react"
import axios from 'axios'
import { useEffect } from "react"

const Weather = ({ city }) => {

    const [weather, setWeather] = useState(null)
    const weather_api_key = import.meta.env.VITE_WEATHER_KEY
    
    useEffect(() => {
    
        if (city) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weather_api_key}`)
                .then(response => {
                    setWeather(response.data)
                })
                .catch(error => console.log(error))
            }
    }, [city, weather_api_key])

    if (!weather) return null

    const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    return (
        <div>
            <h3>Weather in {city}</h3>
            <p>Temperature {weather.main.temp} Celsius</p>
            <img src={weatherIcon} alt={weather.weather[0].description} />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather