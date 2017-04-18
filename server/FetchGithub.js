'use strict';

let rp = require('request-promise');

function FetchGithub() {

    let options = {
        uri: process.env.ISSUES_URL,
        qs: {access_token: process.env.GITHUB_KEY},
        headers: {'user-agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'},
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
