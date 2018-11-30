'use strict';

const express = require("express");
const app = express();
const request = require("request");

request(
  "http://www.mocky.io/v2/580891a4100000e8242b75c5",
  (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    const data = JSON.parse(body)

  }
)

app.get('/', sendData);

function sendData(request, response) {
  response.send('hi')
}

app.listen(3000)