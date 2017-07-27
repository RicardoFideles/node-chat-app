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

var {generateMessage, generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validation');


app.use(bodyParser.json());
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connect');



    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room))  {
            callback('Name and room are required');
        }

        socket.join(params.room);
        //socket.leave(params.room);
        // io.emit -> io.to('Game room').emit
        // socket.broadcast.emit -> socket.broadcast.to('Game room').emit
        // socket.emit
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app on Heroku'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} user joined`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    
});

server.listen(port, () => {
    console.log(`App runnig on ${port} port`);
});



module.exports = {app};