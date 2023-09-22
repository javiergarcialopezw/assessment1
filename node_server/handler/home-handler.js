const { getIpLocation } = require("../helper/get-ip-location");

class HomeHandler {
  static async helloWorld(inputs) {
    const currentLocation = await getIpLocation(inputs.client_ip);
    return { message: `Hello World`, location: currentLocation };
  }
}

module.exports = HomeHandler;
