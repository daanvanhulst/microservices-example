'use strict';

const recommendationRepository = require('./recommendation.repository');
const Recommendation = require('./recommendation.model');

exports.getRecommendations = () => {
  return new Promise((resolve, reject) => {
    recommendationRepository.getRecommendationData()
      .then((response) => {
        const recommendation = new Recommendation(response[0]);
        resolve(recommendation);
      })
      .catch((response) => {
        reject(response);
      });
  });
};

