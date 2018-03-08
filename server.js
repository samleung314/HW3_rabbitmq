var express = require('express');
var app = express();
var port = process.env.PORT || 80;

app.get('/', function (req, res) {
   res.send('Hello! This is HW3 RabbitMQ!');
 })

app.post('/listen', function (req, res) {
    res.send(
        req.body.keys
    );
 })

 app.post('/speak', function (req, res) {
    res.send(
        req.body.key
    );
 })

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("HW3 RabbitMQ listening at http://%s:%s", host, port)
})