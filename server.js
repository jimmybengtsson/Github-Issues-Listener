'use strict';

let express = require('express');
let https = require('https');
let bodyParser = require('body-parser');
let fs = require('fs');
let FetchGithub = require('./server/FetchGithub.js');
require('dotenv').config();

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

io.on('connection', function(socket) {

    FetchGithub(socket);
    console.log('io');

});

app.post('/', githubMiddleware, function(req, res) {
    // Only respond to github push events
    res.status(200).end();

    let payload = req.body;
    let repo    = payload.repository.full_name;

    console.log(payload);
});
