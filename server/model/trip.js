const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({

});

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip
