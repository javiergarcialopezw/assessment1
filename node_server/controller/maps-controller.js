const MapsHandler = require("../handler/maps-handler");

class MapsController {
  static async searchNearbyPlaces(req, res) {
    const inputs = req.query;

    const result = await MapsHandler.searchNearbyPlaces(inputs);
    res.status(200).json(result);
  }
}

module.exports = MapsController;
