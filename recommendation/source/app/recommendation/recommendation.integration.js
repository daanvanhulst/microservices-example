'use strict';

const app = require('../../bin/www');
const server = app.listen();
const supertest = require('supertest').agent(server);
const winston = require('winston');
const nock = require('nock');

before(() => {
  try {
    winston.remove(winston.transports.Console);
  } catch (error) {

  }
});

after(() => {
  server.close();
});

afterEach(() => {
  nock.cleanAll();
});

describe('integration: recommendation.integration.js - when getting recommendations', () => {
  const recommendationResponse = [
    {id: 1, login: 'recommendation'},
    {id: 2, login: 'recommendation2'}
  ];

  const recommendationModel = {id: 1, name: 'recommendation'};

  it('it should return recommendations', () => {
    nock('https://api.github.com')
      .get('/users')
      .reply(200, recommendationResponse);

    return supertest
      .get('/recommendations')
      .expect(200, recommendationModel);
  });

  it('it should return not found', () => {
    nock('https://api.github.com')
      .get('/users')
      .reply(404);

    return supertest
      .get('/recommendations')
      .expect(404);
  });

  it('it should return error', () => {
    nock('https://api.github.com')
      .get('/users')
      .reply(500, {'message': 'something awful happened', 'code': 'AWFUL_ERROR'});

    return supertest
      .get('/recommendations')
      .expect(500, {'message': 'something awful happened', 'code': 'AWFUL_ERROR'});
  });
});

