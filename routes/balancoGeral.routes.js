const express = require('express');
const { useBody } = require('./db/use');

const {
    iniciar,
    consultar,
    pegarCodigoDeBarras
} = require('./db/balancoGeral.models');

const balancoGeral = express.Router();

balancoGeral.post('/iniciar', (req, res) => useBody(req, res, iniciar));
balancoGeral.post('/consultar', (req, res) => useBody(req, res, consultar));
balancoGeral.post('/pegarCodigoDeBarras', (req, res) => useBody(req, res, pegarCodigoDeBarras));

module.exports = balancoGeral