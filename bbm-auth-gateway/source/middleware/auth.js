'use strict';

const winston = require('winston'); // https://www.npmjs.com/package/winston
const passport = require('passport');
const authRoutes = require('../app/auth/auth.controller');

exports.register = (app) => {
  app.use(authRoutes);
  app.use(passport.initialize());
  app.use(passport.session());
  winston.info('app - routes: auth loaded');
};