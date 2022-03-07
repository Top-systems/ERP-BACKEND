const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/tipoItem.models');

const tipoItem = express.Router();

tipoItem.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
tipoItem.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = tipoItem