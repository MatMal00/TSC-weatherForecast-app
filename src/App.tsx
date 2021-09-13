import { useContext, useEffect } from 'react';
import { WeatherContext } from '@store/WeatherForecast.context';
import { fetchWeatherByUserLocation } from '@store/WeatherForecast.services';
import { WeatherForecastActionType } from '@store/WeatherForecast.types';
import Title from '@components/Title/Title';
import Searcher from '@components/Searcher/Searcher';
import WeatherForecast from '@components/WeatherForecast/WeatherForecast';
import Loader from '@components/Loader/Loader';
import Map from '@components/Map/Map';
import './App.scss';

const getPosition = (options?: PositionOptions): Promise<GeolocationPosition> =>
    new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );

const Weathercast = () => {
    const { weatherState, weatherDispatch } = useContext(WeatherContext);
    const { weatherForecastList, loading, error, errorMessage } = weatherState;
    const currentLocation = Boolean(weatherState.city?.name);

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
        <div className="container">
            <Title />
            <div className="center">
                {!loading && <Searcher />}
                {weatherForecastList.length > 0 && !loading && !error ? <WeatherForecast /> : null}
                {!loading && !error && currentLocation && <Map />}
                {loading && <Loader />}
                {error && <p className="error">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Weathercast;
