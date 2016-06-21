'use strict';

const app = require('../../app');
const server = app.listen();
const winston = require('winston');
const supertest = require('supertest').agent(server);
const sinon = require('sinon');
require('sinon-as-promised');

const bookmarkService = require('./bookmark.service');

let bookmarkServiceStub;

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
  if (bookmarkServiceStub) {
    bookmarkServiceStub.restore();
  }
});

describe('unit: bookmark.controller - when getting bookmarks', () => {
  it('it should resolve and return bookmarks', () => {
    // arrange
    const bookmark = {
      id: 1,
      login: 'bookmark'
    };

    bookmarkServiceStub = sinon
      .stub(bookmarkService, 'getBookmarks')
      .resolves(bookmark);

    // act + assert
    return supertest
      .get('/bookmarks')
      .expect(200, bookmark);
  });

  it('it should reject and return an error message', () => {
    // arrange
    bookmarkServiceStub = sinon
      .stub(bookmarkService, 'getBookmarks')
      .rejects({statusCode: 500, error: {error: 'error'}});

    // act + assert
    return supertest
      .get('/bookmarks')
      .expect(500, {error: 'error'});
  });
});

