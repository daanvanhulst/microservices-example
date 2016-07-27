import loginConfig from './login.config';
import LoginService from './login.service';

export default angular.module('bbm.auth.login', [])
    .config(loginConfig)
    .service('loginService', LoginService);

