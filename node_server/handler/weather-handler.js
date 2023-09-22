const getForecast = require("../helper/weather-bit-helper");
const redisConnector = require("../helper/redis-client");
const MapsHandler = require("./maps-handler");

class WeatherHandler {
  static async getCityWeatherForecast(inputs) {
    const days = inputs.days || 7;
    const city = inputs.city || "Brisbane";

    // Wait for redis client to be connected before going forward
    const redisClient = await redisConnector();
    const redisKey = `getCityWeatherForecast:${days}:${city}`

    const redisResult = await redisClient.get(redisKey);
    if (redisResult != null) {
      return JSON.parse(redisResult);
    }

    const geolocationResult = await MapsHandler.getCityGeoLocation({ city: city });
    const latitude = geolocationResult.latitude;
    const longitude = geolocationResult.longitude;

    const forecastData = await getForecast(days, latitude, longitude);
    for (const forecast of forecastData) {
      const places = await MapsHandler.getPlacesBasedOnWeather({
        city_latitude: latitude,
        city_longitude: longitude,
        weather_code: forecast.weather.code
      });

      forecast['places'] = places;
    }

    const tobeReturn = {
      city: city,
      forecast_days: days,
      forecast: forecastData
    }

    await redisClient.setEx(redisKey, 1 * 60, JSON.stringify(tobeReturn));
    return tobeReturn;
  }
}

module.exports = WeatherHandler;
