export default class LoginController {
  constructor ($log, $window, $location, loginService, $timeout, commonConstants) {
    'ngInject';
    this.$log = $log;
    this.$window = $window;
    this.$location = $location;
    this.loginService = loginService;
    this.$timeout = $timeout;
    this.commonConstants = commonConstants;
    this.socialAuthWindow = null;
    this.user = { username: null, password: null };

    this.activate();
  }

  activate() {
    this.baseUrl = this.commonConstants.baseUrl;
    this.redirectUrl = this.$location.protocol() + "://" + this.$location.host() + ":" + this.$location.port();
    
    this.$log.info(this.$location.absUrl());
    this.$log.info(this.redirectUrl);
  }

  openSocialLoginWindow(url) {
    this.socialAuthWindow = this.$window.open(url, "SignIn", "width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,left=500,top=500");
    
    this.checkAuthStatus(this, this.socialAuthWindow);      
    
    this.socialAuthWindow.focus();
  }

  checkAuthStatus(ctrl) {
    try {
      if (ctrl.socialAuthWindow.document.domain === document.domain) {
        let params = ctrl.getUrlParams(ctrl.socialAuthWindow.document.URL);
        let token = params['token'];
        // let user = params['user'];
        if (token) {
          ctrl.$window.localStorage.setItem('token', token);
          ctrl.socialAuthWindow.close();
        }
      }
    } catch(e) {
      ctrl.$log.error('Exception occured');
      ctrl.$log.error(e);
    }

    //on window close
    if (ctrl.socialAuthWindow && ctrl.socialAuthWindow.closed) {
      ctrl.authEnd();
    } else {
      ctrl.$timeout(((topicId) => {
        return () => {
          ctrl.checkAuthStatus(ctrl);
        };
      })(ctrl), 1000);
    }
  }

  /**
   * socialAuth Popup Window Handler.
   */
  authEnd() {
    //AuthService.login();
  }

  /**
   * Get the value of URL parameters either from current URL or static URL
   */
  getUrlParams (str) {
    let queryString = str || window.location.search || '';
    let keyValPairs = [];
    let params      = {};

    queryString     = queryString.replace(/.*?\?/,"");
    if (queryString.length)
    {
      keyValPairs = queryString.split('&');
      for (let i = 0; i < keyValPairs.length; i++)
      {
        let pairNum = keyValPairs[i];
        let key = pairNum.split('=')[0];
        if (!key.length) continue;
        if (typeof params[key] === 'undefined')
        params[key] = [];
        params[key].push(pairNum.split('=')[1]);
      }
    }
    return params;
  }
}
