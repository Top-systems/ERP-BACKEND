const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/estoqueGeral.models');

const estoqueGeral = express.Router();

estoqueGeral.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
estoqueGeral.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = estoqueGeral