var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var socket = require('socket.io');

var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));

var server = app.listen(port, function(){
  console.log("server is running port " + port);
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
