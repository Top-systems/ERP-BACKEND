const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna,
}= require('./db/contabilista.models');

const contabilista = express.Router();

contabilista.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
contabilista.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = contabilista;