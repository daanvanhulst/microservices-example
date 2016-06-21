
 'use strict';
 
 module.exports = (err, ch) => {
  var q = 'bookmark-added';

  ch.assertQueue(q, {durable: true});
  ch.prefetch(1);

  ch.consume(q, (msg) => {
    var secs = 2;
    console.log("Channel consume");
    console.log(" [x] Received %s", msg.content.toString());
    setTimeout(() => {
      console.log(" [x] Done");
      ch.ack(msg);
    }, secs * 1000);
  }, {noAck: false});
};
