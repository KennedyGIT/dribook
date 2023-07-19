var session = require('express-session');

module.exports = (req, res, next) => {
    if (req.session.user != undefined) {
        // there is a user in the session, continue to the next middleware or route handler
        next();
      } else {
        // there is no user in the session, redirect to the login page
        res.redirect('/login');
      }
  };
  