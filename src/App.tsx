import { useContext } from 'react';
import { WeatherContext } from 'src/store/WeatherForecast.context';
import Title from 'src/components/Title/Title';
import Search from 'src/components/Search/Search';
import WeatherForecast from 'src/components/WeatherForecast/WeatherForecast';
import Loader from 'src/components/Loader/Loader';
import Map from 'src/components/Map/Map';
import styles from './App.module.scss';

const Weathercast = () => {
    const { weatherState } = useContext(WeatherContext);
    const { weatherForecastList, loading, error, errorMessage } = weatherState;

    return (
        <div className={styles.container}>
            <Title />
            <div className={styles.wrapper}>
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
