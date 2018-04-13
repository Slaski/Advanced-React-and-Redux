const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

module.exports.signup = function(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password. ' });
  }

  // See if a user with a given email exists
  User.findOne({ email })
    .then(user => {
      // If a user does exist, return an error
      if (user) {
        return res.status(422).send({ error: 'Email is in use.' });
      }

      // If a user doesn't exist, create and save user record
      const newUser = new User({ email, password });
      return newUser.save();
    })
    .then(user => {
      // Respond to request indicating the user was created
      return res.send({ token: tokenForUser(user) });
    })
    .catch(err => {
      return next(err);
    });
};
