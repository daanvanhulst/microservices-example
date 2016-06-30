'use strict';

const winston = require('winston'); // https://www.npmjs.com/package/winston

const loginRoutes = require('../app/login/login.controller');
const authRoutes = require('../app/auth/auth.controller');
const proxyRoutes = require('../app/proxy/proxy.controller');

exports.register = (app) => {
  app.use(loginRoutes);
  app.use(authRoutes);
  app.use(proxyRoutes);
  winston.info('app - routes: login loaded');
};