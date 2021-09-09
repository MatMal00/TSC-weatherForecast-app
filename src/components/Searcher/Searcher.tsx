import React, { useContext, useState } from 'react';
import { fetchWeather } from '@store/WeatherForecast.services';
import { WeatherContext } from '@store/WeatherForecast.context';
import { WeatherForecastActionType } from '@store/WeatherForecast.types';
import './Searcher.scss';

const Searcher: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const { weatherDispatch } = useContext(WeatherContext);

    const inputValueHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setInputValue(target.value);

    const searchHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        if (inputValue.trim().length === 0) {
            weatherDispatch({
                type: WeatherForecastActionType.ERROR,
                payload: { isError: true, errorMessage: 'Wrong city name' },
            });
            return;
        }

        try {
            weatherDispatch({ type: WeatherForecastActionType.LOADING, payload: true });
            const data = await fetchWeather(inputValue);

            weatherDispatch({
                type: WeatherForecastActionType.GET_WEATHER_FORECAST,
                payload: { weatherForecast: data.list, city: data.city },
            });
            //STOP LOADING
        } catch (err) {
            weatherDispatch({
                type: WeatherForecastActionType.ERROR,
                payload: { isError: true, errorMessage: 'City Not Found' },
            });
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
