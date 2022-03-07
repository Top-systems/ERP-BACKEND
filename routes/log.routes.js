const express = require('express');
const { useBody } = require('./db/use');

const {
    logipservidor,
    loginfoserver
} = require('./db/log.models');

const log = express.Router();

log.post('/logipservidor', (req, res) => useBody(req, res, logipservidor));
log.post('/loginfoserver', (req, res) => useBody(req, res, loginfoserver))

module.exports = log;