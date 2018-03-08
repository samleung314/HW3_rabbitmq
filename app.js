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
     console.log("Body: " + req.body.key);
     console.log("Msg: " + req.body.msg);
  })

  module.exports = app;