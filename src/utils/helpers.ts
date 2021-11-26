import { WeatherData } from 'src/store/WeatherForecast.types';

export const getDate = (date: WeatherData) => date.dt_txt.slice(0, 10);
export const getHour = (date: WeatherData) => date.dt_txt.slice(11, 16);
