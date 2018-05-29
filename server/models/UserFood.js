/**
 * model for schemas for the users food item in mongodb
 * author Adda Skogberg
 */

const mongoose = require('mongoose')

// user schema for mongodb
const UserFoodSchema = new mongoose.Schema({
  userId: {
    type : String,
    default: ''
  },
  Nummer: Number,
  Namn: String,
  Viktgram: Number,
  Energi: {
    Värde: Number,
    Enhet: String,
  }
});

module.exports = mongoose.model('UserFood', UserFoodSchema)