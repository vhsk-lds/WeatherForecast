import React from 'react';
import Button from '../components/weatherButton';
import styles from "../components/weatherButton.module.css";
import weatherData from '../components/weatherButton';

//hvordan importere lengde breddegrad variabler fra weatherbutton? istedet for hardkodet
const latitude = 59.91;  // Latitude for Oslo (you can change this to any location)
const longitude = 10.75;

function getDate() {
  const today = new Date();
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = weekday[today.getDay()];
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();
  const date = today.getDate();
  return `${day} ${date}.${month}`;
}

//const [currentDate, setCurrentDate] = useState(getDate());
const Home: React.FC = () => {
  return (
    <div> 
      <h3 className={styles.h3}> Awesome Weather Forecast</h3>
      <p style={{ marginTop: '-20px', fontSize: '16px' }}
      > Oslo{' '} {getDate()} (Lat: {latitude.toFixed(2)}, Lon: {longitude.toFixed(2)})</p>
      <Button />
    </div>
  );
};

export default Home;
