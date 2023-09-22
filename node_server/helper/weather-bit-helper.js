const appConfig = require("../config/app");
const axios = require("axios");

const WEATHER_URL = "https://api.weatherbit.io/v2.0/";
async function getForecast(days, latitude, longitude) {
  const weatherResult = await axios.get(`${WEATHER_URL}/forecast/daily`, {
    params: {
      days: days,
      lat: latitude,
      lon: longitude,
      key: appConfig.WEATHER_BIT_API_KEY,
    },
  });

  const tobeReturn = [];
  const weatherData = weatherResult.data.data;

  weatherData.forEach((data) => {
    tobeReturn.push({
      "datetime": data.datetime,
      "weather": data.weather,
    });
  })

  return tobeReturn;
}

module.exports = getForecast;
