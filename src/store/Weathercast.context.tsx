import { useReducer } from 'react';
import { createContext } from 'react';

export const WeatherContext = createContext('');

const initialState = {};

const weatherReducer = (state: any, { type, payload }: any) => {
    return '';
};

const WeatchercastProvider: React.FC = ({ children }) => {
    const [weatherState, dispatch] = useReducer(weatherReducer, 'initialState');

    return <WeatherContext.Provider value={weatherState }>{children}</WeatherContext.Provider>;
};

export default WeatchercastProvider;
