// app.js
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//create express app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello! This is HW3 RabbitMQ!');
})

function listen(keys) {
  var amqp = require('amqplib/callback_api');
  amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
      var exchange = 'hw3';

      ch.assertQueue('', { exclusive: true }, function (err, q) {
        console.log('Queue Created!');

        keys.forEach(function (key) {
          ch.bindQueue(q.queue, exchange, key);
        });

        ch.consume(q.queue, function (msg) {
          console.log("Consumed![x] %s: '%s'", msg.fields.routingKey, msg.content.toString());

          res.status(200).json({
            msg: msg.content.toString()
          });

        }, { noAck: true });
      });
    });
  });
}

app.post('/listen', function (req, res) {
  console.log("(/listen) Keys: " + req.body.keys);
  listen(req.body.keys.toString().split(','));
})

function speak(key, msg) {
  var amqp = require('amqplib/callback_api');

  amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
      var ex = 'hw3';

      ch.publish(ex, key, new Buffer(msg));
      console.log(" [x] Sent %s: '%s'", key, msg);
    });

    setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });
}

app.post('/speak', function (req, res) {
  console.log("(/speak) Key: " + req.body.key + " Msg: " + req.body.msg);
  speak(req.body.key.toString(), req.body.msg.toString());
})

module.exports = app;