import api from 'src/api';
import { ApiResponse } from './WeatherForecast.types';

export const fetchWeather = async (city: string) => {
    const { data }: ApiResponse = await api().get(
        `/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    return data ?? [];
};

export const fetchWeatherByUserLocation = async (lat: number, lon: number) => {
    const { data }: ApiResponse = await api().get(
        `/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    return data ?? [];
};
