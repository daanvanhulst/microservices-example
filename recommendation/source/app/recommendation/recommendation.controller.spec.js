'use strict';

const app = require('../../app');
const server = app.listen();
const winston = require('winston');
const supertest = require('supertest').agent(server);
const sinon = require('sinon');
require('sinon-as-promised');

const recommendationService = require('./recommendation.service');

let recommendationServiceStub;

before(() => {
  try {
    winston.remove(winston.transports.Console);
  } catch (error) {

  }
});

after(() => {
  server.close();
});

afterEach(() => {
  if (recommendationServiceStub) {
    recommendationServiceStub.restore();
  }
});

describe('unit: recommendation.controller - when getting recommendations', () => {
  it('it should resolve and return recommendations', () => {
    // arrange
    const recommendation = {
      id: 1,
      login: 'recommendation'
    };

    recommendationServiceStub = sinon
      .stub(recommendationService, 'getRecommendations')
      .resolves(recommendation);

    // act + assert
    return supertest
      .get('/recommendations')
      .expect(200, recommendation);
  });

  it('it should reject and return an error message', () => {
    // arrange
    recommendationServiceStub = sinon
      .stub(recommendationService, 'getRecommendations')
      .rejects({statusCode: 500, error: {error: 'error'}});

    // act + assert
    return supertest
      .get('/recommendations')
      .expect(500, {error: 'error'});
  });
});

