var socket = io();

// Connection Open
socket.on('connect', function () {
    console.log('Connected To Server');
});

// Disconnect Logging
socket.on('disconnect', function () {
    console.log('Disconnected From Server');
});

// New message received
socket.on('newMessage', function (message) {
    console.log('New Message:', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not support by your browser :(');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location!');
    });
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Location</a>');
    
    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);

    jQuery('#messages').append(li);
});