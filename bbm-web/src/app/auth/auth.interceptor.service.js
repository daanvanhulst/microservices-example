export default class AuthInterceptorService {
  constructor($window, $q) {
    'ngInject';    

    this.$window = $window;
    this.$q = $q;

    return {
      request: this.request.bind(this),
      requestError: this.requestError.bind(this),
      response: this.responseError.bind(this),
      responseError: this.responseError.bind(this)
    }
  }

  request(config) {
    if (this.$window.localStorage.getItem('token')) {
        // may also use sessionStorage
      config.headers.Authorization = 'Bearer ' + this.$window.localStorage.getItem('token');
    }
    return config || this.$q.when(config);
  }

  requestError(err) {
    return err;
  }
  
  response(response) {
    if (response.status === 401) {
        //  Redirect user to login page / signup Page.
    }
    return response || this.$q.when(response);
  }

  responseError(err) {
    return err;
  }

}