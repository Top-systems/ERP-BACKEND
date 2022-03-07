const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/tipoPagto.models');

const tipoPagto = express.Router();

tipoPagto.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
tipoPagto.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = tipoPagto