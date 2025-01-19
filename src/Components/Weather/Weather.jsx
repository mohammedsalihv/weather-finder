import React, { useEffect, useRef, useState } from 'react';
import search_logo from '../../assets/search.png'; // Ensure the path is correct
import './Weather.css';
import clear_icon from '../../assets/clear.png'
import cloud_icon from '../../assets/cloud.png'
import drizzle_icon from '../../assets/drizzle.png'
import rain_icon from '../../assets/rain.png'
import snow_icon from '../../assets/snow.png'
import wind_icon from '../../assets/wind.png'
import humidity_icon from '../../assets/humidity.png'



const Weather = () => {


    const [weatherData , setWeatherData] = useState(false)
    const inputRef = useRef(null)

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d" :cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d": drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":snow_icon,
        "13d":snow_icon,
        "13n":snow_icon
    }

  async function handleSearch(city){

       if(city === ''){
        alert('Pls enter city name')
       }

       try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
    
        // Check if response is ok (status 200-299)
        if (!response.ok) {
           alert(`City not found: ${city}`);  // Custom error message for non-OK responses
        }
    
        const data = await response.json();
        
        // Check if weather data exists
        if (data.weather && data.weather.length > 0) {
            const icon = allIcons[data.weather[0].icon] || clear_icon;
    
            // Set the weather data state
            setWeatherData({
                temp: data.main.temp,
                description: data.weather[0].description,
                location: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                visibility: data.visibility / 1000,
                windSpeed: data.wind.speed,
                windDegree: data.wind.deg,
                sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
                icon: icon
            });
        } 
    } catch (error) {
        console.log(error);

    }
    
    
    }
    
    useEffect(() => {
        handleSearch('Kerala')
    } , [])


    return (
      <div className="weather-app">
        <div className="weather">
          <div className="search-weather">
          <span className='header'>Weather finder</span>
            <input
            ref={inputRef}
              type="text"
              placeholder="Enter city..."
            />
            <button onClick={() => handleSearch(inputRef.current.value)}>
              <img src={search_logo} alt="Search icon" />
            </button>
          </div>
          <div className="main-weather">
            <div className="details">
              <span className="temp">{weatherData.temp}°C</span>
              <span className="description">{weatherData.description}</span>
              <span className="place">
                {weatherData.location}, {weatherData.country}
              </span>
            </div>
            <div className="main-image">
              <img src={weatherData.icon} alt="Weather Icon" />
            </div>
          </div>

          <div className="sub-weathers">
            <div className="humidity">
              <span className="humidity-heading">Humidity</span>
              <div className="humidity-content">
                <img src={humidity_icon} alt="Humidity Icon" />
                <span>{weatherData.humidity} %</span>
              </div>
            </div>

            <div className="wind-speed">
    <span className="wind-heading">Wind Speed</span>
    <div className="wind-info">
        <img src={wind_icon} alt="Wind Icon" />
        <span>{weatherData.windSpeed} m/s {weatherData.windDegree}° (NE)</span>
    </div>
</div>

            <div className="pressure">
              <span>pressure : {weatherData.pressure} hPa</span>
              <span>visibility : {weatherData.visibility} km</span>
            </div>
            <div className="sun-rise-up">
              <span>sunrise : {weatherData.sunrise}</span>
              <span>sunset : {weatherData.sunset}</span>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Weather;


