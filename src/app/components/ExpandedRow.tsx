import React from 'react';
import { WiDaySunny } from 'weather-icons-react';
import styles from './weatherButton.module.css'

const WeatherSmall: React.FC = () => <WiDaySunny size={14} color="#000" />;

interface ExpandedRowProps {
    time: Date;
    temp: number;
}

const ExpandedRow = ({time, temp}:ExpandedRowProps) => {
const now = new Date();

// Skip past timepoints
if (time <= now) return null;

// if (time.toLocaleDateString('no-NO', { weekday: 'long' }) !== day) return null;

const formattedTime = time.toLocaleTimeString('no-NO', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
});

return (
    <tr>
        <td style={{ paddingLeft: '20px' }}>{formattedTime}</td>
        <td className={styles.spanafter}> {temp}°C</td>
        <td> <WeatherSmall/> </td>
    </tr>
    );
}
export default ExpandedRow;