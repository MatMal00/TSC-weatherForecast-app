import React, { useContext, useState } from 'react';
import { fetchWeather } from '@store/WeatherForecast.services';
import { WeatherContext } from '@store/WeatherForecast.context';
import './Searcher.scss';
import { WeatherForecastActionType } from '@store/WeatherForecast.types';

const Searcher: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const { weatherDispatch } = useContext(WeatherContext);

    const inputValueHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setInputValue(target.value);

    const searchHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        if (inputValue.trim().length === 0) {
            console.log(`ERROR`);
            // THROW ERROR
            return;
        }

        try {
            // LOADING
            const data = await fetchWeather(inputValue);
            
            weatherDispatch({
                type: WeatherForecastActionType.GET_WEATHER_FORECAST,
                payload: { weatherForecast: data.list, city: data.city },
            });
            //STOP LOADING
        } catch (err) {
            //STOP LOADING
            //HANDLE ERRORS
            console.log(err);
        }
    };

    return (
        <div className="searcher">
            <form onSubmit={searchHandler}>
                <input
                    onChange={inputValueHandler}
                    value={inputValue}
                    type="text"
                    placeholder="Please enter a city name"
                />
                <button type="submit">search</button>
            </form>
        </div>
    );
};

export default Searcher;
