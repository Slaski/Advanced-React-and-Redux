const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

// On save hook, encrypt passworduser
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // overwrite plain text password with hashed password
      user.password = hash;
      next();
    });
  });
});

// Create the model class
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;
