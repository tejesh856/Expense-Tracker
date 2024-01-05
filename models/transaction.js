const mongoose = require('mongoose');
const { Schema }=mongoose;
const transactionSchema = new Schema({
    name: String,
    amount: Number,
    date: Date,
    type: String,
  });
  
  module.exports = mongoose.model('Transaction' ,transactionSchema);