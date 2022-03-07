const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna
} = require('./db/condicaoParcelamento.models');

const condicaoParcelamento = express.Router();

condicaoParcelamento.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
condicaoParcelamento.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna))

module.exports = condicaoParcelamento;