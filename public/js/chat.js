var socket = io();

function scrollToBottom() {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight');    
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}
            
socket.on('connect', () => {
    console.log('connected to server');
    var params= jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', () => {
    console.log('Disconnect from server');
});

socket.on('newMessage', (message) => {
    console.log(message);
    var formattedTime = moment(message.createdAt).format('hh:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text : message.text,
        from : message.from,
        createdAt : formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
    console.log(message);
    var formattedTime = moment(message.createdAt).format('hh:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from : message.from,
        url : message.url,
        createdAt : formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
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
