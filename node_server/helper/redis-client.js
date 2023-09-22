const { createClient } = require('redis');
const appConfig = require('../config/app.js');

async function connectRedisClient() {
  const client = createClient({
    url: `${appConfig.REDIS.HOST}:${appConfig.REDIS.PORT}`,
  });

  client.on('error', (err) => console.log('Redis Client Error single', err));
  await client.connect()
  return client;
}

module.exports = connectRedisClient;
