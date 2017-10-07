	var express = require('express');
var app = express();
var serv = require('http').Server(app);
var pg = require('pg');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 3000);
