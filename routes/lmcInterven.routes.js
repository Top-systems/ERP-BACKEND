const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna,
    salvar
} = require('./db/lmcInterven.models');

const lmcInterven = express.Router();

lmcInterven.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
lmcInterven.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
lmcInterven.post('/salvar', (req, res) => useBody(req, res, salvar))

module.exports = lmcInterven;