var socket = io();
            
socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnect from server');
});

socket.on('newMessage', (message) => {
    console.log(message);
    var li = jQuery('<li></li>');
    li.text(`from : ${message.from} : ${message.text}`);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault;
        socket.emit('createMessage', {
        from : 'User',
        text : jQuery('[name=message]').val()
    }, function () {
        jQuery('[name=message]').val('');
    });

    return false;
});