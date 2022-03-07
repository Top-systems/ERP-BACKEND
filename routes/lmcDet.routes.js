const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna
} = require('./db/lmcDet.models')

const lmcDet = express.Router();

lmcDet.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
lmcDet.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna))

module.exports = lmcDet;