export default function authConfig ($httpProvider) {
  'ngInject';
  $httpProvider.interceptors.push('authInterceptorService');
}