const appConfig = require("../config/app");
const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

async function getPlaceGeolocation(city) {
  let result = {
    place_id: "",
    latitude: null,
    longitude: null,
  };

  try {
    const geocodeResult = await client.geocode({
      params: {
        address: city,
        key: appConfig.GOOGLE_MAPS_API_KEY,
      },
    });

    const geolocationData = geocodeResult.data.results[0];

    result = {
      place_id: geolocationData.place_id,
      latitude: geolocationData.geometry.location.lat,
      longitude: geolocationData.geometry.location.lng,
    };
  } catch (e) {
    console.error(e);
  } finally {
    return result;
  }
}

async function getNearbyPlaces(
  radius,
  placeKeyword,
  placeType,
  latitude,
  longitude
) {
  let result = [];
  try {
    const nearbyResult = await client.placesNearby({
      params: {
        location: {
          lat: latitude,
          lng: longitude,
        },

        radius: radius,
        keyword: placeKeyword,
        types: placeType,

        key: appConfig.GOOGLE_MAPS_API_KEY,
      },
      timeout: 1000, // milliseconds
    });

    const data = nearbyResult.data.results;
    const promises = data.map(async (place) => {
      result.push({
        name: place.name,
        geometry: place.geometry,
        photos: place.photos,
        rating: place.rating,
        address: place.vicinity,
      });
    });

    Promise.all(promises);
  } catch (e) {
    console.error(e);
  } finally {
    return result;
  }
}

module.exports = {
  getNearbyPlaces,
  getPlaceGeolocation,
};
