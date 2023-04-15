const session = require('express-session');

module.exports = session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false
});
