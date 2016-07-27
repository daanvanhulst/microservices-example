'use strict';

const winston = require('winston'); // https://www.npmjs.com/package/winston
const passport = require('passport');

const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

const configAuth = require('../config.auth');

const userService = require('../app/user/user.service');
const User = require('../app/user/user.model');

exports.register = (app) => {
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    userService.findUserById(id).then((user) => {
      done(null, user);
    },
    (err) => {
      done(err);
    });
  });

  passport.use(new FacebookStrategy({
    clientID        : configAuth.facebookAuth.clientID,
    clientSecret    : configAuth.facebookAuth.clientSecret,
    callbackURL     : configAuth.facebookAuth.callbackURL,
    passReqToCallback : true,
    profileFields: ['id', 'email', 'name']
  },
  (req, token, refreshToken, profile, done) => {
    process.nextTick(() => {
      if (!req.user) {
        userService.findUserByFacebookId(profile.id).then(
          (user) => {
            if(!user) {
              let newUser = new User({
                facebook: {
                  "id": profile.id, 
                  "token": token, 
                  "name": profile.name.givenName + ' ' + profile.name.familyName, 
                  "email": profile.emails[0].value
                }
              });
              userService.addOrUpdateUser(newUser)
              .then((result) => {
                  newUser._id = result._id;
                  done(null, newUser);
                },
                (error) => {
                  done(error);
              });
            } else {
              done(null, user);
            }
          },
          (error) => {
            done(error);
          }
        );
      } else {
        let upUser            = req.user; 
        upUser.facebook.id    = profile.id;
        upUser.facebook.token = token;
        upUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
        upUser.facebook.email = profile.emails[0].value;

        userService.addOrUpdateUser(upUser)
        .then((result) => {
            upUser._id = result._id;
            done(null, upUser);
          },
          (error) => {
            done(error);
        });
      }
    }); 
  }));
  winston.info('app - auth: Facebook strategy loaded');

  passport.use(new TwitterStrategy({
    consumerKey     : configAuth.twitterAuth.consumerKey,
    consumerSecret  : configAuth.twitterAuth.consumerSecret,
    callbackURL     : configAuth.twitterAuth.callbackURL,
    passReqToCallback : true,
    profileFields: ['id', 'email', 'name']
  },
  (req, token, refreshToken, profile, done) => {
    process.nextTick(() => {
      if (!req.user) {
        userService.findUserByTwitterId(profile.id).then(
          (user) => {
            if(!user) {      
              let newUser = new User({           
                twitter: {
                  "id": profile.id, 
                  "token": token, 
                  "name": profile.displayName, 
                  "email": ''
                }
              });

              userService.addOrUpdateUser(newUser)
              .then((result) => {
                newUser._id = result._id;
                done(null, newUser);
              },
              (error) => {
                done(error);
              });
            } else {
              done(null, user);
            }
          },
          (error) => {
            done(error);
          }
        );
      } else {
        let upUser = req.user;
        upUser.twitter.id    = profile.id;
        upUser.twitter.token = token;
        upUser.twitter.name  =  profile.displayName;
        upUser.twitter.email = '';

        userService.addOrUpdateUser(upUser)
        .then((result) => {
          upUser._id = result._id;
          done(null, upUser);
        },
        (error) => {
          done(error);
        });
      }
    }); 
  }));
  winston.info('app - auth: twitter strategy loaded');

  // Google will send back the token and profile
  passport.use(new GoogleStrategy({
    consumerKey        : configAuth.googleAuth.clientID,
    consumerSecret    : configAuth.googleAuth.clientSecret,
    callbackURL     : configAuth.googleAuth.callbackURL,
    passReqToCallback : true,
    profileFields: ['id', 'email', 'name']
  },
  (req, token, refreshToken, profile, done) => {
    process.nextTick(() => {
      if (!req.user) {
        userService.findUserByGoogleId(profile.id).then(
          (user) => {
            if(!user) {
              let newUser = new User({               
                google: {
                  "id": profile.id, 
                  "token": token, 
                  "name": profile.displayName, 
                  "email": profile.emails[0].value
                }
              });
              userService.addOrUpdateUser(newUser)
              .then((result) => {
                  newUser._id = result._id;
                  done(null, newUser);
                },
                (error) => {
                done(error);
                }
              );
            } else {
              done(null, user);
            }
          },
          (error) => {
            done(error);
          }
        );
      } else {
        let upUser            = req.user; 
        upUser.facebook.id    = profile.id;
        upUser.facebook.token = token;
        upUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
        upUser.facebook.email = profile.emails[0].value;
        userService.addOrUpdateUser(upUser)
        .then((result) => {
            upUser._id = result._id;
            done(null, upUser);
          },
          (error) => {
            done(error);
          }
        );
      }
    }); 
  }));
  winston.info('app - auth: google strategy loaded');
};