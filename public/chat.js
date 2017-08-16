var socket = io.connect('https://amazon-flex.herokuapp.com/');

$.getScript("jquery.titlealert.min.js", function(){

});



var socket = io.connect('http://localhost:8080/');

var btnTBA       = document.getElementById('send-tba');
var tbaWindow    = document.getElementById('tba-window');
var count        = document.getElementById('count');
var message      = document.getElementById('message');
var handle       = document.getElementById('handle');
var btnMessage   = document.getElementById('send');
var output       = document.getElementById('output');
var feedback     = document.getElementById('feedback');
var anchor       = document.getElementById('anchor');
var btnClear     = document.getElementById('clear-button');


var accept = new Audio();
var buzzer = new Audio();

accept.src = "https://drive.google.com/uc?export=download&id=0B93xTaskz1_WaE5GaXdScHNkRlk";
buzzer.src = "https://drive.google.com/uc?export=download&id=0B93xTaskz1_WZ3l3V2NJeDdWMDg";

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

btnClear.addEventListener('click', function(){
  socket.emit('clear');
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


socket.on('clear', function(){
  $('#tba-window').empty();

})

socket.on('chat', function(data){
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ": </strong>" + data.message
    + "</p>";
    accept.play();
    $.titleAlert(data.handle + ": " + data.message, {
        requireBlur:true,
        stopOnFocus:true,
        duration:10000,
        interval:500
    });
})

socket.on('typing', function(data){
  anchor.scrollIntoView();
  feedback.innerHTML = '<p><em>' + data.handle + ' is typing...</em></p>';
})

socket.on('tba', function(data){
  for(var i = 0; i < data.tba.length; i++){
    tbaWindow.innerHTML += "<div class='tba-insert'>" + data.tba[i] + "</div>";
  }

})
