const express = require("express");
const moment = require('moment')
const path = require("path");
const request = require('request')
const axios = require('axios')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const tripsApi = require('./server/routes/trips-api')
const restaurantsApi = require('./server/routes/restaurants-api')
const app = express();

mongoose.connect('mongodb://localhost/TravelDB', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', tripsApi)
app.use('/', restaurantsApi)

const port = 8080

app.listen(port, function () {
  console.log(`serever is running on port ${port}`);
});
