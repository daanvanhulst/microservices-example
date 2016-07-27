'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const winston = require('winston');

const userService = require('../user/user.service');

router.get('/logout', (req, res) => {
  console.log('in router.get /logout');
  req.logout();
});

router.get('/auth/google', (req, res, next) => {
  req.session.redirectUrl = req.query.redirect;
  if(!req.session.redirectUrl) {
    req.session.redirectUrl = req.hostname;
  }
  next();
}, passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if(err) { return next(err);}
    if(!user) { return res.redirect(req.session.redirectUrl); }
    
    req.login(user, (err) => {
      if (err) return next(err);
      res.writeHead(302, {
        'Location': req.session.redirectUrl + '?token=' + user.google.token + '&user=' + user.google.email
      });
      res.end();
    });
  })(req, res, next);
});

router.get('/auth/facebook', (req, res, next) => {
  req.session.redirectUrl = req.query.redirect;
  if(!req.session.redirectUrl) {
    req.session.redirectUrl = req.hostname;
  }
  next();
}, passport.authenticate('facebook', { scope : 'email' }));
router.get('/auth/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user, info) => {
    if(err) { return next(err);}
    if(!user) { return res.redirect(req.session.redirectUrl); }
    
    req.login(user, (err) => {
      if (err) return next(err);
      res.writeHead(302, {
        'Location': req.session.redirectUrl + '?token=' + user.facebook.token + '&user=' + user.facebook.email
      });
      res.end();
    });
  })(req, res, next);
});

router.get('/auth/twitter', (req, res, next) => {
  req.session.redirectUrl = req.query.redirect;
  if(!req.session.redirectUrl) {
    req.session.redirectUrl = req.hostname;
  }
  next();
}, passport.authenticate('twitter', { scope : 'email' }));

router.get('/auth/twitter/callback', (req, res, next) => {
  passport.authenticate('twitter', (err, user, info) => {
    if(err) { return next(err);}
    if(!user) { return res.redirect(req.session.redirectUrl); }
    
    req.login(user, (err) => {
      if (err) return next(err);
      res.writeHead(302, {
        'Location': req.session.redirectUrl + '?token=' + user.twitter.token + '&user=' + user.twitter.name
      });
      res.end();
    });
  })(req, res, next);
});

router.all('*', (req, res, next) => {
  const authHeader = req.get('Authorization');
    if(!authHeader) {
        return res.status(401).send("Unauthorized");
    }
    const data = authHeader.split(" ");
    if(data[0] !== "Bearer" || !data[1]) {
        return res.status(401).send("Unauthorized");
    }
    const token = data[1];

    userService.findUserByToken(token)
    .then((response) => {
      if(response) {
        next();
      } else {
        return res.status(401).send("Unauthorized");
      } 
    })
    .catch((response) => {
      res.status(response.statusCode).send(response.error);
    });
});


module.exports = router;