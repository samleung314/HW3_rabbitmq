var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'hw3';

    var msg = null;
    var key = null;

    ch.assertExchange(ex, 'direct', {durable: false});
    ch.publish(ex, severity, new Buffer(msg));
    console.log(" [x] Sent %s: '%s'", key, msg);
  });
});