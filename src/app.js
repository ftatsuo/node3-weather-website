const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "weather", name: "fernando" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    pic: "/img/brad.jpg",
    name: "fernando",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    helpText: "helpful text",
    name: "fernando",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must provide an address" });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location = {} }) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "fernando",
    errorMessage: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "fernando",
    errorMessage: "page not found",
  });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
