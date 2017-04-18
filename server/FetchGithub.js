'use strict';

let rp = require('request-promise');

function FetchGithub() {

    let options = {
        uri: process.env.ISSUES_URL,
        qs: {access_token: process.env.GITHUB_KEY},
        headers: {'User-Agent': process.env.APP_NAME},
        json: true
    };

    return rp(options)
        .then(function(data) {

            console.log(data);
            return data;

    }).catch(function(err) {
        console.log(err);
    });

}

module.exports = FetchGithub;
