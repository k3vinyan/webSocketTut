var socket = io.connect('http://enigmatic-beach-76206.herokuapp.com/');

var btnTBA       = document.getElementById('send-tba');
var tbaWindow    = document.getElementById('tba-window');
var count        = document.getElementById('count');

var message      = document.getElementById('message');
var handle       = document.getElementById('handle');
var btnMessage   = document.getElementById('send');
var output       = document.getElementById('output');
var feedback     = document.getElementById('feedback');
var anchor       = document.getElementById('anchor');


$(document).keypress(function(e) {

  if(e.which == 13) {
    btnMessage.click();
    message.value = "";
  };

  setTimeout(function(){
    anchor.scrollIntoView();
  }, 1000);

});

btnMessage.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });

});


btnTBA.addEventListener('click', function(){
  tbaArray = [];
  tempArray =tba.value.split('\n');

  for(var i = 0; i < tempArray.length; i++){
    if(tempArray[i].length == 15){
      tbaArray.push(tempArray[i])
    }
  }

  socket.emit('tba', {
    tba:  tbaArray
  })
});

message.addEventListener('keypress', function(){
  socket.emit('typing', {
    handle: handle.value
  })
});




socket.on('chat', function(data){
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ": </strong>" + data.message
    + "</p>";
})

socket.on('typing', function(data){
  anchor.scrollIntoView();
  feedback.innerHTML = '<p><em>' + data.handle + ' is typing...</em></p>';
})


var counter = 0;

socket.on('tba', function(data){
  counter += 1;
  console.log(data);
  //count.innerHTML = "Count: " + counter;
  for(var i = 0; i < data.tba.length; i++){
    tbaWindow.innerHTML += "<div class='tba-insert'>" + data.tba[i] + "</div>";
  }

})
