'use strict';

class User {
  constructor(loginResponse) {
    this.username = loginResponse.username;
    this.password = loginResponse.password;
  }
}

module.exports = User;

