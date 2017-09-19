var express = require('express');
var app = express();
var serv = require('http').Server(app);
var pg = require('pg');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.get('/db', function(req, res) {
	pg.connect(process.env.DATABASE_URL, function (err, client, done) {
		client.query('SELECt * FROM test_table', function(err, result) {
			done();
			if(err){
				console.error(err);
				res.send("Error " + err);
			} else {
				res.render('db', {results: results.rows});
			}
		}))
	})
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 3000);