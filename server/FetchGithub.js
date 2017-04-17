'use strict';

let request = require('request');

function FetchGithub() {

    let config = {url: process.env.ISSUES_URL, method: 'GET', headers: {'User-Agent': process.env.APP_NAME}, qs: {'access_token': process.env.GITHUB_KEY}};

    request(config, function (error, response, body) {
        if (!error) {
            console.log(JSON.parse(body));
        }
    });

}

module.exports = FetchGithub;