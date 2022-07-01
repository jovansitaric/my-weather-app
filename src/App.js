import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [lat, setLat] = useState([]);
    const [lon, setLon] = useState([]);
    const [fetchUrl, setFetchUrl] = useState('');
    const [weatherData, setWeatherData] = useState([]);

    const fetchWithLocation = (event) => {
        event.preventDefault();

        const locationUrl = `${REACT_APP_API_URL}/weather/q?=`;
        
        // axios.get()
    };

    return (
        <form className="app" onSubmit={fetchWithLocation}>
            <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Enter Location"
            />
            <button>Geo Location</button>
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
