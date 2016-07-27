'use strict';

const express = require('express');
const router = express.Router();

const loginService = require('./login.service');

// app/routes.js

module.exports = function(app, passport) {
  // route for logging out
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

};
module.exports = router;

