export default class MenuController {
  constructor (loginService) {
    'ngInject';
    this.loginService = loginService;
    this.activate();
  }

  activate() {
console.log('in MenuController');
  }

  logout() {
console.log("in logout function");
    this.loginService.logoutUser();
  }
}
