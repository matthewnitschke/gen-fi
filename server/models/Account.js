const mongoose = require('mongoose');
const crypto = require('crypto');

const AccountSchema = new mongoose.Schema({
  email: String,
  hash: String,
  salt: String,

  plaidAccessToken: String,
});

// Method to set salt and hash the password for a user
AccountSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString('hex');

  // Hashing user's salt and password with 1000 iterations,
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

// Method to check the entered password is correct or not
AccountSchema.methods.isValidPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

module.exports = mongoose.model('Account', AccountSchema);
