import React from 'react';
import ReactDOM from 'react-dom';
import Weatchercast from './App';
import WeatchercastProvider from '@store/WeatherForecast.context';
import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <WeatchercastProvider>
            <Weatchercast />
        </WeatchercastProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
