const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna
} = require('./db/principioAtivo.models');

const principioAtivo = express.Router();

principioAtivo.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
principioAtivo.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = principioAtivo