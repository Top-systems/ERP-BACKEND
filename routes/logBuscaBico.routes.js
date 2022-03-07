const express = require('express');
const { useBody } = require('./db/use');

const {
    enviarlog3,
    enviarlog,
    enviarlogcsv
} = require('./db/logBuscaBico.models');

const logBuscaBico = express.Router();

logBuscaBico.post('/enviarlog3', (req, res) => useBody(req, res, enviarlog3));
logBuscaBico.post('/enviarlog', (req, res) => useBody(req, res, enviarlog));
logBuscaBico.post('/enviarlogcsv', (req, res) => useBody(req, res, enviarlogcsv));

module.exports =logBuscaBico