'use strict'

const express = require('express');
const request = require('request');
const app = express();

const CLIENTS_URL = 'http://www.mocky.io/v2/5808862710000087232b75ac';
const POLICY_URL = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';

/**
 * Middleware to authenticate the user
 */
app.get('/client/:userId', authenticationByBothRoles);
app.get('/client/user/:name', authenticationByBothRoles);

function authenticationByBothRoles(req, res, next) {
  const authenticatedUsed = req.query.authentication;
  if (!authenticatedUsed) return res.status(403).json({ error: 'Invalid access rights.' });
  request(CLIENTS_URL, { json: true }, (err, response, body) => {
    if (err) { return console.log(err); }
    const clientList = body.clients;
    const user = getUserById(clientList, authenticatedUsed);
    if (user && (user.role === 'user' || user.role === 'admin')) {
      req.clientsResponse = clientList;
      return next();
    }
    return res.status(403).json({ error: 'Invalid access rights.' });
  });
}

function getUserById(clients, id) {
  return clients.filter(client => client.id === id)[0];
}

/**
 * Logic to retrieve user filtered by name
 */
app.get('/client/user/:name', function (req, res) {
  const userId = req.params.name;
  const clients = req.clientsResponse;
  const data = getUserById(clients, userId);
  res.status(200).json(data);
});


/**
 * Logic to retrieve user filtered by id
 */
app.get('/client/:userId', function (req, res) {
  const userId = req.params.userId;
  const clients = req.clientsResponse;
  const data = getUserById(clients, userId);
  res.status(200).json(data);
});

const server = app.listen(3001, function () {
  const port = server.address().port;
  console.log('Example app listening at port %s', port);
});

module.exports = server;