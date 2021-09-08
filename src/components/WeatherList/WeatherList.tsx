import { WeatherData } from '@store/WeatherForecast.types';
import WeatherItem from './subcomponents/WeatherItem';
import './WeatherList.scss';

interface WeatherListProps {
    weatherForecast: WeatherData[];
}

const WeatherList: React.FC<WeatherListProps> = ({ weatherForecast }) => {
    const items = weatherForecast.map(item => <WeatherItem weatherForecast={item} key={item.dt} />);

    return <div className="weatherList">{items}</div>;
};

export default WeatherList;
