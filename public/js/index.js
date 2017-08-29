var socket = io();

// Connection Open
socket.on('connect', function() {
    console.log('Connected To Server');

    /**
     * Event Emitters
     */

    // New Message Created
    socket.emit('createMessage', {
        from: '',
        text: ''
    });
});

/**
 * Event Handlers
 */

// Disconnect Logging
socket.on('disconnect', function() {
    console.log('Disconnected From Server');
});

// New message received
socket.on('newMessage', function(message) {
    console.log('New Message:', message);
});

