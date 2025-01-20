'use client'; // Ensure this is a Client Component

import react, { useState } from 'react';
import styles from "./weatherButton.module.css";
import React from 'react';
import { WiDaySunny } from "weather-icons-react";

class WeatherSmall extends React.Component {
  render() {
      return <WiDaySunny size={14} color='#000' />
  }
}

class WeatherLarge extends React.Component {
  render() {
      return <WiDaySunny size={24} color='#000' />
  }
}

function getDate() {
  const today = new Date();
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = weekday[today.getDay()];
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();
  const date = today.getDate();
  return `${day}/${date}/${month}`;
}


const Button: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setIsAnimating(true);
    
 // Reset animation state after it completes (adjust time to match animation duration)
 setTimeout(() => {
  setIsAnimating(false);
}, 1000); // 1 second matches the animation duration in CSS



    try {
      const latitude = 59.91;  // Latitude for Oslo (you can change this to any location)
      const longitude = 10.75; // Longitude for oslo (you can change this to any location)
      
      // Open-Meteo API URL for hourly temperature
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError('Could not fetch weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDayClick = (day: string) => {
    setExpandedDay((prevDay) => (prevDay === day ? null : day));
  };

  const getDayName = (index: number) => {
    const today = new Date();
    const day = new Date(today.setDate(today.getDate() + index));
    return day.toLocaleDateString('en-US', { weekday: 'long' });
  };


    const [currentDate, setCurrentDate] = useState(getDate());

  return (
    <div>
      <button
      className={`${styles.button} ${isAnimating ? styles.animate : ""}`}
        onClick={handleClick}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Show Weather
      </button>

      {loading && <p>Loading weather data...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}
 
      {weatherData && (
        <div className={styles.container}>
        <header className={styles.header}>
          {/* <h3 className={styles.h3}> */}
            {/* Current Weather Forecast for Berlin{' '} today {getDate()} */}
            <span className={styles.span}> 
              {/* (Lat: {weatherData.latitude.toFixed(2)}, Lon: {weatherData.longitude.toFixed(2)}) */}
            </span>
          {/* </h3> */}
        </header>
    
        <table className={styles.table}>
            <thead>
              <tr>
                <th>Day</th>
                <th>Temperature</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(7)].map((_, dayIndex) => {
                const dayName = getDayName(dayIndex);
                const isExpanded = expandedDay === dayName;
                const getCurrentHour = () => new Date().getHours();

                return (
                  <React.Fragment key={dayName}>
                    <tr onClick={() => handleDayClick(dayName)} style={{ cursor: 'pointer' }}>
                      <td>{dayName} </td>
                      <td>{isExpanded ? 'Click to Collapse' : 'Click to Expand'}</td>
                    </tr>
                    {isExpanded &&
                      weatherData.hourly.temperature_2m
                        .slice(dayIndex * 24, (dayIndex + 1) * 24)
                        .map((temp: number, hourIndex: number) => {
                          const currentHour = getCurrentHour();
                          const dayStartHour = dayIndex * 24;

                          // Calculate the absolute hour in the forecast
                          const absoluteHour = dayStartHour + hourIndex;

                          // Filter out past hours for the current day
                          if (dayIndex === 0 && absoluteHour <= currentHour) {
                            return null;
                          }

                          const time = new Date();
                          time.setHours(hourIndex);
                          time.setMinutes(0);
                          const formattedTime = time.toLocaleTimeString('no-NO', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: false,
                          });

                          return (
                            <tr key={hourIndex}>
                              <td style={{ paddingLeft: '20px' }}>{formattedTime}</td>
                              <td>{temp}°C</td>
                              <td> <WeatherSmall/> </td>
                              
                            </tr>
                          );
                        })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Button;
