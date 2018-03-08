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

app.post('/listen', function (req, res) {
  var keys = req.body.keys
  console.log("(/listen) Keys: " + keys);

  keys = keys.toString().split(',');

  var amqp = require('amqplib/callback_api');
  amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
      var exchange = 'hw3';

      ch.assertQueue('', { exclusive: true }, function (err, que) {
        console.log(' [*] Waiting for messages. To exit press CTRL+C');

        keys.forEach(function (key) {
          ch.bindQueue(que.queue, exchange, key);
        });

        ch.consume(que.queue, function (msg) {
          console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
        }, { noAck: true });
      });
    });
  });
})

app.post('/speak', function (req, res) {
  console.log("(/speak) Key: " + req.body.key + " Msg: " + req.body.msg);
})

module.exports = app;