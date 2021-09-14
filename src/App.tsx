import { useContext } from 'react';
import { WeatherContext } from '@store/WeatherForecast.context';
import Title from '@components/Title/Title';
import Search from '@components/Search/Search';
import WeatherForecast from '@components/WeatherForecast/WeatherForecast';
import Loader from '@components/Loader/Loader';
import Map from '@components/Map/Map';
import styles from './App.module.scss';

const Weathercast = () => {
    const { weatherState } = useContext(WeatherContext);
    const { weatherForecastList, loading, error, errorMessage } = weatherState;

    return (
        <div className={styles.container}>
            <Title />
            <div className={styles.center}>
                {!loading && <Search />}
                {weatherForecastList.length > 0 && !loading && !error && <WeatherForecast />}
                {loading && <Loader />}
                {error && <p className={styles.error}>{errorMessage}</p>}
                {!loading && <Map />}
            </div>
        </div>
    );
};

export default Weathercast;
