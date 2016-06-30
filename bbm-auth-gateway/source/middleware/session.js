'use strict';

const session = require('express-session');

exports.register = (app) => {
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
};