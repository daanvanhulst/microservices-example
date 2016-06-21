'use strict';

const bookmarkMongoRepository = require('./bookmark.mongo.repository');
const bookmarkRabbitmqRepository = require('./bookmark.rabbitmq.repository');

const Bookmark = require('./bookmark.model');

exports.getBookmarks = () => {
  return new Promise((resolve, reject) => {
    bookmarkMongoRepository.getBookmarks()
      .then((response) => {
        resolve(response);
      })
      .catch((response) => {
        reject(response);
      });
  });
};

exports.addBookmark = (bookmark) => {
  console.log("adding bookmark in service");
  console.log(bookmark);
  return new Promise((resolve, reject) => {
    bookmarkMongoRepository.addBookmark(bookmark)
      .then((response) => {
        console.log("promise resolved. and then");
        console.log(response);
        const bookmark = new Bookmark(response);
        
        bookmarkRabbitmqRepository.bookmarkAdded(bookmark);
        
        resolve(bookmark);      
      })
      .catch((response) => {
        console.log("promise catch");
        reject(response);
      });
  });
};

