const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna
} = require('./db/indicacao.models');

const indicacao = express.Router();

indicacao.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
indicacao.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna))

module.exports = indicacao