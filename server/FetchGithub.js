'use strict';

let request = require('request');

function FetchGithub() {

    let config = {url: process.env.ISSUES_URL, method: 'GET', headers: {'User-Agent': process.env.APP_NAME}, qs: {'access_token': process.env.GITHUB_KEY}};

    request(config, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
            return body;
        }
    });

}

module.exports = FetchGithub;