// Set Port to listen to. Either var or 3000
const PORT = process.env.PORT || 3000;

// Call node http
const HTTP = require('http');

// Call socket.io
const SOCKET = require ('socket.io');

// Call express 
const EXPRESS = require('express');
var app = EXPRESS();

// Create a server using express
// Tell that server to integrate socket.io
var server = HTTP.createServer(app);
var io = SOCKET(server);

// App set to use PUBLIC_PATH for render
const PATH = require('path');
const PUBLIC_PATH = PATH.join(__dirname, '../public');
app.use(EXPRESS.static(PUBLIC_PATH));

io.on('connection', (socket) => {
    console.log('New User Connected');

    // Receive new message from a client.
    // Emit that message as a new message to all clients.
    socket.on('createMessage', (message) => {
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    // Client disconnected
    socket.on('disconnect', () => {
        console.log('Client Disconnected');
    });
});

// Listen on PORT - return status when running
server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});