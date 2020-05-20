const express = require("express");
const router = express.Router();
const Trip = require('../model/trip')
const Location = require('../model/location')
const Restaurant = require('../model/restaurant')
const Address = require('../model/address')
const Rating = require('../model/rating')

router.get('/trips', function (req, res) {
    City.find({}, function (error, trips) {
        res.send(trips)
    })
})

router.post('/trip', function (req, res) {
    const trip = new Trip({
        restaurants: []
    })
    trip.save(function (error, t) {
        res.send(t)
    })
})

router.delete('/trip/:tripId', function (req, res) {
    const tripId = req.params.tripId
    Trip.deleteOne({ id: tripId }, function (error, deletedTrip) {
        Trip.find({}, function (error, trips) {
            console.log(deletedTrip)
            res.send(trips)
        })
    })
})

router.put('/trips/:tripId', (req, res) => {
    const tripId = req.params.tripId
    const newRestaurants = req.body.restaurants
    Trip.find({ id: tripId }, function (error, trip) {
        trip.restaurants = newRestaurants
        res.send(trip)
    })
})

module.exports = router;
