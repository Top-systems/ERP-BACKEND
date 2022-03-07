const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna,
    logo
} = require('./db/profSaude.models');

const profSaude = express.Router();

profSaude.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
profSaude.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
profSaude.post('/logo', (req, res) => useBody(req, res, logo));

module.exports = profSaude