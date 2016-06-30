'use strict';

const jwt = require('jsonwebtoken');

exports.createTokenForUser = (user) => {
  return new Promise((resolve, reject) => {
    try {
      const token = jwt.sign(user, "super secret key", {}); 
      resolve(token);
    } catch(err) {
      reject(err);
    }
  }) 
};