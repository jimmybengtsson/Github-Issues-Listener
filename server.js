'use strict';

let express = require('express');
let https = require('https');
let bodyParser = require('body-parser');
let fs = require('fs');
let FetchGithub = require('./server/FetchGithub.js');
require('dotenv').config();

let payload;

// Middleware to open a webhook with issues.

let githubMiddleware = require('github-webhook-middleware')({
    secret: process.env.GITHUB_SECRET,
});

// Start express and port.

let app = express();
let port = process.env.PORT || 3000;

// Client start

app.use(express.static(__dirname + '/public'));

// Add bodyparser.

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


// Start the application.

let server = https.createServer({
    key: fs.readFileSync('./config/sslcerts/key.pem'),
    cert: fs.readFileSync('./config/sslcerts/cert.pem')

}, app).listen(port, () => {
    console.log('Express started on ' + port);
    console.log('Terminate with ctrl-c');
});

let io = require('socket.io')(server);

// Emit to socket when webhook from github.

app.post('/', githubMiddleware, function(req, res) {

    io.emit('newIssue', req);
    return res.status(202).send();
});

// Get all issues from github when client connects.

io.on('connection', function(socket) {

    FetchGithub(socket);
    console.log('io');

});

