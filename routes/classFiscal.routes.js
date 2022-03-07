const express = require('express');
 const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/classFiscal.models');

 const classFiscal = express.Router();

classFiscal.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
classFiscal.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = classFiscal