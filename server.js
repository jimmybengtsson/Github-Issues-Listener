'use strict';

let express = require('express');
let https = require('https');
let bodyParser = require('body-parser');
let fs = require('fs');
let FetchGithub = require('./server/FetchGithub.js');
require('dotenv').config();

let payload;

let githubMiddleware = require('github-webhook-middleware')({
    secret: process.env.GITHUB_SECRET,
});

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

app.post('/', githubMiddleware, function(req, res) {

    payload = req.body;
    console.log(payload.action);
    return res.status(202).send();
});

io.on('connection', function(socket) {

    socket.broadcast.emit('newIssue', payload);

    socket.emit('allIssues', FetchGithub());
    console.log('io');

});

