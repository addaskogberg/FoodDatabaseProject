/**
 * model for session schemas in mongodb
 * author Adda Skogberg
 */

const mongoose = require('mongoose')

// user schema for mongodb
const UserSessionSchema = new mongoose.Schema({
  userId: {
    type : String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default:false
  }
});

module.exports = mongoose.model('UserSession', UserSessionSchema)