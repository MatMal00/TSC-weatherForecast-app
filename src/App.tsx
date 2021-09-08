import WeatchercastProvider from '@store/WeatherForecast.context';
import Searcher from '@components/Searcher/Searcher';
import WeatherList from '@components/WeatherList/WeatherList';

import './App.scss';

const Weathercast = () => {
    return (
        <div className="container">
            <h1>Weather Forecast</h1>
            <div className="center">
                <WeatchercastProvider>
                    <Searcher />
                    <WeatherList />
                </WeatchercastProvider>
            </div>
        </div>
    );
};

export default Weathercast;
