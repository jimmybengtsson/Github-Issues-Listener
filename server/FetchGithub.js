'use strict';

let rp = require('request-promise');

function FetchGithub(socket) {

    // Confiq for the request to Github API

    let options = {
        uri: process.env.ISSUES_URL,
        qs: {access_token: process.env.GITHUB_KEY},
        headers: {'user-agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'},
        json: true
    };

    // A promise request to github and emit the response to socket.

    return rp(options)
        .then(function(data) {

            socket.emit('allIssues', data);

        }).catch(function(err) {
        console.log(err);
    });

}

module.exports = FetchGithub;
