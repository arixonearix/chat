var app = require('express')();
var express = require('express');
var htmlspecialchars = require('htmlspecialchars');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var disconnectionDueToInactivityTimeout = 200000;
var notifications = {
    authenticateWarning: 'Please enter your login first',
    authenticationSuccess: 'Authentication complete',
    authenticationChange: 'Login changed',
    userConnected: 'A new user connected',
    userDisconnected: 'has disconnected!',
    nicknameTaken: 'Nickname has already taken!',
    disconnectionDueToInactivity: 'You have been disconnected due to inactivity!',
};
var actionTypes = {
    notification: 'notification',
    message: 'message',
    disconnect: 'disconnect',
    login: 'login'
};
var connections = [];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/logo512.png', express.static('logo512.png'));
app.use('/service-worker.js', express.static('/service-worker.js'));
io.on('connection', function (socket) {

    socket.setTimeout = () => {
        socket.timeout = setTimeout(() => {
            socket.emit(actionTypes.notification, {
                message: notifications.disconnectionDueToInactivity
            });
            socket.disconnect(true);
        }, disconnectionDueToInactivityTimeout);
    };
    socket.restartTimeout = () => {
        clearTimeout(socket.timeout);
        socket.setTimeout();
    };

    socket.on('users', function (socket) {
        console.log(connections);
    });
    socket.on(actionTypes.disconnect, function (socket) {
        connections.splice(connections.indexOf(socket.nickname),1);
        io.sockets.emit(actionTypes.notification, {
            message: `${socket.nickname} ${notifications.userDisconnected}`
        });
    });
    socket.on(actionTypes.message, function (msg) {
        socket.restartTimeout(socket);
        if (typeof socket.nickname === 'undefined') {
            socket.emit(actionTypes.notification, {
                message: notifications.authenticateWarning
            });
        } else {
            io.sockets.emit(actionTypes.message, {
                type: actionTypes.message,
                nickname:socket.nickname,
                message: msg
            });
        }
    });
    socket.on(actionTypes.login, function (login) {
        if (connections.indexOf(login) === -1) {
            let message = (typeof socket.nickname === "undefined")
                ? notifications.authenticationSuccess
                : notifications.authenticationChange;
            socket.nickname = login;
            connections.push(socket.nickname);
            socket.setTimeout();

            socket.emit(actionTypes.notification, {
                message: message
            });
            io.sockets.emit(actionTypes.notification, {
                message: `${notifications.userConnected} ${socket.nickname}`
            });
        } else  {
            socket.emit(actionTypes.notification, {
                message: notifications.nicknameTaken
            });
        }
    });
});

http.listen(3001, function () {
    console.log('listening on *:3001');
});