import React from "react";

const WeatherDetails = ({
    weatherDetails = {}
}) => {
    return (
        <div className="details-wrapper">
            <div className="info-wrapper">
                <label className="info-label">Max Temp:</label>
                <label className="info-label">{`${(weatherDetails.temp_max).toFixed(1)} `}&#8451;</label>
            </div>
            <div className="info-wrapper">
                <label className="info-label">Min Temp:</label>
                <label className="info-label">{`${(weatherDetails.temp_min).toFixed(1)} `}&#8451;</label>
            </div>
            <div className="info-wrapper">
                <label className="info-label">Humidity</label>
                <label className="info-label">{`${(weatherDetails.humidity).toFixed(1)} %`}</label>
            </div>
            <div className="info-wrapper">
                <label className="info-label">Pressure</label>
                <label className="info-label">{`${(weatherDetails.pressure).toFixed(1)} mb`}</label>
            </div>
            <div className="info-wrapper">
                <label className="info-label">Wind</label>
                <label className="info-label">{`${(weatherDetails.speed).toFixed(1)} km/h`}</label>
            </div>
        </div>
    );
};

export default WeatherDetails;