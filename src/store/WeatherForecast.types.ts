export interface WeatherForecastState {
    weatherForecastList: [] | WeatherData[];
    city: undefined | CityData;
    error: boolean;
    errorMessage: string;
    loading: boolean;
}

export type ProviderValue = {
    weatherState: WeatherForecastState;
    weatherDispatch: (action: WeatherForecastActions) => void;
};

export type FetchWeatherForecast = {
    type: WeatherForecastActionType.GET_WEATHER_FORECAST;
    payload: {
        weatherForecast: WeatherData[];
        city: CityData;
    };
};

export type Loading = {
    type: WeatherForecastActionType.LOADING;
    payload: boolean;
};
export type Error = {
    type: WeatherForecastActionType.ERROR;
    payload: {
        isError: boolean;
        errorMessage: string;
    };
};

export type WeatherForecastActions = FetchWeatherForecast | Error | Loading;

export enum WeatherForecastActionType {
    GET_WEATHER_FORECAST,
    LOADING,
    ERROR,
}

export interface ApiResponse {
    data: {
        cod: string;
        message: number;
        cnt: number;
        list: WeatherData[];
        city: CityData;
    };
}

export interface WeatherData {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: [
        {
            id: number;
            main: string;
            description: string;
            icon: string;
        }
    ];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
        pod: string;
    };
    dt_txt: string;
}

export interface CityData {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
}
