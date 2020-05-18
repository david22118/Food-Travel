const express = require("express");
const router = express.Router();
const urllib = require("urllib");
const moment = require("moment");
const request = require("request");
const City = require("../model/travel");
const mongoose = require("mongoose");
const axios = require("axios");
mongoose.connect("mongodb://localhost/TravelDB", { useNewUrlParser: true });
const googleKey = "AIzaSyBsrXjF-AT_Jk5UubAwSYcj2bO_XRbA3Xo";


module.exports = router;
