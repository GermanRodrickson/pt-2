'use strict';

const express = require("express");
const app = express();
const request = require("request");
const where = require("lodash.where");

request(
  "http://www.mocky.io/v2/5808862710000087232b75ac",
  (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    const data = JSON.parse(body)
    const filtered = where(data.clients, { role : "admin"})
    console.log(filtered)

  }
)

app.get('/', sendData);

function sendData(request, response) {
  response.send('')
}

app.listen(3000)