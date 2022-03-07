const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna
} = require('./db/ncmSecao.models');

const ncmSecao = express.Router();

ncmSecao.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
ncmSecao.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = ncmSecao