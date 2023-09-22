const requestIp = require("request-ip");
const appConfig = require("../config/app");
const HomeHandler = require("../handler/home-handler");
const redisConnector = require("../helper/redis-client");

class HomeController {
  static async home(req, res) {
    const clientIp = requestIp.getClientIp(req);
    const inputs = req.query;
    inputs["client_ip"] =
      appConfig.ENVIRONMENT === "dev" ? "101.183.245.57" : clientIp;

    const result = await HomeHandler.helloWorld(inputs);
    res.status(200).json(result);
  }

  static async getVisitCounter(req, res) {
    const redisClient = await redisConnector();
    let cachedVisitCounter = await redisClient.get("visitorCount");
    if (cachedVisitCounter == null) cachedVisitCounter = 0;

    res.status(200).json({
      visitor_count: cachedVisitCounter,
    });
  }
}

module.exports = HomeController;
