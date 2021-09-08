import WeatchercastProvider from '@store/WeatherForecast.context';
import Searcher from '@components/Searcher/Searcher';

import './App.scss';

const Weathercast = () => {
    return (
        <div className="container">
            <h1>Weather Forecast</h1>
            <div className="center">
                <WeatchercastProvider>
                    <Searcher />
                </WeatchercastProvider>
            </div>
        </div>
    );
};

export default Weathercast;
