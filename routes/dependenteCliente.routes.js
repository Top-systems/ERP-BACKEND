const express = require('express');
const { useBody } = require('./db/use');
 
const{
    processarFiltro,
    pesquisarPorColuna
}= require('./db/dependenteCliente.models');

const dependenteCliente = express.Router();

dependenteCliente.post('/processarFiltro', (req, res) => useBody(req, res, processarFiltro));
dependenteCliente.post('/pesquisarPorColuna', (req, res) => useBody(req, res, pesquisarPorColuna));

module.exports = dependenteCliente