const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna
} = require('./db/configSped.models');

const configSped = express.Router();

configSped.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
configSped.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna))

module.exports = configSped;