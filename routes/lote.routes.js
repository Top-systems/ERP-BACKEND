const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/lote.models');

const lote = express.Router();

lote.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
lote.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = lote