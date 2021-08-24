
PORT      = process.env.PORT || 5001;
REDIS_URL = "redis://localhost:6379" || null;
process.env.REDIS_URL
CHANNEL   = 'chat_messages';

console.log('Node Server Running... | PORT: ' + PORT);

var options = {
  url: REDIS_URL
};

function GoChatServer() {
  var io = require('socket.io').listen(PORT);
  var redis = require('redis').createClient(options);

  redis.subscribe(CHANNEL);

  io.of('/').on('connection', function(socket){
    console.log('connected socket');
    
    socket.on('disconnect', function(){
      socket.disconnect();
      console.log('client disconnected');
    });

    redis.on('message', function(channel, message){
      socket.emit(channel, message);
      console.log('emit message: ' + message);
    });
  });
}

GoChatServer();
