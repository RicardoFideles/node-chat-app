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

    socket.emit('newEmail',  {
        from : 'mike@example.com',
        text : 'Hey. What is going on',
        createAt: 312312321321
    });

    socket.emit('newMessage',  {
        from : 'mike@example.com',
        text : 'I dont care',
        createAt: 312312321321
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail');
        console.log(newEmail);
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage');
        console.log(newMessage);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    
});

server.listen(port, () => {
    console.log(`App runnig on ${port} port`);
});


module.exports = {app};