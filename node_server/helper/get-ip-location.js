const ipLocation = require("iplocation");

async function getIpLocation(ip) {
  const data = await (async () => {
    return ipLocation(ip);
  })();

  return {
    city: data.city,
    region: data.region.name,
    latitude: data.latitude,
    longitude: data.longitude,
  };
}

module.exports = {
  getIpLocation,
};
