const express = require('express');
const { useBody } = require('./db/use')

const {
    processarFiltro,
    pesquisarPorColuna
} = require('./db/infoComplementares.models');

const infoComplementares = express.Router();

infoComplementares.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
infoComplementares.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = infoComplementares