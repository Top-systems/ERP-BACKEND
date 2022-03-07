const express = require('express');
const { useBody } = require('./db/use');

const {
    consultar,
    listaritens,
    run,
    listarimgx,
    listarimg
} = require('./db/pbms.models');

const pbms = express.Router();

pbms.post('/consultar', (req, res) => useBody(req, res, consultar));
pbms.post('/listaritens', (req, res) => useBody(req, res, listaritens));
pbms.post('/run', (req, res) => useBody(req, res, run));
pbms.post('/listarimgx', (req, res) => useBody(req, res, listarimgx));
pbms.post('/listarimg', (req, res) => useBody(req, res, listarimg));

module.exports = pbms