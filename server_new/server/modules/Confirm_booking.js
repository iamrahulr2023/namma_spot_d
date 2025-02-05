const mongoose = require('mongoose');

const DetailsSchema = new mongoose.Schema({
  slotNumbers: [String],
  name:String,
  date: String,
  vehicleno: String,
  totalAmount: Number,
  city:String
});

module.exports = mongoose.model('thenewconfirm', DetailsSchema);
