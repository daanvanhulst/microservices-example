import LoginController from './login.controller';

export default function loginConfig ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/auth/login/login.html',
      controller: LoginController,
      controllerAs: 'vm'
    });
}
