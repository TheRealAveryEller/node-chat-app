/**
 * Server Constants
 */
// Set Port to listen to. Either var or 3000
const PORT = process.env.PORT || 3000;
// Call node http
const HTTP = require('http');
// Call socket.io
const SOCKET = require('socket.io');
// Call express 
const EXPRESS = require('express');

/**
 * Server Variables
 */
// Create app variable that is express
var app = EXPRESS();
// Create a server using express app variable
var server = HTTP.createServer(app);
// Tell that server to integrate socket.io
var io = SOCKET(server);

/**
 * Server utils
 */
// Generate Message
const {generateMessage} = require('./utils/message');

// Set Render Path
const PATH = require('path');
const PUBLIC_PATH = PATH.join(__dirname, '../public');
app.use(EXPRESS.static(PUBLIC_PATH));
// .Set Render Pathh

// Socket functions on connection
io.on('connection', (socket) => {
    console.log('New User Connected');
    // Greet new client
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));
    // Alert current clients to new client
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined the chat'));

    // Receive new message from a client.
    // Emit that message as a newMessage to all clients.
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage:', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');
    });

    // Client disconnected
    socket.on('disconnect', () => {
        console.log('Client Disconnected');
    });
});
// .Socket Functions on connection

// Listen on PORT - return status when running
server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});