const mongoose = require("mongoose");
const Location = require('./location').schema
const Address = require('./address').schema
const Rating = require('./rating').schema
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    _id:String,
    restaurantName: String,
    location: Location,
    address: Address,
    rating: Rating,
    photo: String,
    marketingOffer: String,
    cuisine: String,
},{_id:false});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant
