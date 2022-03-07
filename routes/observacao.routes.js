const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/observacao.models');

const observacao = express.Router();

observacao.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
observacao.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = observacao