'use client';

import React from 'react';
import Button from '../components/weatherButton';
import styles from "../components/weatherButton.module.css";
//import weatherData from '../components/weatherButton';
import styled from 'styled-components'; 

const getDate = () => {
  const date = new Date();
  const day = date.toLocaleString('en-US', { weekday: 'long' });
  const month = date.toLocaleString('en-US', { month: 'long' });
  return `${day} ${date.getDate()}.${month}`;
};

// TITLE §§ Paragraph §§ BUTTON
const Home: React.FC = () => {
  const latitude = 59.91; // Example latitude
  const longitude = 10.75; // Example longitude

  return (
    <Wrapper>
    <Title style={{padding: '12px 24px'}}>
      Awesome
    </Title>
  
    {/* <div></div> */}
      <h3 className={styles.h3}> Weather Forecast</h3>
      <p style={{ 
        marginTop: '-20px', 
        fontSize: '16px', 
        fontFamily: 'Roboto',
        color: '#555' }}>
        Oslo{' '} {getDate()} (Lat: {latitude.toFixed(2)}, Lon: {longitude.toFixed(2)})
      </p>
      <Button />
    </Wrapper>
  );
};

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #BF4F74;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 14em;
  background: papayawhip;
`;

// Use Title and Wrapper like any other React component – except they're styled!


export default Home;
