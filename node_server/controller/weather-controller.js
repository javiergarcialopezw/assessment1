const WeatherHandler = require("../handler/weather-handler");

class WeatherController {
  static async getCityWeatherForecast(req, res) {
    const inputs = req.query;

    const result = await WeatherHandler.getCityWeatherForecast(inputs);
    res.status(200).json(result);
  }
}

module.exports = WeatherController;
