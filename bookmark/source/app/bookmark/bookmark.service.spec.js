'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
require('sinon-as-promised');

const bookmarkService = require('./bookmark.service');
const bookmarkRepository = require('./bookmark.repository');

let bookmarkRepositoryStub;

afterEach(() => {
  if (bookmarkRepositoryStub) {
    bookmarkRepositoryStub.restore();
  }
});

describe('unit: bookmark.service - when getting bookmark data', () => {
  it('it should resolve and return bookmark data', () => {
    // arrange
    const bookmarkResponse = [{
      id: 1,
      login: 'bookmark'
    }];

    const bookmarkModel = {
      id: 1,
      name: 'bookmark'
    };

    bookmarkRepositoryStub = sinon
      .stub(bookmarkRepository, 'getBookmarkData')
      .resolves(bookmarkResponse);

    // act + assert
    return bookmarkService.getBookmarks()
      .then((response) => {
        expect(bookmarkRepositoryStub.called).to.equal(true);
        expect(response).to.deep.equal(bookmarkModel);
      });
  });

  it('it should reject the request and return an error message', () => {
    // arrange
    bookmarkRepositoryStub = sinon
      .stub(bookmarkRepository, 'getBookmarkData')
      .rejects({error: 'error'});

    // act + assert
    return bookmarkService.getBookmarks()
      .catch((response) => {
        expect(bookmarkRepositoryStub.called).to.equal(true);
        expect(response).to.deep.equal({error: 'error'});
      });
  });
});

