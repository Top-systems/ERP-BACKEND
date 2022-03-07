const express = require('express');
const { useBody } = require('./db/use');

const {
    pesquisarPorColuna,
    processarFiltro
} = require('./db/periodoContabilista.models');

const periodoContabilista = express.Router();

periodoContabilista.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
periodoContabilista.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = periodoContabilista