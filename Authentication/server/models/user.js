const mongoose = require('mongoose');

// Define our model
const UserSchema = new mongoose.Schema({
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

// Create the model class
const User = mongoose.model('user', UserSchema);

// Export the model
module.exports = User;
