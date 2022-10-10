const mongoose = require('mongoose')



const hotalScheem = new mongoose.Schema({
    
        name: String,
        currency: String,
        price: Number,
        starRating: Number,
        description: Object,
        phoneNumbers: [
          String
        ],
        emails: [
          String
        ],
        images: [Object],
        address: Object,
        location: Object,
        amenities: [Object],
        roomCount: Number,
        checkIn: Object,
        checkOut: Object,
        createdAt: String,
        updatedAt: String,
        roomTypes: [Object]
      
})


const Hotalmodel = mongoose.model('Hotal',hotalScheem)

module.exports = {Hotalmodel}