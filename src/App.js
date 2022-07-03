import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

import "./App.css";
import Button from "./components/Button";

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [lat, setLat] = useState([]);
    const [lon, setLon] = useState([]);
    const [fetchUrl, setFetchUrl] = useState('');
    const [weatherData, setWeatherData] = useState([]);

    const fetchWithLocation = (event) => {
        console.log('fetchWithLocation');
        event.preventDefault();

        const locationUrl = `${process.env.REACT_APP_API_URL}/weather?q=${location}&units=${process.env.REACT_APP_UNITS}&appid=${process.env.REACT_APP_API_KEY}`;

        axios.get(locationUrl)
            .then((response) => {
                console.log(response);
                setData(response.data);
                setLocation('');
            })
            .catch((error) => {
                console.log(error);
        });
    };

    const fetchWithGeoLocation = () => {
        console.log('fetchWithGeoLocation');

        if (!navigator.geolocation) return alert("Browser can't get location");

        const getGeoLocation = new Promise((resolve, reject) => {

            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error)
            );
        });

        getGeoLocation
            .then((position) => {
                setLat(() => position.coords.latitude);
                setLon(() => position.coords.longitude);
            })
            .then(() => {

                const geoLocationUrl = `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${lon}&units=${process.env.REACT_APP_UNITS}&appid=${process.env.REACT_APP_API_KEY}`;

                axios.get(geoLocationUrl)
                    .then((response) => {
                        console.log(response);
                        setData(response.data);
                        setLocation('');
                    })
                    .catch((error) => {
                        console.log(error);
                });
            });
    };

    return (
        <form className="app" onSubmit={fetchWithLocation}>
            <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Enter Location"
            />
            <Button fetchWithGeoLocation={fetchWithGeoLocation}>Geo Location</Button>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp}</h1> : null}
                    </div>
                    <div className="description">
                        {data.main ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>
                {data.name != undefined &&
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? <p className="bold">{data.main.feels_like}</p> : null}
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            {data.main ? <p className="bold">{data.main.humidity}</p> : null}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.main ? <p className="bold">{data.wind.speed}</p> : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                }
            </div>
        </form>
    );
}

export default App;
