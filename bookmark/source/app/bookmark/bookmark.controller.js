'use strict';

const express = require('express');
const router = express.Router();

const bookmarkService = require('./bookmark.service');

router.get('/bookmark', (req, res) => {
  bookmarkService.getBookmarks()
    .then((response) => {
      res.send(response);
    })
    .catch((response) => {
      res.status(response.statusCode).send(response.error);
    });
});

router.post('/bookmark', (req, res) => {
  var bookmark = req.body;

  bookmarkService.addBookmark(bookmark)
    .then((response) => {
      res.send(response);
    })
    .catch((response) => {
      res.status(response.statusCode).send(response.error);
    });
});


module.exports = router;

