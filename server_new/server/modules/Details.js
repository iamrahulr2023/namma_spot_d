const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  header: String,
  body: String,
  starcount: Number
});

const detailsSchema = new mongoose.Schema({
  locations: String,
  city: String,
  seat: Number,
  place: String,
  company: String,
  price: Number,
  des: String,
  status:String,
  slots: [String],
  averagerate:Number,
  reviews: [reviewSchema] // Note the plural form 'reviews'
});

module.exports = mongoose.model('mapfinal', detailsSchema);