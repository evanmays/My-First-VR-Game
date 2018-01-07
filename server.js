var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

io.on('connection', function(socket){
	console.log("yo")
	socket.on('computerShoot', function(msg){
		console.log("A shot was made")
		io.emit('fromComputerShotMade');
	});
	socket.on('disconnect', function() {
		console.log("user disconnected")
	})
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});