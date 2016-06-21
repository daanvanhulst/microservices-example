'use strict';

const rp = require('request-promise');

exports.getRecommendationData = () => {
  const options = {
    uri: 'https://api.github.com/users',
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };

  return rp(options)
    .then((response) => {
      return response;
    })
    .catch((response) => {
      throw response;
    });
};

