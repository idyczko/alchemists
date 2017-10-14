var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

server.listen(process.env.PORT || 3000);
console.log("Server has been started successfully...");

var io = require('socket.io')(server, {});
io.sockets.on('connection', function(socket){
	console.log('Opened socket connection: ');
	console.log(socket);
});
