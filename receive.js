var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'messages';

    ch.assertQueue('', {exclusive: true}, function(err, que) {
      console.log(' [*] Waiting for messages. To exit press CTRL+C');

      args.forEach(function(key) {
        ch.bindQueue(que.queue, q, key);
      });

      ch.consume(que.queue, function(msg) {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {noAck: true});
    });
  });
});