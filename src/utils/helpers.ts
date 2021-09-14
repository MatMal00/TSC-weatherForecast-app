import { WeatherData } from '@store/WeatherForecast.types';

export const getDate = (date: WeatherData) => date.dt_txt.slice(0, 10);
export const getDay = (date: WeatherData) => date.dt_txt.slice(11, 16);
