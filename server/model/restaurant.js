const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    restaurantId:  String,
    restaurantName: String,
    location: Location,
    address : Address,
    rating : Rating,
    photo:String,
    marketingOffer : String,
    cuisine :String
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant
