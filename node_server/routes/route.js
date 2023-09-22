const { Router } = require("express");
const HomeController = require("../controller/homeController");
const MapsController = require("../controller/maps-controller");
const WeatherController = require("../controller/weather-controller");
const { visitCounter } = require("../helper/visit-counter");

const router = Router();

router.get("/", visitCounter, HomeController.home);
router.get("/v1/search-nearby-places", visitCounter, MapsController.searchNearbyPlaces);
router.get("/v1/city-weather-forecast", visitCounter, WeatherController.getCityWeatherForecast);
router.get("/v1/visit-counter", HomeController.getVisitCounter);


module.exports = router;