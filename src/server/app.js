const dotenv = require('dotenv');
dotenv.config();
//You need to add a .env file with the personal keys I provided in the submission comments
const pixabayKey = process.env.pixabayKey;
const weatherKey = process.env.weatherKey;
const geoname = process.env.geoname;

let projectData = {};

var FormData = require('form-data');
var path = require('path')

const express = require("express");
const app = express();

const fetch = require('node-fetch');
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'))
console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile(path.resolve("dist/index.html"));
})

const https = require("https");
const http = require("http");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/postData', postData);

// async function to make the 3 API calls, add desired values to properties inside ProjectData,
// and send it back to the client side
async function postData(req, res) {
  let city = req.body.City;
  let d = new Date(req.body.Date);
  let today = new Date();
  const diffTime = Math.abs(today - d);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const forecast = diffDays > 7;

  let geonameapi = {};
  const getCoordinates = async() => {
      const result = await fetch(("http://api.geonames.org/searchJSON?q=" + city + "&maxRows=1&username=" + geoname), { method: 'GET' })
      try {
          const location = await result.json();
          console.log(location);
          geonameapi = {
              lng: location.geonames[0].lng,
              lat: location.geonames[0].lat,
          }
          console.log(geonameapi);
      } catch (error) {
          console.log("API Geonames failed", error);
      }
  }
  await getCoordinates(city);

  let weatherbit = {};
  const getWeatherbit = async() => {

      const result = await fetch(("http://api.weatherbit.io/v2.0/forecast/daily?" + "lat=" + geonameapi.lat + "&lon=" + geonameapi.lng + "&key=" + weatherKey + "&units=M"), { method: 'GET' })
      try {
          const data = await result.json();
          console.log(data);
          weatherbit = {
              temp: forecast?data.data[diffDays].temp:data.data[0].temp,
              weather: forecast?data.data[diffDays].weather.description:data.data[0].weather.description,
              icon: forecast?data.data[diffDays].weather.icon:data.data[0].weather.icon
          }
      } catch (error) {
          console.log("API Weatherbit failed", error);
      }
  }
  await getWeatherbit();

  let pixabay = ' ';
  const getImage = async() => {
      const result = await fetch("https://pixabay.com/api/?key=" + pixabayKey + "&q=" + city + "&image_type=photo")
      try {
          const data = await result.json();
          console.log(data);
          pixabay = {
              img: data.hits[0].webformatURL
          }
      } catch (error) {
          console.log("API Pixabay failed ", error);
      }
  }
  await getImage();

  projectData = {
      temp: weatherbit.temp,
      weather: weatherbit.weather,
      icon: weatherbit.icon,
      img: pixabay.img,
      daysDiff: diffDays,
      place: city,
  }
  res.send(projectData);
  console.log(projectData);
}
try { console.log('API working') } catch (error) {
  console.log("postData function is not completed", error);
};

// GET route
app.get('/all', sendData);

function sendData(request, response) {
  response.send(projectData);
  console.log(projectData);
};

module.exports = app;