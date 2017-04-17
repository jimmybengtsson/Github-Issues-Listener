'use strict';

let express = require('express');
let https = require('https');
let bodyParser = require('body-parser');
let fs = require('fs');
let FetchGithub = require('./server/FetchGithub.js');
require('dotenv').config();

let createHandler = require('github-webhook-handler');
let handler = createHandler({ path: '/', secret: process.env.GITHUB_SECRET })

// Start express and which port.

let app = express();
let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

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

let io = require("socket.io")(server);

io.on('connection', function(socket) {

    FetchGithub(socket);
    console.log('io');

});

handler.on('error', function(err) {
    console.error('Error:', err.message);
});

handler.on('push', function(event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);
});

handler.on('issues', function(event) {
    console.log('Received an issue event for %s action=%s: #%d %s',
        event.payload.repository.name,
        event.payload.action,
        event.payload.issue.number,
        event.payload.issue.title);
});