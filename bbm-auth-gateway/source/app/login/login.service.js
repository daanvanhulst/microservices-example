'use strict';

const userService = require('../user/user.service');
const loginRepository = require('./login.repository');
const User = require('../user/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.loginUser = (userData) => {
  return new Promise((resolve, reject) => {
    console.log("in loginUser from service");

    userService.getUser(userData.username)
      .then((user) => {
        bcrypt.compare(userData.password, user.password, function(err, isMatch) {
          if (err || !isMatch) { 
            return reject({statusCode: 400, error: "Incorrect username or password"});
          }
          
          loginRepository.createTokenForUser(user).then(
            (token) => {
              resolve(token);
            },
            (error) => {
              reject({statusCode: 500, error: error});
            });                     
        });
      })
      .catch((response) => {
        reject(response);
      });
  });
};

exports.tokenIsAuthenticated = (token) => {
  return new Promise((resolve, reject) => {
    const unauth = {statusCode: 401, error: "Unauthorized"};
    try {
      var payload = jwt.verify(token, "super secret key");
      userService.getUser(payload.username)
      .then(
        (user) => { 
          resolve() 
        }, 
        () => {
          reject(unauth);
        });            
    } catch(err) {
        reject(unauth);
    }
  });
};

