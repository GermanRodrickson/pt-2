const express = require("express");
const app = express();
const request = require("request");

app.get("/", (request, response, next) => {
  response.send("<h1>Welcome Ironhacker. :)</h1>");
});

request.get("http://www.mocky.io/v2/5808862710000087232b75ac", (error, response, body) => {
  if (error) {
    return console.dir(error);
  }
  console.dir(JSON.parse(body));
});

request.get("http://www.mocky.io/v2/580891a4100000e8242b75c5", (error, response, body) => {
  if (error) {
    return console.dir(error);
  }
  console.dir(JSON.parse(body));
});

app.listen(3000, () => {
  console.log("My first app listening on port 3000!");
});
