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

    console.log('io');

    socket.emit('issueshooks', function () {

        app.post('/', githubMiddleware, function(req, res) {

            let payload = req.body;
            console.log(payload);
            res.status(202).send();

            return payload.action + payload.issue;

        });
    });

});

