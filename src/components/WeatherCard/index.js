import React, { useState } from "react";
import { capitaliseLine } from "@/src/utils/textFormatters";
import moment from "moment";
import WeatherDetails from "../WeatherDetails";

const WeatherCard = ({
    weatherBasics = {},
    weatherDetails = {},
}) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <div style = {{ backgroundColor: '#1b8de0', padding: '10px', margin: '10px', width: '250px', height: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>
                <img src={`https://openweathermap.org/img/wn/${weatherBasics.icon}.png`} width={'100px'} height={'100px'} style={{ alignSelf: 'center' }}/>
                <label style={{ fontSize: '20px' }}>{`${(weatherDetails.temp).toFixed(1)} `}&#8451;</label>
                <label style={{ color: '#393a45' }}>{capitaliseLine(weatherBasics.description)}</label>
                <label style={{ color: '#393a45' }}>{moment(weatherBasics.dt_txt).format('MMM DD, YYYY | hh:mm A')}</label>
            </div>
            <label className="more-text" onClick={() => setShowMore(!showMore)}>{`${showMore ? '-' : '+'} Show ${showMore ? 'Less' : 'More'}`}</label>
            {showMore && (
                <WeatherDetails weatherDetails={weatherDetails} />
            )}
        </div>
    );
}

export default WeatherCard;