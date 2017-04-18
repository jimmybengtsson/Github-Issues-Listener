'use strict';

let rp = require('request-promise');

function FetchGithub() {

    let options = {
        uri: process.env.ISSUES_URL,
        method: 'GET',
        qs: {access_token: process.env.GITHUB_KEY},
        headers: {'User-Agent': 'Request-Promise'},

    };

    return rp(options)
        .then(function(data) {

            console.log('then    ' + data);
            return data;

    }).catch(function(err) {
        console.log('catch    ' + err);
    });

}

module.exports = FetchGithub;
