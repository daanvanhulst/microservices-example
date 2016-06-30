'use strict';

const express = require('express');
const router = express.Router();

const loginService = require('./login.service');

router.post('/login', (req, res) => {
  const user = req.body;

  loginService.loginUser(user)
    .then((token) => {
        res.writeHeader(200, {
          'Content-Length': token.length,
          'Content-Type': "text/plain"
      });
      res.write(token);
      res.end(); 
    })
    .catch((response) => {
      res.status(response.statusCode).send(response.error);
    });
});

module.exports = router;

