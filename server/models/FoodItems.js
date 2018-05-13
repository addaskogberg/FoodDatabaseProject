const mongoose = require('mongoose')

const FoodItemSchema = new mongoose.Schema({
  Nummer: Number,
  Namn: String,
  Viktgram: Number,
  Energi: {
    Värde: Number,
    Enhet: String,
  },
  Kolhydrater: {
    Värde: Number,
    Enhet: String,
  },
  Protein: {
    Värde: Number,
    Enhet: String,
  },
  Fett: {
    Värde: Number,
    Enhet: String,
  },
});

module.exports = mongoose.model('FoodItem', FoodItemSchema)