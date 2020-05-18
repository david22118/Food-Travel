const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({

});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant
