const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const config = require('../config');

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that user
  // otherwise, call 'done' without a user object
  User.findById(payload.sub)
    .then(user => {
      if (!user) {
        return done(null, false);
      }

      done(null, user);
    })
    .catch(err => done(err));
});

// Tell passport to use this strategy
passport.use(jwtLogin);
