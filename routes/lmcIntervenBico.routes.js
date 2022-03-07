const express = require('express');
const { useBody } = require('./db/use');

const {
    processarFiltro,
    pesquisarPorColuna,
    salvar
} = require('./db/lmcIntervenBico.models');

const lmcIntervenBico = express.Router();

lmcIntervenBico.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
lmcIntervenBico.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
lmcIntervenBico.post('/salvar', (req, res) => useBody(req, res, salvar))

module.exports = lmcIntervenBico;