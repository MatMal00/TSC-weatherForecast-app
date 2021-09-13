import { WeatherData } from '@store/WeatherForecast.types';
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
    const date = weatherForecast.dt_txt.slice(0, 10);
    const hour = weatherForecast.dt_txt.slice(11, 16);
    const { temp, feels_like, pressure } = weatherForecast.main;
    const { description, id } = weatherForecast.weather[0];

    let image: string = imgClear;

    const chooseImg = () => {
        if (id >= 200 && id <= 232) {
            image = imgThunderstorm;
        } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            image = imgRain;
        } else if (id >= 600 && id <= 622) {
            image = imgSnow;
        } else if (id >= 701 && id <= 781) {
            image = imgMist;
        } else if (id === 800) {
            image = imgClear;
        } else if (id >= 801 && id <= 804) {
            image = imgClouds;
        }
    };
    chooseImg();

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
