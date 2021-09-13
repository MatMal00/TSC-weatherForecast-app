import { useContext, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { WeatherContext } from "@store/WeatherForecast.context";
import { WeatherForecastActionType } from "@store/WeatherForecast.types";
import { fetchWeatherByUserLocation } from "@store/WeatherForecast.services";

const containerStyle = {
  width: "100%",
  height: "300px",
  marginTop: "50px",
};

const Map = () => {
  const { weatherState, weatherDispatch } = useContext(WeatherContext);
  const { city } = weatherState;

  const [position, setPosition] = useState({
    lat: city?.coord.lat ?? 0,
    lng: city?.coord.lon ?? 0,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_MAP_KEY!,
  });

  const setMarker = async (event: google.maps.MapMouseEvent) => {
    try {
      weatherDispatch({
        type: WeatherForecastActionType.LOADING,
        payload: true,
      });

      const data = await fetchWeatherByUserLocation(
        event.latLng.lat(),
        event.latLng.lng()
      );

      weatherDispatch({
        type: WeatherForecastActionType.GET_WEATHER_FORECAST,
        payload: { weatherForecast: data.list, city: data.city },
      });
      setPosition({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
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
    <GoogleMap
      onClick={setMarker}
      mapContainerStyle={containerStyle}
      center={position}
      zoom={10}
      options={{ streetViewControl: false }}
    >
      <Marker position={position}></Marker>
    </GoogleMap>
  ) : null;
};

export default Map;
