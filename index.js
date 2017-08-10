var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var socket = require('socket.io');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));

var server = app.listen(8080, function(){
  console.log("server is running on port 8080");
});

var io = socket(server);

io.on('connection', function(socket){
  console.log('made socket connection', socket.id);

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  })

  socket.on('tba', function(data){
    io.sockets.emit('tba', data);
  })


});
