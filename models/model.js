const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// How much time for each BCrypt Hash
const costFactor = 6;
const UserSchema = new Schema({
 firstName: {
  type: String,
  trim: true,  
  required: true,
 },
 lastName: {
  type: String,
  trim: true,  
  required: true,
 },
 password: {
  type: String,
  trim: true,
  required: true
 },
 email: {
  type: String,
  trim: true,
  required: true,
  // We don't want duplicate emails! 
  unique: true
 },
 dateOfBirth: {
  type: String,
  trim: true,
  required: true
 },
 favouriteColour: {
  type: String,
  trim: true,
  required: true
 }
});

// Password hashing should happen before it even reaches our database (pre-hook)
UserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, costFactor);
next();
});
module.exports = mongoose.model('User', UserSchema);
