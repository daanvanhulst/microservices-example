'use strict';

const express = require('express');
const router = express.Router();
const loginService = require('../login/login.service');

router.all('*', (req, res, next) => {
  const authHeader = req.get('Authorization');
    if(!authHeader) {
        return res.status(401).send("Unauthorized");
    }
    
    const data = authHeader.split(" ");
    if(data[0] !== "Bearer" || !data[1]) {
        return res.status(401).send("Unauthorized");
    }
    
    var token = data[1];

    loginService.tokenIsAuthenticated(token)
    .then((response) => {
      next();
    })
    .catch((response) => {
      res.status(response.statusCode).send(response.error);
    });
});

module.exports = router;

