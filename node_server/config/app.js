require("dotenv").config();
const appConfig = {
  PORT: +process.env.APP_PORT || 8000,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || "",
  WEATHER_BIT_API_KEY: process.env.WEATHER_BIT_API_KEY || "",
  ENVIRONMENT: process.env.NODE_ENV || "dev",
  REDIS: {
    HOST:  process.env.REDIS_HOST || "",
    PORT: process.env.REDIS_PORT || 6379,
  }
};

module.exports = {
  ...appConfig,
};
