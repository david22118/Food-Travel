const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TravelSchema = new Schema({
 
});

const Travel = mongoose.model("Travel", TravelSchema);

module.exports = Travel;
