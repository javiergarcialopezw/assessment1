const redisConnector = require("./redis-client");

async function visitCounter(req, res, next) {
  const redisClient = await redisConnector();
  await redisClient.incrBy("visitorCount", 1);

  next()
}

module.exports = {
  visitCounter
}
