var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'images')));

var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/new.html');
});

http.listen(2000, function(){
    console.log('listening on *2000');
});

io.sockets.on('connection', function (client) {
    //подписываемся на событие message от клиента
    client.on('message', function (data) {
            //посылаем сообщение себе
            client.emit('new message1', data);
            //посылаем сообщение всем клиентам, кроме себя
            client.broadcast.emit('new message2', data);
        
    });
});