const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/classFiscalImpressora.models');

const classFiscalImpressora = express.Router();

classFiscalImpressora.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
classFiscalImpressora.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = classFiscalImpressora;