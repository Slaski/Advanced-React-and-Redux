const passport = require('passport');

const Authentication = require('./controller/authentication');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, (req, res) => res.send({ hi: 'there' }));
  app.post('/signup', Authentication.signup);
};
