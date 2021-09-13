import { useContext } from 'react';
import { WeatherContext } from '@store/WeatherForecast.context';
import Title from '@components/Title/Title';
import Searcher from '@components/Searcher/Searcher';
import WeatherForecast from '@components/WeatherForecast/WeatherForecast';
import Loader from '@components/Loader/Loader';
import './App.scss';

const Weathercast = () => {
    const { weatherState } = useContext(WeatherContext);
    const { weatherForecastList, loading, error, errorMessage } = weatherState;

    return (
        <div className="container">
            <Title />
            <div className="center">
                {!loading && <Searcher />}
                {weatherForecastList.length > 0 && !loading && !error ? <WeatherForecast /> : null}
                {error && <p className="error">{errorMessage}</p>}
                {loading && <Loader />}
            </div>
        </div>
    );
};

export default Weathercast;
