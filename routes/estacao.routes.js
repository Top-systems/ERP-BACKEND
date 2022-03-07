const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/estacao.models');

const estacao = express.Router();

estacao.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
estacao.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = estacao