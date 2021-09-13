import { ReactNode, useContext } from 'react';
import { WeatherData } from '@store/WeatherForecast.types';
import { WeatherContext } from '@store/WeatherForecast.context';
import WeatherList from '@components/WeatherList/WeatherList';
import './WeatherForecast.modules.scss';

const WeatherForecast: React.FC = () => {
    const { weatherState } = useContext(WeatherContext);
    const { weatherForecastList, city } = weatherState;

    let listsToRender: ReactNode[] = [];

    const createLists = () => {
        let weatherCopy: WeatherData[] = [];
        let prevDate = weatherForecastList[0].dt_txt.slice(0, 10);
        let lastestIndex = 0;

        for (let i = 0; i < weatherForecastList.length; i++) {
            const date = weatherForecastList[i].dt_txt.slice(0, 10);

            if (date !== prevDate) {
                const day = new Date(prevDate).getDay();
                weatherCopy = [...weatherForecastList.slice(lastestIndex, i)];
                listsToRender.push(<WeatherList key={i} day={day} weatherForecast={weatherCopy} />);
                lastestIndex = i;
                prevDate = date;
            }
        }
    };
    createLists();

    return (
        <>
            <h2 className="weatherForecast__city-name">{city?.name}</h2>
            <div className="weatherForecast">{listsToRender}</div>
        </>
    );
};

export default WeatherForecast;
