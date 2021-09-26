import React from 'react';
import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { WeatherData } from '@store/WeatherForecast.types';
import { WeatherContext } from '@store/WeatherForecast.context';
import { getDate } from '@utils/helpers';
import WeatherList from '@components/WeatherList/WeatherList';
import styles from './WeatherForecast.module.scss';

const WeatherForecast: React.FC = () => {
    const [listsToRender, setListsToRender] = useState<ReactNode[]>([]);
    const { weatherState } = useContext(WeatherContext);
    const { weatherForecastList, city } = weatherState;

    const createLists = useCallback(() => {
        let weatherForDay: WeatherData[] = [];
        let prevDate = getDate(weatherForecastList[0]);
        let latestIndex = 0;

        weatherForecastList.forEach((_item, index) => {
            const date = getDate(weatherForecastList[index]);

            if (date !== prevDate) {
                const day = new Date(prevDate).getDay();
                weatherForDay = [...weatherForecastList.slice(latestIndex, index)];
                setListsToRender(prevState => {
                    const element = (
                        <WeatherList key={index} day={day} weatherForecast={weatherForDay} />
                    );

                    return [...prevState, element];
                });
                latestIndex = index;
                prevDate = date;
            }
        });
    }, [weatherForecastList]);

    useEffect(() => {
        createLists();
    }, [createLists]);

    return (
        <>
            <h2 className={styles.cityName}>{city?.name}</h2>
            <div className={styles.weatherForecast}>{listsToRender}</div>
        </>
    );
};

export default WeatherForecast;
