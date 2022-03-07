const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna
} = require('./db/pbm.models');

const pbm = express.Router();

pbm.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
pbm.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = pbm