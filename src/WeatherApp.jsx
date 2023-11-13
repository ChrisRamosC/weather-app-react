import { useState } from 'react'

export const WeatherApp = () => {

    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'a904a8671b10389461952bc992c99cb2'
    const diffKelvin = 273.15

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const handleChangeCity = (e) => {
        setCity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (city.trim().length > 0) fetchWeather(city)
    }

    const fetchWeather = async (city) => {
        try {
            const response = await fetch(`${baseUrl}?q=${city}&appid=${API_KEY}`)
            const data = await response.json()
            setWeatherData(data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container">
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={handleChangeCity}
                />
                <button type="submit">Buscar</button>
            </form>
            {
                weatherData && (
                    <div className="weather-data">
                        <h2>{weatherData.name}</h2>
                        <p>Temperatura: {parseInt(weatherData?.main.temp - diffKelvin)}°C</p>
                        <p>Condición metereológica: {weatherData.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
                    </div>
                )
            }
        </div>
    )
}
