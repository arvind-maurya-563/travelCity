const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
        url: String,
        img_url: String,
        car_name: String,
        car_type: String,
        capacity: Number,
        price: Number
});

const carModel = mongoose.model("Cars", carSchema);

module.exports = {carModel};
