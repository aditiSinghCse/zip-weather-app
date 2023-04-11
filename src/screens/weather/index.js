import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBar from '../../components/SearchBar';
import WeatherCard from '../../components/WeatherCard';
import getConfig from 'next/config';
import moment from "moment";
import {capitaliseLine} from '../../utils/textFormatters';

const { serverRuntimeConfig } = getConfig();

const WeatherScreen = () => {
    const [zipCode, setZipcode] = useState('');
    const [error, setError] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY  = serverRuntimeConfig.apiKey;

    const searchWeather = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${API_KEY}&units=metric`)
        .then((res) => {
            console.log('res', res);
            setWeatherData(res.data);
        })
        .catch((error) => {
            console.log('error', error);
            setError(error.response.data.message);
            setWeatherData(null);
        });
    }

    return (
        <>
            <SearchBar searchlabel={'Zip Code:'} placeholder="Search Zipcode" searchValue={zipCode} onTextChange={(zip) => {
                if (error) {
                    setError('');
                }
                setZipcode(zip);
            }} onSearch={searchWeather} />
            {error && (
                <div className="city-weather">{capitaliseLine(error)}</div>
            )}
            {weatherData && (
                <div>
                    <div className="city-weather">
                        <h1>{weatherData.city.name}</h1>
                    </div>
                    <div className="weather-details">
                        {weatherData.list.map((item) => (
                            <WeatherCard
                                weatherBasics={{
                                    ...item.weather[0],
                                    dt_txt: item.dt_txt,
                                }}
                                weatherDetails={{
                                    ...item.main,
                                    ...item.wind,
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
};

export default WeatherScreen;