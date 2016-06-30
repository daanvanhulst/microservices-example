'use strict';

const userRepository = require('./user.mongo.repository');
const User = require('./user.model');

exports.getUser = (username) => {
  console.log('Callin getUser in user service');
  return new Promise((resolve, reject) => {
    userRepository.getUser(username)
      .then((response) => {
        console.log("Got user");
        console.log(response);
        const user = new User(response);
        if(user) {
          resolve(user);
        } else {
          reject();
        }
      }, (error) => {
        console.log("Failed to get user %s", error);
        reject(error);
      })
      .catch((response) => {
        reject(response);
      });
  });
};