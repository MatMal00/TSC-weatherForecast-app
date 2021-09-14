import { WeatherData } from '@store/WeatherForecast.types';
import { days } from '@utils/constants';
import WeatherItem from './subcomponents/WeatherItem';
import styles from './WeatherList.module.scss';

interface WeatherListProps {
    weatherForecast: WeatherData[];
    day: number;
}

const WeatherList: React.FC<WeatherListProps> = ({ day, weatherForecast }) => (
    <>
        <h2 className={styles.day}>{days[day]}</h2>
        <div className={styles.weatherList}>
            {weatherForecast.map(item => (
                <WeatherItem weatherForecast={item} key={item.dt} />
            ))}
        </div>
    </>
);

export default WeatherList;
