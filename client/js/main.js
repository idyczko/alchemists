
var alch = (function(coreModule, $){


// Init function
  coreModule.init = function() {
    var socket = io();
    var chatText = $("#game_chat_wrapper");
    var chatForm = $("#game_chat_form");
    var chatInput = $("#game_chat_input");

    socket.on("appendNewMessage", function(message) {
      chatText.append('<div>' + message.sender + ': ' + message.text + '</div>');
    });

    chatForm.submit(function(event) {
      event.preventDefault();

      var message  = {};
      message.text = chatInput.val();

      socket.emit("sendMessage", message);
      chatInput.val("");
    })
  }

  return coreModule;
})(alch || {}, jQuery);

//Initialization
$(document).ready(function(){
  alch.init();
});
