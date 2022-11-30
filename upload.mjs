/*  
    edit.js
 
    MediaWiki API Demos
    Demo of `Edit` module: POST request to edit a page

    MIT license
*/
import request  from 'request';

// var request = require('request').defaults({jar: true}),
   const url = "https://test.wikipedia.org/w/api.php";

// Step 1: GET request to fetch login token
export default function getLoginToken() {
    const params_0 = {
        action: "query",
        meta: "tokens",
        type: "login",
        format: "json"
    };

    request.get({ url: url, qs: params_0 }, function (error, res, body) {
        if (error) {
            return;
        }
        const data = JSON.parse(body);
        loginRequest(data.query.tokens.logintoken);
    });
}

// Step 2: POST request to log in. 
// Use of main account for login is not
// supported. Obtain credentials via Special:BotPasswords
// (https://www.mediawiki.org/wiki/Special:BotPasswords) for lgname & lgpassword
function loginRequest(login_token) {
    const params_1 = {
        action: "login",
        lgname: process.env.MEDIAWIKI_USERNAME,
        lgpassword: process.env.MEDIAWIKI_PASSWORD,
        lgtoken: login_token,
        format: "json"
    };

    request.post({ url: url, form: params_1 }, function (error, res, body) {
        if (error) {
            return;
        }
        getCsrfToken();
    });
}

// Step 3: GET request to fetch CSRF token
function getCsrfToken() {
    const params_2 = {
        action: "query",
        meta: "tokens",
        format: "json"
    };

    request.get({ url: url, qs: params_2 }, function(error, res, body) {
        if (error) {
            return;
        }
        const data = JSON.parse(body);
        editRequest(data.query.tokens.csrftoken);
    });
}

// Step 4: POST request to edit a page
function editRequest(csrf_token) {
    const params_3 = {
        action: "edit",
        title: "Project:Sandbox",
        appendtext: "test1 edit",
        token: csrf_token,
        format: "json"
    };

    request.post({ url: url, form: params_3 }, function (error, res, body) {
        if (error) {
            return;
        }
        console.log(body);
    });
}

// Start From Step 1
// getLoginToken();