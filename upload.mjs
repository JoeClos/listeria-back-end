/*  
    edit.js
    MediaWiki API Demos
    Demo of `Edit` module: POST request to edit a page
    MIT license
*/
import originalRequest from "request";

const request = originalRequest.defaults({ jar: true });
const url = "https://commons.wikimedia.org/w/api.php";

// Step 1: GET request to fetch login token
export default function getLoginToken(callback, pageName, content) {
  const params_0 = {
    action: "query",
    meta: "tokens",
    type: "login",
    format: "json",
  };

  request.get({ url: url, qs: params_0 }, function (error, res, body) {
    if (error) {
      return;
    }
    const data = JSON.parse(body);
    loginRequest(data.query.tokens.logintoken, callback, pageName, content);
  });
}

// Step 2: POST request to log in.
// Use of main account for login is not
// supported. Obtain credentials via Special:BotPasswords
// (https://www.mediawiki.org/wiki/Special:BotPasswords) for lgname & lgpassword
function loginRequest(login_token, callback, pageName, content) {
  const params_1 = {
    action: "login",
    lgname: process.env.MEDIAWIKI_USERNAME,
    lgpassword: process.env.MEDIAWIKI_PASSWORD,
    lgtoken: login_token,
    format: "json",
  };

  request.post({ url: url, form: params_1 }, function (error, res, body) {
    if (error) {
      return;
    }
    getCsrfToken(callback, pageName, content);
  });
}

// Step 3: GET request to fetch CSRF token
function getCsrfToken(callback, pageName, content) {
  const params_2 = {
    action: "query",
    meta: "tokens",
    format: "json",
  };

  request.get({ url: url, qs: params_2 }, function (error, res, body) {
    if (error) {
      return;
    }
    const data = JSON.parse(body);
    editRequest(data.query.tokens.csrftoken, callback, pageName, content);
  });
}

// Step 4: POST request to edit a page
function editRequest(csrf_token, callback, pageName, content) {
  const params_3 = {
    action: "edit",
    title: pageName,
    text: JSON.stringify(content),
    token: csrf_token,
    format: "json",
  };

  request.post({ url: url, form: params_3 }, function (error, res, body) {
    if (error) {
      return;
    }
    callback();
    console.log(body);
  });
}

// Start From Step 1
// import * as dotenv from "dotenv";
// dotenv.config();
// getLoginToken(
//   () => {
//     console.log("success:");
//   },
//   "Data:Sandbox/JosephineBot/uploadTest.tab",
//   "test"
// );
