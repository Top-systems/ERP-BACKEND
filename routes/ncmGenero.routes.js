const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna
} = require('./db/ncmGenero.models');

const ncmGenero = express.Router();

ncmGenero.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
ncmGenero.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = ncmGenero