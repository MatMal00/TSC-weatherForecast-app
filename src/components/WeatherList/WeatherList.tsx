import { useContext } from 'react';
import { WeatherContext } from '@store/WeatherForecast.context';
import WeatherItem from './subcomponents/WeatherItem';
import img from '../../img/clear.png';
import './WeatherList.scss';

const WeatherList: React.FC = () => {
    const { weatherState } = useContext(WeatherContext);
    const { weatherForecastList } = weatherState;

    const items = weatherForecastList.map(item => (
        <WeatherItem weatherForecast={item} key={item.dt} />
    ));

    return <div className="weatherList">{items}</div>;
};

export default WeatherList;
