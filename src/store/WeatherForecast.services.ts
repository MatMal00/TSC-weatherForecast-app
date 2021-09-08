import api from '@api';
import { ApiResponse } from './WeatherForecast.types';

export const fetchWeather = async (city: string) => {
    const { data }: ApiResponse = await api().get(
        `/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    return data ?? [];
};
