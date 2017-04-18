var githubAPI = {
    fetchAllIssues: function() {
        var request = require('request');
        var headers = {'User-Agent': process.env.APP_NAME};
        var options = {url: process.env.ISSUES_URL, method: 'GET', headers: headers, qs: {'access_token': process.env.GITHUB_KEY}};

        request(options, function (error, response, body) {
            if(!error && response.statusCode === 200) {
                console.log(JSON.parse(body));
            }
        });
    }
};

module.exports = githubAPI;