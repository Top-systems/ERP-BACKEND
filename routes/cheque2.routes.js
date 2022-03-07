const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/cheque2.models');

const cheque2 = express.Router();

cheque2.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
cheque2.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna)); 

module.exports = cheque2