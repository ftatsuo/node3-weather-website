const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6c006a64061bf68b1437efdaadc031ad&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        `its currently ${body.current.temperature} degrees. 
        it feels like ${body.current.feelslike} degrees.
        humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
