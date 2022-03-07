const express = require('express');
const { useBody } = require('./db/use');

const {
    listar,
    processarFiltro,
    pesquisarPorColuna,
    logo
} = require('./db/comunicacaoBico.models');

const comunicacaoBico = express.Router();

comunicacaoBico.post('/listar', (req, res) => useBody(req, res, listar));
comunicacaoBico.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
comunicacaoBico.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
comunicacaoBico.post('/logo', (req, res) => useBody(req, res, logo))

module.exports = comunicacaoBico;