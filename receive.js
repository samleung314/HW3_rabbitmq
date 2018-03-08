var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (err, ch) {
    var ex = 'hw3';

    ch.assertQueue('', { exclusive: true }, function (err, q) {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      keys.forEach(function (key) {
        ch.bindQueue(q.queue, ex, key);
      });

      ch.consume(q.queue, function (msg) {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, { noAck: true });
    });

  });
});