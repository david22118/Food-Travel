const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    street:  String,
    postalCode: String,
    locality:String,
    country:String
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address