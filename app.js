const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.cityName;

  //   res.send("Server is up and running");
  const API = "9fab290e65fa306070506943ee9344e9";
  const unit = "metric";
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    ",US&appid=" +
    API +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    //get the data and parse it to a JSON format
    response.on("data", function (data) {
      //   console.log(data); //buffer
      const weatherData = JSON.parse(data); //parse the buffer into JSON
      //   console.log(weatherData);
      //   console.log("==== Weather Data Here ====");
      const temp = weatherData.main.temp;
      //   console.log(temp + " degree celcius");
      const weatherDescription = weatherData.weather[0].description;
      //   console.log(weatherDescription);
      const icon = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The weather is currently " + weatherDescription + "</h1>");
      res.write(
        "<h3>The temperature in " +
          city +
          " is: " +
          temp +
          " degress celcius </h3>"
      );
      res.write("<img src =" + iconURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
