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
    var li =jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});