var socket = io();
            
socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnect from server');
});

socket.on('newMessage', (message) => {
    console.log(message);
    var formattedTime = moment(message.createdAt).format('hh:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime} : ${message.text}`);
    jQuery('#messages').append(li);
});
//https://www.google.com.br/maps?q=

socket.on('newLocationMessage', (message) => {
    console.log(message);
    var formattedTime = moment(message.createdAt).format('hh:mm a');

    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from} ${formattedTime} `);
    a.attr('href', message.url);
    li.append(a);
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

var locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled');
    locationButton.text('sending location ...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled');
        console.log(position);
        locationButton.text('Send Location');
        socket.emit('createLocationMessage', {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled');
        alert('Unable to fetch location.');
    });
});
