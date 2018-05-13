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


// Create a model using the schema.
const FoodItems = mongoose.model('FoodItems', FoodItemSchema)
// Export the model.
module.exports = FoodItems