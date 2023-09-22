import "../CSS/home.css";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ResultBox from "../component/result-box";

async function getResult(city, days) {
  const response = await fetch(
    `http://localhost:9000/v1/city-weather-forecast?city=${city}&days=${days}`,
    {
      mode: "cors",
    }
  );

  const data = await response.json();
  return data;
}

function ResultScreen() {
  const [response, setResponse] = useState(null);
  let [searchParams, _] = useSearchParams(); // to get the search params in the button for centered input from home page
  useEffect(() => {
    const city = searchParams.get("city");
    const days = searchParams.get("days");

    getResult(city, days)
      .then((data) => {
        setResponse(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {response ? (
        <div
          className="Home"
          style={{
            padding: "20px",
            paddingBottom: "0px",
          }}
        >
          {response.forecast.map((item) => (
            <ResultBox data={item} />
          ))}
        </div>
      ) : (
        <div
          className="Home"
          style={{
            padding: "20px",
            paddingBottom: "0px",
          }}
        >
          <p>Sorry, our API is not generate any data right now</p>
        </div>
      )}
    </div>
  );
}

export default ResultScreen;
