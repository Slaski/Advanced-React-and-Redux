const passport = require('passport');

const Authentication = require('./controller/authentication');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, (req, res) =>
    res.send({ message: 'Hello World!' })
  );
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
