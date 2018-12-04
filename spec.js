'use strict'

const request = require('supertest');
const should = require('should');

describe('loading express', function () {
  let server;
  beforeEach(function () {
    server = require('./server');
  });
  afterEach(function () {
    server.close();
  });

  it('It should fail is authenticated user doesnt have access rights', function(done) {
    const authenticatedUser = 'a74c83c5-e271-4ecf-a429-d47af952cfd3';
    const userId = 'a0ece5db-cd14-4f21-812f-966633e7be86';
    const expectedResponse = { error: 'Invalid access rights.' };
    request(server)
      .get(`/client/${userId}?authentication=${authenticatedUser}`)
      .expect(res => { 
        res.statusCode.should.be.eql(403);
        res.body.should.be.eql(expectedResponse)
      })
      .end(done);
  });

  it('It should get data filtered by user id', function(done) {
    const userId = 'a0ece5db-cd14-4f21-812f-966633e7be86';
    const authenticatedUser = "a74c83c5-e271-4ecf-a429-d47af952cfd4";
    const expectedResponse = {  
      "id":"a0ece5db-cd14-4f21-812f-966633e7be86",
      "name":"Britney",
      "email":"britneyblankenship@quotezart.com",
      "role":"admin"
   };
    request(server)
      .get(`/client/${userId}?authentication=${authenticatedUser}`)
      .expect(res => {
        res.body.should.be.eql(expectedResponse);
      })
      .end(done);
  });
  it('It should get data filtered by user name', function(done) {
    const userName = 'Lamb';
    const authenticatedUser = "a74c83c5-e271-4ecf-a429-d47af952cfd4";
    const expectedResponse = {  
      "id":"a0ece5db-cd14-4f21-812f-966633e7be86",
      "name":"Britney",
      "email":"britneyblankenship@quotezart.com",
      "role":"admin"
   };
    request(server)
      .get(`/client/user/${userName}?authentication=${authenticatedUser}`)
      .expect(res => {
        res.body.should.be.eql(expectedResponse);
      })
      .end(done);
  });
  // it('It should get the list of policies linked to a user name');
  // it('It should get the user linked to a policy number');
  });