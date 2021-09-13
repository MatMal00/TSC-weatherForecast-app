import { useEffect, useReducer } from 'react';
import { createContext } from 'react';
import { getPosition } from '@utils/location';
import { fetchWeatherByUserLocation } from './WeatherForecast.services';
import {
    ProviderValue,
    WeatherForecastActions,
    WeatherForecastActionType,
    WeatherForecastState,
} from './WeatherForecast.types';

export const WeatherContext = createContext({} as ProviderValue);

const initialState: WeatherForecastState = {
    weatherForecastList: [],
    city: undefined,
    error: false,
    errorMessage: '',
    loading: false,
};

const reducer = (
    state: WeatherForecastState,
    action: WeatherForecastActions
): WeatherForecastState => {
    switch (action.type) {
        case WeatherForecastActionType.GET_WEATHER_FORECAST:
            return {
                ...state,
                weatherForecastList: action.payload.weatherForecast,
                city: action.payload.city,
                loading: false,
            };
        case WeatherForecastActionType.LOADING:
            return {
                ...state,
                loading: action.payload,
                error: false,
            };
        case WeatherForecastActionType.ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.isError,
                errorMessage: action.payload.errorMessage,
            };
        default:
            return state;
    }
};

const WeatcherForecastProvider: React.FC = ({ children }) => {
    const [weatherState, weatherDispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                weatherDispatch({ type: WeatherForecastActionType.LOADING, payload: true });

                const { coords } = await getPosition({
                    enableHighAccuracy: true,
                    maximumAge: 1400,
                    timeout: 1400,
                });
                const { latitude: lat, longitude: lon } = coords;

                const data = await fetchWeatherByUserLocation(lat, lon);

                weatherDispatch({
                    type: WeatherForecastActionType.GET_WEATHER_FORECAST,
                    payload: { weatherForecast: data.list, city: data.city },
                });
            } catch (err: any) {
                console.error(err.message);
                weatherDispatch({ type: WeatherForecastActionType.LOADING, payload: false });
            }
        };
        fetchUserLocation();
    }, [weatherDispatch]);

    return (
        <WeatherContext.Provider value={{ weatherState, weatherDispatch }}>
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatcherForecastProvider;
