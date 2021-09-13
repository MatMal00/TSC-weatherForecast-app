import { useCallback, useContext, useEffect, useState } from "react";
import { WeatherData } from "@store/WeatherForecast.types";
import { WeatherContext } from "@store/WeatherForecast.context";
import WeatherList from "@components/WeatherList/WeatherList";
import styles from "./WeatherForecast.module.scss";

const WeatherForecast: React.FC = () => {
  const { weatherState } = useContext(WeatherContext);
  const { weatherForecastList, city } = weatherState;
  const [listsToRender, setListsToRender] = useState<Element[] | any[]>([]);

  const createLists = useCallback(() => {
    let weatherForDay: WeatherData[] = [];
    let prevDate = weatherForecastList[0].dt_txt.slice(0, 10);
    let latestIndex = 0;

    for (let i = 0; i < weatherForecastList.length; i++) {
      const date = weatherForecastList[i].dt_txt.slice(0, 10);

      if (date !== prevDate) {
        const day = new Date(prevDate).getDay();
        weatherForDay = [...weatherForecastList.slice(latestIndex, i)];
        setListsToRender((prevState) => {
          const element = (
            <WeatherList key={i} day={day} weatherForecast={weatherForDay} />
          );

          return [...prevState, element];
        });
        latestIndex = i;
        prevDate = date;
      }
    }
  }, [weatherForecastList]);

  useEffect(() => {
    createLists();
  }, []);

  return (
    <>
      <h2 className={styles.cityName}>{city?.name}</h2>
      <div className={styles.weatherForecast}>{listsToRender}</div>
    </>
  );
};

export default WeatherForecast;
