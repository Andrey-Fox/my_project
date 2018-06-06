const request = require('request');

var getWeather = (lat, lng, callback) => {

request({
  url: `https://api.darksky.net/forecast/961e94df2256d3e880fa27214639b45e/${lat},${lng}`,
  json: true
}, (error, response, body) => {
  if (error) {
    callback('Unable to connect to Darksky.net server.');
  } else if (response.statusCode === 400) {
    callback('Unable to fetch weather.');
  } else if (response.statusCode === 200) {
    callback(undefined, {
      temperature: body.currently.temperature,
      apparentTemperature: body.currently.apparentTemperature
    });
  }
});
};

module.exports.getWeather = getWeather;