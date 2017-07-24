const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(bodyParser.json());
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connect');

    socket.emit('newMessage',  {
        from : 'mike@example.com',
        text : 'I dont care',
        createAt: 312312321321
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    
});

server.listen(port, () => {
    console.log(`App runnig on ${port} port`);
});


module.exports = {app};