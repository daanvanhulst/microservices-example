import LoginController from './login.controller';

describe('Login controller', () => {
  let vm;

  beforeEach(angular.mock.module('bbm'));

  beforeEach(() => {
    vm = new LoginController();
  });

  it("should have initialized the controller", function () {
    expect(vm).toBeDefined();
  });
});
