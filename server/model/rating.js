const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    ratingValue: Number,
    reviewCount: Number
});

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating