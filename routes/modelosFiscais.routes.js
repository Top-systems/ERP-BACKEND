const express = require('express');
const { useBody } = require('./db/use');

const {
    pesquisarPorColuna,
    processarFiltro
} = require('./db/modelosFiscais.models');

const modelosFiscais = express.Router();

modelosFiscais.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
modelosFiscais.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = modelosFiscais