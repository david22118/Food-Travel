const express = require("express");
const moment = require('moment')
const path = require("path");
const request = require('request')
const Travel = require("./server/model/travel.js")
const axios = require('axios')
const mongoose = require('mongoose')
 mongoose.connect('mongodb://localhost/TravelDB', { useNewUrlParser: true,useUnifiedTopology:true }) 

const bodyParser = require("body-parser");
const api = require('./server/routes/api')
const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', api)


const port = 8080

 
app.listen(port, function () {
  console.log(`serever is running on port ${port}`);
  

});
