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

describe('integration: bookmark.integration.js - when getting bookmarks', () => {
  const bookmarkResponse = [
    {id: 1, login: 'bookmark'},
    {id: 2, login: 'bookmark2'}
  ];

  const bookmarkModel = {id: 1, name: 'bookmark'};

  it('it should return bookmarks', () => {
    nock('https://api.github.com')
      .get('/users')
      .reply(200, bookmarkResponse);

    return supertest
      .get('/bookmarks')
      .expect(200, bookmarkModel);
  });

  it('it should return not found', () => {
    nock('https://api.github.com')
      .get('/users')
      .reply(404);

    return supertest
      .get('/bookmarks')
      .expect(404);
  });

  it('it should return error', () => {
    nock('https://api.github.com')
      .get('/users')
      .reply(500, {'message': 'something awful happened', 'code': 'AWFUL_ERROR'});

    return supertest
      .get('/bookmarks')
      .expect(500, {'message': 'something awful happened', 'code': 'AWFUL_ERROR'});
  });
});

