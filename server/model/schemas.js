const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    restaurantId:  String,
    restaurantName: String,
    location: location,
    address : address,
    rating : rating,
    photo:String,
    marketingOffer : String,
    cuisine :String
})
const  locationSchema = new Schema({
    longitude:  String,
    latitude: String,
    cityId:String,
})
const  addressSchema = new Schema({
    street:  String,
    postalCode: String,
    locality:String,
    country:String
})
const  ratingSchema = new Schema({
    ratingValue:  Number,
    reviewCount: Number
    
})
const restaurant  = mongoose.model("restaurant", restaurantSchema)
module.exports = restaurant
const location  = mongoose.model("location", locationSchema)
module.exports = location 
const address  = mongoose.model("address", addressSchema)
module.exports =address
const rating  = mongoose.model("rating", ratingSchema)
module.exports =rating