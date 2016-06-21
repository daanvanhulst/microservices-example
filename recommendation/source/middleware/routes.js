'use strict';

const winston = require('winston'); // https://www.npmjs.com/package/winston

const recommendationRoutes = require('../app/recommendation/recommendation.controller');

exports.register = (app) => {
  app.use(recommendationRoutes);
  winston.info('app - routes: recommendation loaded');
};

