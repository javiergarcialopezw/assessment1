const redisConnector = require("../helper/redis-client");
const {
  getNearbyPlaces,
  getPlaceGeolocation,
} = require("../helper/google-maps-helper");

class MapsHandler {
  static async getCityGeoLocation(inputs) {
    const city = inputs["city"] || "Brisbane";

    const redisClient = await redisConnector();
    const redisKey = `getCityGeoLocation:${city}`

    const redisResult = await redisClient.get(redisKey);
    if (redisResult != null) {
      return JSON.parse(redisResult);
    }

    const geolocationResult = await getPlaceGeolocation(city);

    const tobeReturn =  {
      city: city,
      ...geolocationResult
    };

    await redisClient.setEx(redisKey, 1 * 60, JSON.stringify(tobeReturn));
    return tobeReturn;
  }

  static async searchNearbyPlaces(inputs) {
    const radius = inputs["radius"] || 1500;
    const placeType = inputs["place_type"];
    const placeKeyword = inputs["place_keyword"];
    const latitude = inputs['latitude'];
    const longitude = inputs['longitude'];

    const redisClient = await redisConnector();
    const redisKey = `searchNearbyPlaces:${JSON.stringify(inputs)}`

    const redisResult = await redisClient.get(redisKey);
    if (redisResult != null) {
      return JSON.parse(redisResult);
    }

    const nearbyPlacesResult = await getNearbyPlaces(
      radius,
      placeKeyword,
      placeType,
      latitude,
      longitude
    );

    await redisClient.setEx(redisKey, 1 * 60, JSON.stringify(nearbyPlacesResult));
    return nearbyPlacesResult;
  }

  static async getPlacesBasedOnWeather(inputs) {
    const places = [];
    let placeTypes = [];
    const weatherCode = inputs.weather_code;
    const cityLatitude = inputs.city_latitude;
    const cityLongitude = inputs.city_longitude;

    const redisClient = await redisConnector();
    const redisKey = `getPlacesBasedOnWeather:${JSON.stringify(inputs)}`

    const redisResult = await redisClient.get(redisKey);
    if (redisResult != null) {
      return JSON.parse(redisResult);
    }


    if (weatherCode >= 800 && weatherCode < 900) {
      placeTypes = ["tourist_attraction", "shopping_mall", "zoo", "cafe"];
    } else {
      return [];
    }

    const firstType = placeTypes[Math.floor(Math.random() * placeTypes.length)];
    const secondType = placeTypes[Math.floor(Math.random() * placeTypes.length)];

    const params = {
      radius: 2000,
      latitude: cityLatitude,
      longitude: cityLongitude,
    };

    const [firstResult, secondResult] = await Promise.all([
      this.searchNearbyPlaces({
        place_type: firstType,
        ...params
      }),
      this.searchNearbyPlaces({
        place_type: secondType,
        ...params
      })
    ]);

    // Push one of the element from firstResult array to places array, randomly
    places.push(firstResult[Math.floor(Math.random() * firstResult.length)])

    // Push one of the element from firstResult array to places array, randomly
    places.push(secondResult[Math.floor(Math.random() * firstResult.length)])

    await redisClient.setEx(redisKey, 5 * 60, JSON.stringify(places));
    return places;
  }

}

module.exports = MapsHandler;
