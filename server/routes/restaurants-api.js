const express = require("express");
const router = express.Router();
const urllib = require("urllib");
const moment = require("moment");
const request = require("request");
const axios = require("axios");
const googleApiKey = "AIzaSyBsrXjF-AT_Jk5UubAwSYcj2bO_XRbA3Xo";

router.get('/restaurants/:cityName', async function (req, res) {
    const cityName = req.params.cityName
    const cityId = await getCityId(cityName)


    console.log(a);
    res.send(a)
})

function getCityId(cityName) {
    const apiURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${cityName}&inputtype=textquery&key=${googleApiKey}`
    return new Promise((resolve, reject) => {
        request(apiURL, function (error, response, body) {
            //console.log(response)
            const id = JSON.parse(body).candidates[0].place_id
            return resolve(id)
        })
    })
}
function getCityLocationById(cityId) {
    const locationsApiUrl = {
        method: 'GET',
        url: 'https://thefork.p.rapidapi.com/locations/list',
        qs: { google_place_id: cityId },
        headers: {
            'x-rapidapi-host': 'thefork.p.rapidapi.com',
            'x-rapidapi-key': '9c978dd43cmsh1b3d31ae1936130p18cfafjsn625da2ea9f8a',
            useQueryString: true
        }
    };
    request(locationsApiUrl, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    });
}
//getCityLocationById('ChIJdd4hrwug2EcRmSrV3Vo6llI')

module.exports = router;