const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    restaurantId:  String,
    restaurantName: String,
    location: location,
    address : address,
    rating : rating,
    photo:String,
    marketingOffer : String,
    cuisine :String
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant
