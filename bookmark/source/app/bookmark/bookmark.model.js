'use strict';

class Bookmark {
  constructor(bookmarkResponse) {
    this.id = bookmarkResponse.id;
    this.name = bookmarkResponse.name;
  }
}

module.exports = Bookmark;

