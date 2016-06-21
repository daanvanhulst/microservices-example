'use strict';
const winston = require('winston'); // https://www.npmjs.com/package/winston
const amqp = require('amqplib/callback_api');

const recommendationListeners = require('../app/recommendation/recommendation.listener');

exports.register = (app) => {
  amqp.connect('amqp://192.168.99.100', (err, conn) => {
    conn.createChannel(recommendationListeners);
    winston.info('app - connected to AMQP');
  });
  winston.info('app - messages: recommendation loaded');
};