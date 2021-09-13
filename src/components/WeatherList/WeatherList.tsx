import { WeatherData } from "@store/WeatherForecast.types";
import { days } from "utils/constants";
import WeatherItem from "./components/WeatherItem";
import "./WeatherList.module.scss";

interface WeatherListProps {
  weatherForecast: WeatherData[];
  day: number;
}

const WeatherList: React.FC<WeatherListProps> = ({ day, weatherForecast }) => (
  <>
    <h2 className="weatherList__day">{days[day]}</h2>
    <div className="weatherList">
      {weatherForecast.map((item) => (
        <WeatherItem weatherForecast={item} key={item.dt} />
      ))}
    </div>
  </>
);

export default WeatherList;
