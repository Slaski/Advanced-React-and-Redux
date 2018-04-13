const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const config = require('../config');

// Setup options for Local stategy
const localOptions = { usernameField: 'email' };

// Create Local strategy
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  // Verify username and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false);
      }

      // Compare passwords - is 'password' equal to user.password?
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, false);
        }

        done(null, user);
      });
    })
    .catch(err => done(err));
});

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
passport.use(localLogin);
