const express = require("express");
const router = express.Router();
const urllib = require("urllib");
const moment = require("moment");
const request = require("request");
const axios = require("axios");
const googleKey = "AIzaSyBsrXjF-AT_Jk5UubAwSYcj2bO_XRbA3Xo";


router.get('/restaurants/:cityName', async function(req, res){
    const cityName = req.params.cityName
    restaurants = []
    res.send(restaurants)
})

module.exports = router;