export default class LoginService {
  constructor(Restangular, commonConstants) {
    'ngInject';
    
    this.Restangular = Restangular;
    this.Restangular.setBaseUrl(commonConstants.baseUrl);
  }

  loginUser(user) {
    return this.Restangular.all('login').post(user);
  }

  logoutUser() {
    return this.Restangular.all('logout').get();
  }
}