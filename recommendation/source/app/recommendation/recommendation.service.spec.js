'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
require('sinon-as-promised');

const recommendationService = require('./recommendation.service');
const recommendationRepository = require('./recommendation.repository');

let recommendationRepositoryStub;

afterEach(() => {
  if (recommendationRepositoryStub) {
    recommendationRepositoryStub.restore();
  }
});

describe('unit: recommendation.service - when getting recommendation data', () => {
  it('it should resolve and return recommendation data', () => {
    // arrange
    const recommendationResponse = [{
      id: 1,
      login: 'recommendation'
    }];

    const recommendationModel = {
      id: 1,
      name: 'recommendation'
    };

    recommendationRepositoryStub = sinon
      .stub(recommendationRepository, 'getRecommendationData')
      .resolves(recommendationResponse);

    // act + assert
    return recommendationService.getRecommendation()
      .then((response) => {
        expect(recommendationRepositoryStub.called).to.equal(true);
        expect(response).to.deep.equal(recommendationModel);
      });
  });

  it('it should reject the request and return an error message', () => {
    // arrange
    recommendationRepositoryStub = sinon
      .stub(recommendationRepository, 'getRecommendationData')
      .rejects({error: 'error'});

    // act + assert
    return recommendationService.getRecommendations()
      .catch((response) => {
        expect(recommendationRepositoryStub.called).to.equal(true);
        expect(response).to.deep.equal({error: 'error'});
      });
  });
});

