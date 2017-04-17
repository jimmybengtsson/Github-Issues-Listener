'use strict';

let express = require('express');

// Start express and which port.

let app = express();
let port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));

// Start the application.

app.listen(port, () => {
    console.log('Express started on ' + port);
    console.log('Terminate with ctrl-c');
});
