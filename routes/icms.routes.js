const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pegarecfs,
    pesquisarPorColuna
}= require('./db/icms.models');

const icms = express.Router();

icms.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
icms.post('/pegarecfs', (req, res) => useBody(req, res, pegarecfs));
icms.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna)); 


module.exports = icms