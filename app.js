	var express = require('express');
var app = express();
var server = require('http').serverer(app);
var pg = require('pg');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

server.listen(process.env.PORT || 3000);
console.log("serverer has been started successfully");

var io = require('socket.io')(server, {});

