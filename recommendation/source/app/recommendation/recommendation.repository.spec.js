'use strict';

const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');

const recommendationRepository = require('./recommendation.repository');

afterEach(() => {
  nock.cleanAll();
});

describe('unit: recommendation.repository - when getting recommendation data', () => {
  it('it should resolve and return recommendation data', () => {
    // arrange
    const recommendationResponse = [
      {id: 1, login: 'recommendation'},
      {id: 2, login: 'recommendation2'}
    ];

    nock('https://api.github.com')
      .get('/users')
      .reply(200, recommendationResponse);

    // act + assert
    return recommendationRepository.getRecommendationData()
      .then((response) => {
        expect(response).to.deep.equal(recommendationResponse);
      });
  });

  it('it should reject and return an error message', () => {
    // arrange
    nock('https://api.github.com')
      .get('/users')
      .replyWithError({'message': 'something awful happened', 'code': 'AWFUL_ERROR'});

    // act + assert
    return recommendationRepository.getRecommendationData()
      .catch((response) => {
        expect(response.error).to.deep.equal({'message': 'something awful happened', 'code': 'AWFUL_ERROR'});
      });
  });
});

