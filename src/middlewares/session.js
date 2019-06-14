var session = require('express-session');
<<<<<<< HEAD

=======
var passport = require('passport');
>>>>>>> e75e29178261bff615a79a1aed081a24e38bf8b3
module.exports = function (app) {
  app.use(session({
    secret: 'fgzaaflpt20imorsst20',
    resave: true,
    saveUninitialized: true
  }));
<<<<<<< HEAD
}
=======
}
>>>>>>> e75e29178261bff615a79a1aed081a24e38bf8b3
