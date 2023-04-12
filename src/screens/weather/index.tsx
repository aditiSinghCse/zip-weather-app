import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBar from '../../components/SearchBar';
import WeatherCard from '../../components/WeatherCard';
import { useRouter } from "next/router";
import {capitaliseLine} from '../../utils/textFormatters';
import { GetServerSidePropsContext } from 'next';


const WeatherScreen = (props: any) => {
    let { data, error } = props;
    const router = useRouter();
    const [zipCode, setZipcode] = useState('');
    const [errorText, setError] = useState(error);
    const [weatherData, setWeatherData] = useState(data);

    useEffect(() => {
        setWeatherData(data);
        if (data === null) {
            setError('Invalid zip code.')
        }
    }, [router.query.zipcode]);

    return (
        <>
            <SearchBar searchlabel={'Zip Code:'} placeholder="Search Zipcode" searchValue={zipCode} onTextChange={(zip) => {
                if (errorText) {
                    setError('');
                }
                setZipcode(zip);
            }} onSearch={() => {
                router.push(`/weather/${zipCode}`)
            }} />
            {errorText && (
                <div className="city-weather">{capitaliseLine(errorText)}</div>
            )}
            {weatherData && (
                <div>
                    <div className="city-weather">
                        <h1>{weatherData.city.name}</h1>
                    </div>
                    <div className="weather-details">
                        {weatherData.list.map((item: any, idx: number) => (
                            <WeatherCard
                                key={idx}
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
    );
};

WeatherScreen.getServerSideProps = async (context: GetServerSidePropsContext): Promise<{ props: any }> => {
    let data = null;
      let error = '';
      try {
          await axios.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${context.query.zipcode}&appid=${process.env.apiKey}&units=metric`)
          .then((res) => {
              data = res.data;
          })
          .catch((error) => {
              error = error.response.data.message;
          });
      } catch(e) {
        error = JSON.stringify(e);
      }
      return {
          props: {
              data,
              error,
          }
      }
}

export default WeatherScreen;