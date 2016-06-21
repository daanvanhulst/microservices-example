'use strict';

const express = require('express');
const router = express.Router();

const recommendationService = require('./recommendation.service');

router.get('/recommendation', (req, res) => {
  recommendationService.getRecommendations()
    .then((response) => {
      res.send(response);
    })
    .catch((response) => {
      res.status(response.statusCode).send(response.error);
    });
});

module.exports = router;

