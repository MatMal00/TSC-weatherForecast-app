import { ReactNode, useContext } from 'react';
import { WeatherData } from '@store/WeatherForecast.types';
import { WeatherContext } from '@store/WeatherForecast.context';
import WeatherList from '@components/WeatherList/WeatherList';
import './WeatherForecast.scss';

const WeatherForecast: React.FC = () => {
    const { weatherState } = useContext(WeatherContext);
    const { weatherForecastList } = weatherState;

    let weatherCopy: WeatherData[] = [];
    let listsToRender: ReactNode[] = [];

    const createLists = () => {
        let prevDate = weatherForecastList[0].dt_txt.slice(0, 10);
        let lastestIndex = 0;

        for (let i = 0; i < weatherForecastList.length; i++) {
            const date = weatherForecastList[i].dt_txt.slice(0, 10);            

            if (date !== prevDate) {
                weatherCopy = [...weatherForecastList.slice(lastestIndex, i)];
                listsToRender.push(<WeatherList key={i} weatherForecast={weatherCopy} />);
                lastestIndex = i;
                prevDate = date;
            }
        }
    };
    createLists();

    return <div className="weatherForecast">{listsToRender}</div>;
};

export default WeatherForecast;
