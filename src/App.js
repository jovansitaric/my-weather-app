import React, { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const url = `${process.env.REACT_APP_API_URL}/weather?q=${location},rs&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;

    const searchLocation = (event) => {

        event.preventDefault();

        axios.get(url).then((response) => {
            setData(response.data);
            console.log(response.data);
        });
        setLocation('');
    };

    return (
        <form className="app" onSubmit={searchLocation}>
            <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Enter Location"
            />
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
