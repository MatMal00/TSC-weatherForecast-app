import { WeatherData } from '@store/WeatherForecast.types';
import '../WeatherList.scss';
import img from '../../../img/clear.png';

interface WeatherItemProps {
    weatherForecast: WeatherData;
}

const WeatherItem: React.FC<WeatherItemProps> = ({ weatherForecast }) => {
    const date = weatherForecast.dt_txt.slice(0, 10);
    const hour = weatherForecast.dt_txt.slice(11, 16);
    const { temp, feels_like, pressure } = weatherForecast.main;
    const { description, id } = weatherForecast.weather[0];

    return (
        <div className="weatherList__item">
            <div className="weatherList__item-img-box">
                <img src={img} alt="clear" />
                <article>
                    <h3>{date}</h3>
                </article>
            </div>
            <div className="weatherList__item-box">
                <h2>{hour}</h2>

                <article className="weatherList__temp">
                    <h3>{Math.floor(temp)}°C</h3>
                    <p>{description}</p>
                </article>

                <article className="weatherList__inline-data">
                    <h5>
                        Feels like: <span>{Math.floor(feels_like)}°C</span>
                    </h5>
                </article>

                <article className="weatherList__inline-data">
                    <h5>
                        Pressure: <span>{pressure} hPa</span>
                    </h5>
                </article>
            </div>
        </div>
    );
};

export default WeatherItem;
