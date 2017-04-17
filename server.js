'use strict';

let express = require('express');
let https = require('https');
let bodyParser = require('body-parser');
let fs = require('fs');
let FetchGithub = require('./server/FetchGithub.js');
require('dotenv').config();

let GithubWebHook = require('express-github-webhook');
let webhookHandler = GithubWebHook({ path: '/', secret: process.env.GITHUB_SECRET });

// Start express and which port.

let app = express();
let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(webhookHandler);

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

webhookHandler.on('issues', function (repo, data) {

    console.log(data.toString() + repo);

});

webhookHandler.on('error', function (err, req, res) {

    console.log(err + 'test');
});