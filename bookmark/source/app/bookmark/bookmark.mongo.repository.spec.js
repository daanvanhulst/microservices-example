'use strict';

const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');

const bookmarkRepository = require('./bookmark.mongo.repository');

afterEach(() => {
  nock.cleanAll();
});

describe('unit: bookmark.repository - when getting bookmark data', () => {
  it('it should resolve and return bookmark data', () => {
    // arrange
    const bookmarkResponse = [
      {id: 1, login: 'bookmark'},
      {id: 2, login: 'bookmark2'}
    ];

    nock('https://api.github.com')
      .get('/users')
      .reply(200, bookmarkResponse);

    // act + assert
    return bookmarkRepository.getBookmarkData()
      .then((response) => {
        expect(response).to.deep.equal(BookmarkResponse);
      });
  });

  it('it should reject and return an error message', () => {
    // arrange
    nock('https://api.github.com')
      .get('/users')
      .replyWithError({'message': 'something awful happened', 'code': 'AWFUL_ERROR'});

    // act + assert
    return bookmarkRepository.getBookmarkData()
      .catch((response) => {
        expect(response.error).to.deep.equal({'message': 'something awful happened', 'code': 'AWFUL_ERROR'});
      });
  });
});

