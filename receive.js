var amqp = require('amqplib/callback_api');

var keys = ['a','b','c','d','e']
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var exchange = 'hw3';

    ch.assertQueue('', {exclusive: true}, function(err, que) {
      console.log(' [*] Waiting for messages. To exit press CTRL+C');

      keys.forEach(function(key) {
        ch.bindQueue(que.queue, exchange, key);
      });

      ch.consume(que.queue, function(msg) {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {noAck: true});
    });
  });
});