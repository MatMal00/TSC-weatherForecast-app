import { useReducer } from 'react';
import { createContext } from 'react';
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
        default:
            return state;
    }
};

const WeatchercastProvider: React.FC = ({ children }) => {
    const [weatherState, weatherDispatch] = useReducer(reducer, initialState);

    return (
        <WeatherContext.Provider value={{ weatherState, weatherDispatch }}>
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatchercastProvider;