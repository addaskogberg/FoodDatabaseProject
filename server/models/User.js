/**
 * model for schemas in mongodb
 * author Adda Skogberg
 * ref
 * https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
 */

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

 // user schema for mongodb
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: false 
  }
});

// encrypting the user password
UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
};

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model('User', UserSchema)
