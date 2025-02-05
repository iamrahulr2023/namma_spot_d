const mongoose = require('mongoose');

const MapSchema = new mongoose.Schema({
    
    locations: [String],
    city: String,
    slot: Number,
    area: String,
    company: String,
    rate: Number,
   des: String,
   name: String,
   // Assuming locations is an array of strings
});

module.exports = mongoose.model("Map", MapSchema);
