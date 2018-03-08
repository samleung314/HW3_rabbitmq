// app.js
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//create express app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/speak', function (req, res) {
  console.log("Key: " + req.body.key.toString() + " Msg: " + req.body.msg.toString());
  res.sendStatus(200);
  //speak(req.body.key.toString(), req.body.msg.toString());
})

// server.js
var port = process.env.PORT || 80;

var server = app.listen(port, function () {
   console.log("/listen on port: " + port)
})