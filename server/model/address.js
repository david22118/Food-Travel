const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({

});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address