'use strict';

let express = require('express');
let https = require('https');
let http = require('http');
let fs = require('fs');

// Start express and which port.

let app = express();
let port = process.env.PORT || 8000;

// Start the application.

https.createServer({
    key: fs.readFileSync('./config/sslcerts/key.pem'),
    cert: fs.readFileSync('./config/sslcerts/cert.pem')

}, app).listen(port, () => {
    console.log('Express started on ' + port);
    console.log('Terminate with ctrl-c');
});
