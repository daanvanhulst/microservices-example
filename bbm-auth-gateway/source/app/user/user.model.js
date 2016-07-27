'use strict';

class User {
  constructor(userData) {
    if(userData._id){
      this._id = userData._id
    }
    if(userData.facebook) {
      this.facebook = {
        id:     userData.facebook.id,
        token:  userData.facebook.token,              
        name:   userData.facebook.name,
        email:  userData.facebook.email
      }
    }

    if(userData.google) {
      this.google = {
        id:     userData.google.id,
        token:  userData.google.token,              
        name:   userData.google.name,
        email:  userData.google.email
      }
    }

    if(userData.twitter) {
      this.twitter = {
        id:     userData.twitter.id,
        token:  userData.twitter.token,              
        name:   userData.twitter.name,
        email:  userData.twitter.email
      }
    }
  }
}

module.exports = User;

