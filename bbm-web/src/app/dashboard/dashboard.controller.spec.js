import DashboardController from './dashboard.controller';

describe('Dashboard controller', () => {
  let vm;

  beforeEach(angular.mock.module('bbm'));

  beforeEach(() => {
    vm = new DashboardController();
  });

  it("should have initialized the controller", function () {
    expect(vm).toBeDefined();
  });
});
