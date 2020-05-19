const express = require("express");
const router = express.Router();
const request = require("request");
const Location = require('../model/location')
const Restaurant = require('../model/restaurant')
const Address = require('../model/address')
const Rating = require('../model/rating')
const googleApiKey = "AIzaSyBsrXjF-AT_Jk5UubAwSYcj2bO_XRbA3Xo";

router.get('/restaurants/:cityName', async function (req, res) {
    const cityName = req.params.cityName
    const cityId = await getCityId(cityName)
    const location = await getCityLocationById(cityId)
    const restaurants = await getRestaurantsByLocation(location)

    res.send(restaurants)
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
    }
    return new Promise((resolve, reject) => {
        request(locationsApiUrl, function (error, response, body) {
            if (error) throw new Error(error);
            const coordinates = JSON.parse(body).coordinates
            const cityId = JSON.parse(body).id_city
            const location = new Location({
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                cityId: cityId
            })
            console.log(location);
            return resolve(location)
        })
    })

}

function getRestaurantsByLocation(location) {
    const restaurantsApiUrl = {
        "async": true,
        "crossDomain": true,
        "url": `https://thefork.p.rapidapi.com/restaurants/list?pageNumber=1&queryPlaceValueCoordinatesLongitude=${location.longitude}&pageSize=10&queryPlaceValueCoordinatesLatitude=${location.latitude}&queryPlaceValueCityId=${location.cityId}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "thefork.p.rapidapi.com",
            "x-rapidapi-key": "9c978dd43cmsh1b3d31ae1936130p18cfafjsn625da2ea9f8a"
        }
    }
    return new Promise((resolve, reject) => {
        request(restaurantsApiUrl, function (error, response, body) {
            if (error) throw new Error(error)
            const data = JSON.parse(body).data
            const restaurants = data.map(r => {
                const restaurant = new Restaurant({
                    restaurantName: r.name,
                    location: location,
                    address: new Address({
                        street: r.address.street,
                        postalCode: r.address.postalCode,
                        locality: r.address.locality,
                        country: r.address.country
                    }),
                    rating: new Rating({
                        ratingValue: r.aggregateRatings.thefork.ratingValue,
                        reviewCount: r.aggregateRatings.thefork.reviewCount
                    }),
                    photo: r.mainPhotoSrc,
                    marketingOffer: r.marketingOffer ? r.marketingOffer.title : '',
                    cuisine: r.servesCuisine
                })
                return restaurant
            })
            return resolve(restaurants)
        })
    })
}

module.exports = router;