const express = require('express');
const { useBody } = require('./db/use');

const {
    pegarDetalhes,
    processarFiltro,
    pesquisarPorColuna
} = require('./db/faixaVencimento.models');

const faixaVencimento = express.Router();

faixaVencimento.post('/pegarDetalhes', (req, res) => useBody(req, res, pegarDetalhes));
faixaVencimento.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
faixaVencimento.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna))

module.exports = faixaVencimento;