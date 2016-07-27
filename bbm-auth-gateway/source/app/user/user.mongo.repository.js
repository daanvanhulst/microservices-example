'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.99.100:28003/User');

const userSchema = mongoose.Schema({
  facebook         : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },
  twitter          : {
    id           : String,
    token        : String,
    displayName  : String,
    username     : String
  },
  google           : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  }
});
var UserDB = mongoose.model('User', userSchema);

exports.findUserById = (userId) => {
  return UserDB.findOne({ '_id': userId });
};

exports.findUserByToken = (token) => {
  return UserDB.findOne({ $or:[ {'facebook.token': token},  {'twitter.token': token}, {'google.token': token} ]});
};

exports.findUserByFacebookId = (userId) => {
  return UserDB.findOne({ 'facebook.id': userId });
};

exports.findUserByGoogleId = (userId) => {
  return UserDB.findOne({ 'google.id': userId });
};

exports.findUserByTwitterId = (userId) => {
  return UserDB.findOne({ 'twitter.id': userId });
};

exports.addOrUpdateUser = (userData) => {
  return new Promise((resolve, reject) => {
    this.findUserById(userData._id)
    .then((dbUser) => {
      if(!dbUser) {
        dbUser = new UserDB();
      }

      if (userData.facebook) {
        dbUser.facebook  = userData.facebook;
      }
      if (userData.google)   {
        dbUser.google    = userData.google;
      }
      if (userData.twitter)  {
        dbUser.twitter   = userData.twitter;
      }

      dbUser.save()
      .then((response) => {
        resolve(response)
      }, (error) => {
        reject(error);
      });
    }, 
    (error) => {
      reject(error);
    });
  });
}