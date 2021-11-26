import React from 'react';
import ReactDOM from 'react-dom';
import Weatchercast from './App';
import WeatcherForecastProvider from 'src/store/WeatherForecast.context';
import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <WeatcherForecastProvider>
            <Weatchercast />
        </WeatcherForecastProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
