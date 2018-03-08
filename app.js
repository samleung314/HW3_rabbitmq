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
     console.log("Keys: " + req.body.keys);
  })
 
 app.post('/speak', function (req, res) {
     console.log("Key: " + req.body.key);
     console.log("Msg: " + req.body.msg);
  })

  var amqp = require('amqplib/callback_api');

  amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = 'hello';
      var msg = 'Hello World!';
  
      ch.assertQueue(q, {durable: false});
      // Note: on Node 6 Buffer.from(msg) should be used
      ch.sendToQueue(q, new Buffer(msg));
      console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });

  module.exports = app;