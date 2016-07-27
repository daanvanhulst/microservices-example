import loginModule from './login/login.module';

import authConfig from './auth.config';
import AuthInterceptorService from './auth.interceptor.service';

export default angular.module('bbm.auth', [
  loginModule.name
])
.config(authConfig)
.service('authInterceptorService', AuthInterceptorService);
    

