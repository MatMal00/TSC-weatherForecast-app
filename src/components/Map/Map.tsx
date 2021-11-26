import { useContext, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { WeatherContext } from 'src/store/WeatherForecast.context';
import { WeatherForecastActionType } from 'src/store/WeatherForecast.types';
import { fetchWeatherByUserLocation } from 'src/store/WeatherForecast.services';
import styles from './Map.module.scss';

const containerStyle = {
    marginTop: '50px',
    width: '100%',
    height: '300px',
};

const Map = () => {
    const [isMarker, setIsMarker] = useState(false);
    const { weatherState, weatherDispatch } = useContext(WeatherContext);
    const { city, error } = weatherState;

    if (Boolean(weatherState.city?.coord) && !isMarker) setIsMarker(true);
    if (!Boolean(weatherState.city?.coord) && isMarker) setIsMarker(false);

    const [position, setPosition] = useState({
        lat: city?.coord.lat ?? 52.237049,
        lng: city?.coord.lon ?? 21.017532,
    });

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_MAP_KEY!,
    });

    const setMarker = async (event: google.maps.MapMouseEvent) => {
        try {
            weatherDispatch({ type: WeatherForecastActionType.LOADING, payload: true });

            if (!event?.latLng?.lat() || !event?.latLng?.lng())
                throw new Error('Something went wrong');

            const data = await fetchWeatherByUserLocation(event.latLng.lat(), event.latLng.lng());

            weatherDispatch({
                type: WeatherForecastActionType.GET_WEATHER_FORECAST,
                payload: { weatherForecast: data.list, city: data.city },
            });
            setPosition({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            });
            setIsMarker(true);
        } catch (err: any) {
            weatherDispatch({
                type: WeatherForecastActionType.ERROR,
                payload: {
                    isError: true,
                    errorMessage: err.message,
                },
            });
        }
    };

    return isLoaded ? (
        <div id="map" className={styles.map}>
            <GoogleMap
                onClick={setMarker}
                mapContainerStyle={containerStyle}
                center={position}
                zoom={10}
                options={{ streetViewControl: false }}>
                {isMarker && !error && <Marker position={position}></Marker>}
            </GoogleMap>
        </div>
    ) : null;
};

export default Map;
