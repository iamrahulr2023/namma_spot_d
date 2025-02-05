const mongoose = require('mongoose');

const DetailsSchema = new mongoose.Schema({
  slotNumbers: [String],
  entryTime: String,
  exitTime: String,
  date: String,
  vehicleno: String,
  totalAmount: Number, 
  pin:Number,
  city:String
});

module.exports = mongoose.model('theuserlast', DetailsSchema);
