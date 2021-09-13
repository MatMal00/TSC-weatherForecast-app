import { WeatherData } from '@store/WeatherForecast.types';
import WeatherItem from './subcomponents/WeatherItem';
import styles from './WeatherList.module.scss';

interface WeatherListProps {
    weatherForecast: WeatherData[];
    day: number;
}

const WeatherList: React.FC<WeatherListProps> = ({ day, weatherForecast }) => {
    const items = weatherForecast.map(item => <WeatherItem weatherForecast={item} key={item.dt} />);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <>
            <h2 className={styles.day}>{days[day]}</h2>
            <div className={styles.weatherList}>{items}</div>
        </>
    );
};

export default WeatherList;
