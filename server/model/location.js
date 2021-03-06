const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    longitude: String,
    latitude: String,
    cityId: String
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location