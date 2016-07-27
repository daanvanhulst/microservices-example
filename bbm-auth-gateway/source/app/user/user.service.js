'use strict';

const userRepository = require('./user.mongo.repository');
const User = require('./user.model');

exports.findUserByFacebookId = (userId) => {
  return new Promise((resolve, reject) => {
    userRepository.findUserByFacebookId(userId)
      .then((response) => {
        let user = null;
        if(response) { 
          user = new User(response); 
        }
        resolve(user);
      }, (error) => {
        reject(error);
      })
      .catch((response) => {
        reject(response);
      });
  });
};

exports.findUserByGoogleId = (userId) => {
  return new Promise((resolve, reject) => {
    userRepository.findUserByGoogleId(userId)
      .then((response) => {
        let user = null;
        if(response) { 
          user = new User(response);
        }
        resolve(user);
      }, (error) => {
        reject(error);
      })
      .catch((response) => {
        reject(response);
      });
  });
};

exports.findUserByTwitterId = (userId) => {
  return new Promise((resolve, reject) => {
    userRepository.findUserByTwitterId(userId)
      .then((response) => {

        let user = null;
        if(response) { 
          user = new User(response);
        }
        resolve(user);
      }, (error) => {
        reject(error);
      })
      .catch((response) => {
        reject(response);
      });
  });
};

exports.findUserById = (userId) => {
  return new Promise((resolve, reject) => {
    userRepository.findUserById(userId)
      .then((response) => {
        let user = null;
        if(response) { 
          user = new User(response); 
        }
        resolve(user);
      }, (error) => {
        reject(error);
      })
      .catch((response) => {
        reject(response);
      });
  });
};


exports.findUserByToken = (token) => {
  return new Promise((resolve, reject) => {
    userRepository.findUserByToken(token)
      .then((response) => {
        let user = null;
        if(response) { 
          user = new User(response); 
        }
        resolve(user);
      }, (error) => {
        reject(error);
      })
      .catch((response) => {
        reject(response);
      });
  });
};

exports.addOrUpdateUser = (addUser) => {
  return userRepository.addOrUpdateUser(addUser);
};