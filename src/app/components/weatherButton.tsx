'use client';

import React, { useState, useEffect } from 'react';
import styles from './weatherButton.module.css';

//import styled from 'styled-components'; 
//import { hydrateRoot } from 'react-dom/client';
import ExpandedRow from './ExpandedRow';


interface WeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

const Button: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const latitude = 59.91;
        const longitude = 10.75;

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

    fetchWeatherData();
  }, []);

  const groupDataByDay = () => {
    if (!weatherData) return [];

    const { time, temperature_2m } = weatherData.hourly;
    const groupedData: { day: string; minTemp: number; maxTemp: number }[] = [];
    const dayData: { [key: string]: number[] } = {};

    for (let i = 0; i < time.length; i++) {
      const date = new Date(time[i]);
      const day = date.toLocaleDateString('no-NO', { weekday: 'long' });
      if (!dayData[day]) dayData[day] = [];
      dayData[day].push(temperature_2m[i]); 
      // console.log(dayData)
    }

    for (const day in dayData) {
      groupedData.push({
        day,
        minTemp: Math.min(...dayData[day]),
        maxTemp: Math.max(...dayData[day]),
      });
    }

    return groupedData;
  };

  const dailyData = groupDataByDay();
 

  const handleDayClick = (day: string) => {
    setExpandedDay((prevDay) => (prevDay === day ? null : day));
  };

  const handleClick = (animating:boolean)=> {
    console.log(animating);
    setIsAnimating(animating)
  }


return (
    <div>
      <button
        className={`${styles.button} ${isAnimating ? styles.animate : ''}`}
        onClick={()=>setIsAnimating(!isAnimating)}>
        <svg viewBox="0 0 20 20">
          <path d="M10 15h8c1 0 2-1 2-2V3c0-1-1-2-2-2H2C1 1 0 2 0 3v10c0 1 1 2 2 2h4v4l4-4zM5 7h2v2H5V7zm4 0h2v2H9V7zm4 0h2v2h-2V7z"/>
        </svg>
        <span className={styles.span}>Show Weather</span> 
       </button>

      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div className={styles.container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Day</th>
                <th>Min/Max Temperature</th>
              </tr>
            </thead>
            <tbody>
              {dailyData.map(({ day, minTemp, maxTemp }) => {
                const isExpanded = expandedDay === day;
                return (
                  <React.Fragment key={day}>
                    <tr onClick={() => handleDayClick(day)} style={{ cursor: 'pointer' }}>
                    {/* <td className={`${isExpanded ? styles.spanafter : styles.span}`}> */}
                      <td>{day}</td>
                      
                      {/* <td className={`${isExpanded ? styles.spanafter : styles.span}`}> */}
                      {minTemp}°C / {maxTemp}°C
                      
                      
                      
                      {/* <td className={styles.span}>
                        {minTemp}°C / {maxTemp}°C
                      </td> */}
                    </tr>
                    {isExpanded &&
                      weatherData.hourly.temperature_2m.map((temp, i) => {
                        const time = new Date(weatherData.hourly.time[i]);
                        return <ExpandedRow key={i} time={time} temp={temp}/>      
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
