const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna
} = require('./db/lmcEstoque.models');

const lmcEstoque = express.Router();

lmcEstoque.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
lmcEstoque.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna))

module.exports = lmcEstoque;