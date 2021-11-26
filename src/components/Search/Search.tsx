import React, { useContext, useState } from 'react';
import { fetchWeather } from 'src/store/WeatherForecast.services';
import { WeatherContext } from 'src/store/WeatherForecast.context';
import { WeatherForecastActionType } from 'src/store/WeatherForecast.types';
import arrowDown from 'src/img/chevronDown.svg';
import styles from './Search.module.scss';

const Search: React.FC = () => {
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
        } catch (err: any) {
            const errCode = err.response?.status;

            weatherDispatch({
                type: WeatherForecastActionType.ERROR,
                payload: {
                    isError: true,
                    errorMessage: errCode === 404 ? 'City Not Found' : err.message,
                },
            });
        }
    };

    return (
        <div className={styles.search}>
            <form onSubmit={searchHandler}>
                <input
                    onChange={inputValueHandler}
                    value={inputValue}
                    type="text"
                    placeholder="Please enter a city name"
                />
                <button type="submit">search</button>
            </form>
            <a href="#map">Or, tap and select a location on the map</a>
            <a className={styles.arrowDown} href="#map">
                <img src={arrowDown} alt="arrow down" />
            </a>
        </div>
    );
};

export default Search;
