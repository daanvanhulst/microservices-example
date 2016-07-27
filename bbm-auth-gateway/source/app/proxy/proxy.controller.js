'use strict';

const express = require('express');
const router = express.Router();
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

router.all(['/bookmark', '/bookmark*'], (req, res) => {
console.log("Authorized so calling /bookmark");
  proxy.web(req, res, { target: 'http://192.168.99.100:3100' });
});

router.all(['/recommendation', '/recommendation*'], (req, res) => {
  proxy.web(req, res, { target: 'http://192.168.99.100:3200' });
});

module.exports = router;

