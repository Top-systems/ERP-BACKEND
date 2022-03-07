const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/cst.models');

const cst = express.Router();

cst.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
cst.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));
 
module.exports = cst