const mongoose = require('mongoose');

const DetailsSchema = new mongoose.Schema({
   noti:String,
   date:String,
 
});

module.exports = mongoose.model('notification', DetailsSchema);
