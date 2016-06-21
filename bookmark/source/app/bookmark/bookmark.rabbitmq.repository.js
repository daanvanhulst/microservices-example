'use strict';

var amqp = require('amqplib');

exports.bookmarkAdded = (bookmark) => {
  amqp.connect('amqp://192.168.99.100').then(function(conn) {
    conn.createChannel().then(function(ch) {
      console.log("in rabbitmq channel");
      var q = 'bookmark-added';
      var load = JSON.stringify(bookmark);    
      
      ch.assertQueue(q, {durable: true});
      ch.sendToQueue(q, new Buffer(JSON.stringify(load)), {persistent: true});
      console.log(" [x] Sent '" + load + "'");
    });
    setTimeout(function() { conn.close(); }, 500);
  });
};