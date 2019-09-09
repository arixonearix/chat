var app = require('express')();
var express = require('express');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var notifications = {
    authenticateWarning: 'Please enter your login first',
    authenticationSuccess: 'Authentication complete',
    authenticationChange: 'Login changed',
    userConnected: 'A new user connected',
    userDisconnected: 'has disconnected!',
};
var types = {
    notification: 'notification',
    message: 'message',
    disconnect: 'disconnect',
    login: 'login'
};

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/static/js', express.static('static/js'));
app.use('/service-worker.js', express.static('/service-worker.js'));
io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on(types.disconnect, function (socket) {
        io.sockets.emit(types.notification, {
            message: `${socket.nickname} ${notifications.userDisconnected}`
        });
    });
    socket.on(types.message, function (msg) {
        if (typeof socket.nickname === 'undefined') {
            socket.emit(types.notification, {
                message: notifications.authenticateWarning
            });
        } else {
            io.sockets.emit(types.message, {
                type: types.message,
                nickname:socket.nickname,
                message: msg
            });
        }
    });
    socket.on(types.login, function (login) {
        socket.nickname = login;
        let message = (typeof socket.nickname === "undefined")
            ? notifications.authenticationSuccess
            : notifications.authenticationChange
        ;
        socket.emit(types.notification, {
            message: message
        });
        io.sockets.emit(types.notification, {
            message: `${notifications.userConnected} ${socket.nickname}`
        });
    });
});

http.listen(3001, function () {
    console.log('listening on *:3001');
});