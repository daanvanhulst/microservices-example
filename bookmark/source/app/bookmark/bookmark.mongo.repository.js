'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.99.100:28001/Bookmark');

const bookmarkSchema = mongoose.Schema({
    name: String
});
const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

exports.getBookmarks = () => {
  return Bookmark.find();
};

exports.addBookmark = (bookmark) => {
  var newBookMark = new Bookmark(bookmark);
  return newBookMark.save();
};

