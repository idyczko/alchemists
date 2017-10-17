var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

server.listen(process.env.PORT || 3000);
console.log("Server has been started successfully...");

var ACTIVE_SOCKETS = {};

var io = require('socket.io')(server, {});
io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	console.log("Opened socket connection: " +socket.id);
	console.log();
	ACTIVE_SOCKETS[socket.id] = socket;

	socket.on('disconnect', function() {
		console.log("Disconnecting socket " + socket.id);
		delete ACTIVE_SOCKETS[socket.id];
	});

	socket.on("sendMessage", function(message) {
		for(var i in ACTIVE_SOCKETS) {
			ACTIVE_SOCKETS[i].emit("appendNewMessage", socket.id + ": " + message);
		}
	});
});

setInterval(function(){
	for(var i in ACTIVE_SOCKETS){
		ACTIVE_SOCKETS[i].emit('logId', {});
	}
}, 10000/25)
