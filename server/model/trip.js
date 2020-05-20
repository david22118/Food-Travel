const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    title: String,
    restaurants: [{ type: Schema.Types.String, ref: 'Restaurant' }]
});

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip
