var session = require('express-session');
var passport = require('passport');
module.exports = function (app) {
  app.use(session({
    secret: 'fgzaaflpt20imorsst20',
    resave: true,
    saveUninitialized: true
  }));
}
