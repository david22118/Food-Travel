const express = require("express");
const router = express.Router();
const request = require("request");
const ObjectId = require('mongoose').Types.ObjectId;
const Location = require('../model/location')
const Restaurant = require('../model/restaurant')
const Address = require('../model/address')
const Rating = require('../model/rating')
const Trip = require('../model/trip')
const googleApiKey = "AIzaSyBsrXjF-AT_Jk5UubAwSYcj2bO_XRbA3Xo";

router.get('/restaurants/:cityName', async function (req, res) {
    const cityName = req.params.cityName
    const cityId = await getCityId(cityName)
    const location = await getCityLocationById(cityId)
    const restaurants = await getRestaurantsByLocation(location)
    res.send(restaurants)
})

router.post('/restaurant/:tripId', function (req, res) {
    const restaurantData = req.body
    const tripId = req.params.tripId
    console.log(restaurantData)
    const newRestaurant = new Restaurant({
        restaurantName: restaurantData.restaurantName,
        location: new Location({
            longitude: restaurantData.location.longitude,
            latitude: restaurantData.location.latitude,
           // cityId: restaurantData.location.cityId
        }),
        address: new Address({
            street: restaurantData.address.street,
            postalCode: restaurantData.address.postalCode,
            locality: restaurantData.address.locality,
            country: restaurantData.address.country
        }),
        rating: new Rating({
            ratingValue: restaurantData.rating.ratingValue,
            reviewCount: restaurantData.rating.ratingValue
        }),
        photo: restaurantData.photo,
        marketingOffer: restaurantData.marketingOffer,
        cuisine: restaurantData.cuisine
    })
    newRestaurant.save(function (error, restaurant) {
        Trip.findById({ _id: ObjectId(tripId) }, function (error, trip) {
            trip.restaurants.push(restaurant)
            trip.save(function (error, t) {
                res.send(t)
            })
        })
    })
})
router.delete('/restaurant/:restaurantId/:tripId', function (req, res) {
    const restaurantId = req.params.restaurantId
    const tripId = req.params.tripId
    Trip.find({ _id: tripId }, function (trip) {
        const i = trip.restaurants.findIndex(r => r._id == restaurantId)
        trip.restaurants.splice(i, 1)
        trip.save(function (t) {
            Trip.find({}, function (trips) {
                res.send(trips)
            })
        })
    })
})

function getCityId(cityName) {
    const apiURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${cityName}&inputtype=textquery&key=${googleApiKey}`
    return new Promise((resolve, reject) => {
        request(apiURL, function (error, response, body) {
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
                        ratingValue: r.aggregateRatings.thefork.ratingValue || getRandom(),
                        reviewCount: r.aggregateRatings.thefork.reviewCount
                    }),
                    photo: r.mainPhotoSrc,
                    marketingOffer: r.marketingOffer ? r.marketingOffer.title : '',
                    cuisine: r.servesCuisine ? r.servesCuisine : ''
                })
                return restaurant
            })
            return resolve(restaurants)
        })
    })
}
function getRandom() {
    const n = Math.floor(Math.random() * 10)
    if (n < 5)
        return n + 5
    return n
}

module.exports = router;