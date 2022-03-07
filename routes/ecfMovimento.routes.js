const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna
} = require('./db/ecfMovimento.models');

const ecfMovimento = express.Router();

ecfMovimento.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
ecfMovimento.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna))

module.exports = ecfMovimento;