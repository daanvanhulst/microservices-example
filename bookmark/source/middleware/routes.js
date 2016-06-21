'use strict';

const winston = require('winston'); // https://www.npmjs.com/package/winston

const bookmarkRoutes = require('../app/bookmark/bookmark.controller');

exports.register = (app) => {
  app.use(bookmarkRoutes);
  winston.info('app - routes: bookmark loaded');
};

