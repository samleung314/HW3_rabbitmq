var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var exchange = 'hw3';
    var msg = 'Hello World!';

    ch.assertQueue(exchange, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(exchange, new Buffer(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});