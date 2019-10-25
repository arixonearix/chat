var app = require('express')();
var express = require('express');
var htmlspecialchars = require('htmlspecialchars');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var disconnectionDueToInactivityTimeout = 200000;
var mysql = require('mysql');
var moment = require('moment');

var notifications = {
    authenticateWarning: 'Please enter your login first',
    authenticationSuccess: 'Authentication complete',
    authenticationChange: 'Login changed',
    userConnected: 'A new user connected',
    userDisconnected: 'has disconnected!',
    nicknameTaken: 'Nickname has already taken!',
    disconnectionDueToInactivity: 'You have been disconnected due to inactivity!',
    enterValidNickname: 'Enter valid nickname'
};
var actionTypes = {
    notification: 'notification',
    control: 'control',
    message: 'message',
    disconnect: 'disconnect',
    login: 'login'
};
var connections = [];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
}).get('/log', function (req, res) {
    res.sendFile(__dirname + '/log.html');
}).get('/getLog', function (req, res) {
    io.getLog()
        .then((records) => {
            res.json(records);
        });
});

app.use('/logo512.png', express.static('logo512.png'));
app.use('/service-worker.js', express.static('/service-worker.js'));
io.connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'test'
});
io.connection.connect();
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
            io.logMessage(socket.nickname, msg);
            io.sockets.emit(actionTypes.message, {
                type: actionTypes.message,
                nickname:socket.nickname,
                message: msg
            });
        }
    });
    socket.on(actionTypes.login, function (login) {
        if (connections.indexOf(login) !== -1) {
            socket.emit(actionTypes.control, {
                message: notifications.nicknameTaken,
                switchPages: false
            });

        } else if (!login) {
            socket.emit(actionTypes.control, {
                message: notifications.enterValidNickname,
                switchPages: false
            });
        } else  {
            let message = (typeof socket.nickname === "undefined")
                ? notifications.authenticationSuccess
                : notifications.authenticationChange;
            socket.nickname = login;
            connections.push(socket.nickname);
            socket.setTimeout();

            socket.emit(actionTypes.control, {
                message: message,
                switchPages: true
            });
            socket.emit(actionTypes.notification, {
                message: message
            });
            io.sockets.emit(actionTypes.notification, {
                message: `${notifications.userConnected} ${socket.nickname}`
            });
        }
    });
});

http.listen(3001, function () {
    console.log('listening on *:3001');
});

io.logMessage = (nickname, msg) => {
    let query = `
        INSERT INTO 
            message_log
        SET
            nickname = '${nickname}',
            message = '${msg}',
            created_at = '${moment().format('YYYY-MM-DD HH:mm:ss')}'
    `;
    io.connection.query(query, function (error, results, fields) {
        if (error) throw error;
    });
};
io.getLog = () => {
    let query = `SELECT * FROM message_log;`;

    return new Promise((resolve, reject) => {
        io.connection.query(query, function (error, results, fields) {
            if (error)
                return reject(err);
            resolve(results);
        });
    });
};
