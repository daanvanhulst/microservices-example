'use strict';

class Recommendation {
  constructor(recommendationResponse) {
    this.id = recommendationResponse.id;
    this.name = recommendationResponse.name;
  }
}

module.exports = Recommendation;

