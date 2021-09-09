import { useContext } from 'react';
import { WeatherContext } from '@store/WeatherForecast.context';
import Title from '@components/Title/Title';
import Searcher from '@components/Searcher/Searcher';
import WeatherForecast from '@components/WeatherForecast/WeatherForecast';
import './App.scss';

const Weathercast = () => {
    const { weatherState } = useContext(WeatherContext);

    return (
        <div className="container">
            <Title />
            <div className="center">
                <Searcher />
                {weatherState.weatherForecastList.length > 0 ? <WeatherForecast /> : null}
            </div>
        </div>
    );
};

export default Weathercast;
