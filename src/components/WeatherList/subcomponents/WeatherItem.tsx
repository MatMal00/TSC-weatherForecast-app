import { useCallback, useEffect, useState } from 'react';
import { WeatherData } from '@store/WeatherForecast.types';
import { getDate, getHour } from '@utils/helpers';
import imgClear from '@img/clear.png';
import imgClouds from '@img/clouds.png';
import imgMist from '@img/mist.png';
import imgRain from '@img/rain.png';
import imgSnow from '@img/snow.png';
import imgThunderstorm from '@img/thunderstorm.png';
import styles from './WeatherItem.module.scss';

interface WeatherItemProps {
    weatherForecast: WeatherData;
}

const WeatherItem: React.FC<WeatherItemProps> = ({ weatherForecast }) => {
    const [image, setImage] = useState(imgClear);
    const date = getDate(weatherForecast);
    const hour = getHour(weatherForecast);
    const { temp, feels_like, pressure } = weatherForecast.main;
    const { description, id } = weatherForecast.weather[0];

    const chooseImg = useCallback(() => {
        switch (true) {
            case id >= 200 && id <= 232:
                setImage(imgThunderstorm);
                break;
            case (id >= 300 && id <= 321) || (id >= 500 && id <= 531):
                setImage(imgRain);
                break;
            case id >= 600 && id <= 622:
                setImage(imgSnow);
                break;
            case id >= 701 && id <= 781:
                setImage(imgMist);
                break;
            case id === 800:
                setImage(imgClear);
                break;
            case id >= 801 && id <= 804:
                setImage(imgClouds);
                break;

            default:
                break;
        }
    }, [id]);

    useEffect(() => chooseImg(), [chooseImg]);

    return (
        <div className={styles.item}>
            <div className={styles.imgBox}>
                <img src={image} alt={description} />
                <article>
                    <h5>{date}</h5>
                </article>
            </div>
            <div className={styles.box}>
                <h4>{hour}</h4>

                <article className={styles.temp}>
                    <h5>{Math.floor(temp)}°C</h5>
                    <p>{description}</p>
                </article>

                <article className={styles.inlineData}>
                    <h6>
                        Feels like: <span>{Math.floor(feels_like)}°C</span>
                    </h6>
                </article>

                <article className={styles.inlineData}>
                    <h6>
                        Pressure: <span>{pressure} hPa</span>
                    </h6>
                </article>
            </div>
        </div>
    );
};

export default WeatherItem;
